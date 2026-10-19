import {runBenchmark} from '../dist/index.js';const r=await runBenchmark({variant:'fixed',iterations:2});console.log(JSON.stringify({passed:r.passed,total:r.total}));
