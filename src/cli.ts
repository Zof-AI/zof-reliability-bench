#!/usr/bin/env node
import {parseArgs} from 'node:util';import {runBenchmark,compareReferences,toMarkdown,listEvaluationTasks} from './index.js';
try{const {values,positionals}=parseArgs({options:{variant:{type:'string',default:'fixed'},iterations:{type:'string',default:'1'},format:{type:'string',default:'json'},help:{type:'boolean'},version:{type:'boolean'}},allowPositionals:true});
 if(values.help)console.log('Usage: zof-reliability-bench run --variant broken|fixed [--iterations 1..10] [--format json|markdown] | compare | tasks');
 else if(values.version)console.log('0.1.1');
 else if(positionals.length!==1)throw new Error('usage');
 else if(positionals[0]==='tasks')console.log(JSON.stringify(listEvaluationTasks(),null,2));
 else if(positionals[0]==='compare')console.log(JSON.stringify(await compareReferences(),null,2));
 else if(positionals[0]==='run'&&['json','markdown'].includes(values.format!)&&['broken','fixed'].includes(values.variant!)){const r=await runBenchmark({variant:values.variant as 'broken'|'fixed',iterations:Number(values.iterations)});console.log(values.format==='markdown'?toMarkdown(r):JSON.stringify(r,null,2));if(r.passed!==r.total)process.exitCode=1;}
 else throw new Error('usage');
}catch{console.error(JSON.stringify({error:'Invalid benchmark command or options.'}));process.exitCode=2;}
