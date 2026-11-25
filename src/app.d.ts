// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		/** The root layout loads the course outline for every page. */
		interface PageData {
			outline: import('#lib/course.ts').Outline;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
