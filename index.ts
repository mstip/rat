#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getCommand } from "./src/utils.ts";
import initShell from "./src/cmds/init.ts";
import printHelp from "./src/cmds/printhelp.ts";

console.log("======================================");
console.log("==== RAT - React Admin Templates ====")
console.log("======================================");

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const templatesPath = path.join(currentDir, "templates");

try {
	const cmd = getCommand();

	switch (cmd) {
		case "new":
		case "setup":
		case "init": initShell(templatesPath); break;
		case "?":
		case "--help":
		case "help": printHelp(); break
		default:
			printHelp();
	}

} catch (e) {
	console.error(`ERROR: ${e.message}`);
	process.exit(1);
}

process.exit(0);
