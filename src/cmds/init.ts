import path from "node:path";
import { copyDir, renderTemplates, replaceArgsInFilenames } from "../utils.ts";
import { parseArgs } from 'node:util';

export default function initShell(templatesPath: string) {
	interface args {
		name: string;
		path: string;
	}
	const options = {
		name: {
			type: 'string',
		},
		path: { type: 'string', default: "" }
	};

	let values: args = { name: "", path: "" };
	try {
		const parsed = parseArgs({ args: process.argv, options, allowPositionals: true });
		if (parsed.values.name) {
			values.name = parsed.values.name as string;
		}
		if (parsed.values.path) {
			values.path = parsed.values.path as string;
		}
	} catch (e) {
		console.error(`ERROR: ${e.message}`);
		console.log("options: --name --path");
	}
	const target = path.join(values.path, values.name);

	copyDir(path.join(templatesPath, "shell"), target);
	replaceArgsInFilenames(target, { name: values.name });
	renderTemplates(target, { name: values.name });
	console.log(`init success: project could be found at ${target}`);
}

