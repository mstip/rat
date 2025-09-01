import PocketBase from 'pocketbase';

let pb: PocketBase | null = null;

export function usePB() {
	if (pb === null) {
		pb = new PocketBase('http://127.0.0.1:8090');
	}
	return pb;
}
