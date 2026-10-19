import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
const cli=(...a)=>spawnSync(process.execPath,['dist/cli.js',...a],{encoding:'utf8',timeout:10000,maxBuffer:1e6});
test('CLI compares both measured references',()=>{const r=cli('compare');assert.equal(r.status,0,r.stderr);const x=JSON.parse(r.stdout);assert.equal(x.fixed.score,100);assert.equal(x.broken.score,0);});
test('CLI broken/fixed have meaningful exit codes',()=>{assert.equal(cli('run','--variant','broken').status,1);assert.equal(cli('run','--variant','fixed').status,0);});
test('CLI negative arguments fail safely',()=>{const r=cli('run','--iterations','1000','--token=secret');assert.equal(r.status,2);assert.doesNotMatch(r.stderr,/secret/);});
test('CLI emits Markdown and tasks',()=>{assert.match(cli('run','--format','markdown').stdout,/11\/11/);assert.equal(JSON.parse(cli('tasks').stdout).length,3);});
