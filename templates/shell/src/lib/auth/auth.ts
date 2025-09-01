import { usePB } from "../pocketbase/pocketbase";
import type { ParsedLocation } from "@tanstack/react-router";

export async function doAuth(redirectLocation: ParsedLocation<{}>): Promise<void> {
	// TODO: add your auth logic here
	// const pb = usePB();
	// if (!pb.authStore.isValid) {
	// 	const email = prompt("email");
	//	const pw = prompt("password");
	//	await pb.collection('users').authWithPassword(email as string, pw as string);
	// }
}
