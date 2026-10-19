import type {JsonValue} from '@zofai/evidence-spec';
export interface EvaluationTask {version:'1.0.0';id:string;description:string;cases:Array<{name:string;input:JsonValue;expected:JsonValue}>}
const tasks:EvaluationTask[]=[
 {version:'1.0.0',id:'deduplicate-payments',description:'Return total amount counting each payment id once.',cases:[{name:'redelivery',input:[{id:'a',amount:10},{id:'a',amount:10}],expected:10},{name:'different payments',input:[{id:'a',amount:3},{id:'b',amount:4}],expected:7},{name:'empty',input:[],expected:0}]},
 {version:'1.0.0',id:'compatible-profile',description:'Return name and displayName fields without breaking existing clients.',cases:[{name:'normal name',input:{name:'Ada'},expected:{name:'Ada',displayName:'Ada'}},{name:'empty name',input:{name:''},expected:{name:'',displayName:''}},{name:'unicode',input:{name:'Zoë'},expected:{name:'Zoë',displayName:'Zoë'}}]},
 {version:'1.0.0',id:'safe-reservation',description:'Return remaining stock and accepted requests without overselling.',cases:[{name:'concurrent demand model',input:{stock:5,requests:[4,4]},expected:{stock:1,accepted:1}},{name:'enough stock',input:{stock:8,requests:[4,4]},expected:{stock:0,accepted:2}},{name:'empty',input:{stock:0,requests:[1]},expected:{stock:0,accepted:0}}]}
];
export function listEvaluationTasks():EvaluationTask[]{return structuredClone(tasks);}
export function getEvaluationTask(id:string):EvaluationTask {const task=tasks.find(t=>t.id===id);if(!task)throw new Error('Unsupported evaluation task.');return structuredClone(task);}
