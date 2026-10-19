import {compareReferences} from '../dist/index.js';const r=await compareReferences();console.log(JSON.stringify({broken:r.broken.score,fixed:r.fixed.score}));
