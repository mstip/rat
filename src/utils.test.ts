import assert from 'node:assert';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { renderTemplates, replaceArgsInFilenames } from './utils.ts';

test('replace args in filenames', () => {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "replace_args_test"));
	fs.writeFileSync(path.join(tempDir, 'dont_change_this.ts'), '');
	fs.writeFileSync(path.join(tempDir, '__NAME___awesome.ts'), '');
	fs.writeFileSync(path.join(tempDir, '__VAR__-__NAME__.ts'), '');

	fs.mkdirSync(path.join(tempDir, "more"));
	fs.writeFileSync(path.join(tempDir, "more", '__VAR__-__NAME__.ts'), '');
	fs.writeFileSync(path.join(tempDir, "more", 'dont_touch.txt'), '');

	fs.mkdirSync(path.join(tempDir, "__NAME__"));
	fs.writeFileSync(path.join(tempDir, "__NAME__", '__VAR__-__NAME__.ts'), '');
	fs.writeFileSync(path.join(tempDir, "__NAME__", 'dont_touch.txt'), '');

	replaceArgsInFilenames(tempDir, { name: "my-app", var: "moep" });

	//console.log(tempDir);
	//console.log(fs.readdirSync(tempDir));
	//console.log(fs.readdirSync(path.join(tempDir, "more")));
	//console.log(fs.readdirSync(path.join(tempDir, "my-app")));

	assert.ok(fs.existsSync(path.join(tempDir, "dont_change_this.ts")));
	assert.ok(fs.existsSync(path.join(tempDir, "my-app_awesome.ts")));
	assert.ok(fs.existsSync(path.join(tempDir, "more", "moep-my-app.ts")));
	assert.ok(fs.existsSync(path.join(tempDir, "more", "dont_touch.txt")));
	assert.ok(fs.existsSync(path.join(tempDir, "my-app", "moep-my-app.ts")));
	assert.ok(fs.existsSync(path.join(tempDir, "my-app", "dont_touch.txt")));
});

test('render templates', () => {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "render_templates"));
	fs.writeFileSync(path.join(tempDir, 'dont_change_this.ts'), 'DONT CHANGE THIS <%= it.name %>');
	fs.writeFileSync(path.join(tempDir, 'awesome.ts.eta'), 'Name:<%= it.name %> Var:<%= it.var %>');
	fs.mkdirSync(path.join(tempDir, "more"));
	fs.writeFileSync(path.join(tempDir, "more", 'ueberawesome.tsx.eta'), '<%= it.var %>');
	fs.writeFileSync(path.join(tempDir, "more", 'dont_touch.txt'), 'nochange');

	renderTemplates(tempDir, { name: "my-app", var: "moep" });
	//console.log(tempDir);
	//console.log(fs.readdirSync(tempDir));
	//console.log(fs.readdirSync(path.join(tempDir, "more")));

	assert.ok(fs.existsSync(path.join(tempDir, "dont_change_this.ts")));
	assert.ok(fs.existsSync(path.join(tempDir, "awesome.ts")));
	assert.ok(!fs.existsSync(path.join(tempDir, "awesome.ts.eta")));
	assert.ok(fs.existsSync(path.join(tempDir, "more", "ueberawesome.tsx")));
	assert.ok(!fs.existsSync(path.join(tempDir, "more", "ueberawesome.tsx.eta")));
	assert.ok(fs.existsSync(path.join(tempDir, "more", "dont_touch.txt")));

	assert.equal(fs.readFileSync(path.join(tempDir, "dont_change_this.ts")), 'DONT CHANGE THIS <%= it.name %>');
	assert.equal(fs.readFileSync(path.join(tempDir, "awesome.ts")), 'Name:my-app Var:moep');
	assert.equal(fs.readFileSync(path.join(tempDir, "more", "ueberawesome.tsx")), 'moep');
	assert.equal(fs.readFileSync(path.join(tempDir, "more", "dont_touch.txt")), 'nochange');

});
