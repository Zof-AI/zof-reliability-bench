import { mkdtemp,open,rm } from 'node:fs/promises';import { tmpdir } from 'node:os';import path from 'node:path';
import { runAll,listScenarios } from '@zofai/failure-lab';import type {ScenarioResult,Variant} from '@zofai/failure-lab';
import {createEvidence,redactText} from '@zofai/evidence-spec';import type {Evidence} from '@zofai/evidence-spec';
export * from './tasks.js';
export interface BenchmarkOptions {variant:Variant;iterations?:number;label?:string}
export interface BenchmarkReport {suiteVersion:'1.0.0';variant:Variant;label:string;iterations:number;total:number;passed:number;score:number;categories:string[];results:ScenarioResult[];evidence:Evidence}
async function cleanupCase(variant:Variant):Promise<ScenarioResult>{
 const dir=await mkdtemp(path.join(tmpdir(),'zof-cleanup-'));const handle=await open(path.join(dir,'synthetic'),'w');let closed=false;const begin=performance.now();
 try{try{throw new Error('injected processing error');}finally{if(variant==='fixed'){await handle.close();closed=true;}}}catch{}
 const observed={leakedHandles:closed?0:1};if(!closed)await handle.close();await rm(dir,{recursive:true,force:true});
 return {id:'resource-cleanup',variant,expected:{leakedHandles:0},observed,regressionPassed:closed,defectReproduced:!closed,durationMs:Math.round((performance.now()-begin)*1000)/1000};
}
/** Scores only bundled synthetic reference implementations. It never runs external tool commands. */
export async function runBenchmark(options:BenchmarkOptions):Promise<BenchmarkReport>{
 const iterations=options.iterations??1;if(!['broken','fixed'].includes(options.variant)||!Number.isInteger(iterations)||iterations<1||iterations>10||options.label!==undefined&&(typeof options.label!=='string'||options.label.length>100))throw new Error('Unsupported benchmark options.');
 const results:ScenarioResult[]=[];for(let i=0;i<iterations;i++){results.push(...await runAll(options.variant),await cleanupCase(options.variant));}
 const passed=results.filter(r=>r.regressionPassed).length;const total=results.length;
 const evidence=createEvidence({tool:{name:'zof-reliability-bench',version:'0.1.0'},type:'benchmark',execution:{status:'completed',result:passed===total?'pass':'fail'},tests:results.map((r,i)=>({name:`${r.id} iteration ${Math.floor(i/11)+1}`,status:r.regressionPassed?'passed':'failed',durationMs:r.durationMs})),environment:{os:process.platform,architecture:process.arch,runtime:process.version},extensions:{'org.zof.benchmark':{suiteVersion:'1.0.0',passed,total,score:100*passed/total}}});
 return {suiteVersion:'1.0.0',variant:options.variant,label:redactText(options.label??options.variant),iterations,total,passed,score:100*passed/total,categories:[...new Set([...listScenarios().map(s=>s.category),'Resource cleanup'])],results,evidence};
}
export async function compareReferences():Promise<{broken:BenchmarkReport;fixed:BenchmarkReport}>{return {broken:await runBenchmark({variant:'broken'}),fixed:await runBenchmark({variant:'fixed'})};}
export function toMarkdown(report:BenchmarkReport):string{return `# Reliability benchmark 1.0.0\n\nReference: ${report.variant}. Score: ${report.passed}/${report.total} (${report.score.toFixed(1)}%).\n\nEach case has equal weight. These measured synthetic outcomes do not estimate production reliability.\n`;}
