import fs from "node:fs";
import path from "node:path";
import { Eta } from "eta"
const eta = new Eta()

export function getCommand(): string {
	if (process.argv.length <= 2) {
		throw new Error("Please provide a command");
	}
	return process.argv[2];
}

export function copyDir(sourcePath: string, targetPath: string) {
	fs.cpSync(sourcePath, targetPath, { recursive: true, errorOnExist: true, force: false })
}

// Replaces all args in filenames recursive (walks the dirs);
function replaceArgsInFilenamesWalkDirs(dirPath: string, args: object) {
	const entries = fs.readdirSync(dirPath);
	for (const entry of entries) {
		let entryName = entry;
		// check the keys in filenames and rename it
		for (const [k, v] of Object.entries(args)) {
			const keyReplacer = `__${k.toUpperCase()}__`;
			if (entryName.includes(keyReplacer)) {
				fs.renameSync(path.join(dirPath, entryName), path.join(dirPath, entryName.replace(keyReplacer, v)));
				entryName = entryName.replace(keyReplacer, v);
			}
		}
		// if its a dir walk on
		if (fs.statSync(path.join(dirPath, entryName)).isDirectory()) {
			replaceArgsInFilenamesWalkDirs(path.join(dirPath, entryName), args);
		}
	}
}

export function replaceArgsInFilenames(dirPath: string, args: object) {
	replaceArgsInFilenamesWalkDirs(dirPath, args);
}

function renderTemplatesWalkDirs(dirPath: string, args: object) {
	const entries = fs.readdirSync(dirPath);
	for (const entry of entries) {
		// if its a dir walk on
		if (fs.statSync(path.join(dirPath, entry)).isDirectory()) {
			renderTemplatesWalkDirs(path.join(dirPath, entry), args);
			continue;
		}

		if(entry.endsWith(".eta")) {
			// read
			const content = fs.readFileSync(path.join(dirPath, entry));
			// render
			const res = eta.renderString(content.toString(), args);
			// write rendered result without ending
			fs.writeFileSync(path.join(dirPath, entry.slice(0, -4)), res);
			// delete template file
			fs.rmSync(path.join(dirPath, entry));
		}
	}
}

export function renderTemplates(dirPath:string, args:object) {
	renderTemplatesWalkDirs(dirPath,args);

}
