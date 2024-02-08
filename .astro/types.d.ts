declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"bun": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "bun";
  data: any
} & { render(): Render[".md"] };
};
"c": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "c";
  data: any
} & { render(): Render[".md"] };
};
"common": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "common";
  data: any
} & { render(): Render[".md"] };
};
"computer_science": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "computer_science";
  data: any
} & { render(): Render[".md"] };
};
"css": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"100.md": {
	id: "100.md";
  slug: "100";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"101.md": {
	id: "101.md";
  slug: "101";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"102.md": {
	id: "102.md";
  slug: "102";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"103.md": {
	id: "103.md";
  slug: "103";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"104.md": {
	id: "104.md";
  slug: "104";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"105.md": {
	id: "105.md";
  slug: "105";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"106.md": {
	id: "106.md";
  slug: "106";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"107.md": {
	id: "107.md";
  slug: "107";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"108.md": {
	id: "108.md";
  slug: "108";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"109.md": {
	id: "109.md";
  slug: "109";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"110.md": {
	id: "110.md";
  slug: "110";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"111.md": {
	id: "111.md";
  slug: "111";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"112.md": {
	id: "112.md";
  slug: "112";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"113.md": {
	id: "113.md";
  slug: "113";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"114.md": {
	id: "114.md";
  slug: "114";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"115.md": {
	id: "115.md";
  slug: "115";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"116.md": {
	id: "116.md";
  slug: "116";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"117.md": {
	id: "117.md";
  slug: "117";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"118.md": {
	id: "118.md";
  slug: "118";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"119.md": {
	id: "119.md";
  slug: "119";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"120.md": {
	id: "120.md";
  slug: "120";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"121.md": {
	id: "121.md";
  slug: "121";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"122.md": {
	id: "122.md";
  slug: "122";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"123.md": {
	id: "123.md";
  slug: "123";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"124.md": {
	id: "124.md";
  slug: "124";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"125.md": {
	id: "125.md";
  slug: "125";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"126.md": {
	id: "126.md";
  slug: "126";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"127.md": {
	id: "127.md";
  slug: "127";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"128.md": {
	id: "128.md";
  slug: "128";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"129.md": {
	id: "129.md";
  slug: "129";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"130.md": {
	id: "130.md";
  slug: "130";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"131.md": {
	id: "131.md";
  slug: "131";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"132.md": {
	id: "132.md";
  slug: "132";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"133.md": {
	id: "133.md";
  slug: "133";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"134.md": {
	id: "134.md";
  slug: "134";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"135.md": {
	id: "135.md";
  slug: "135";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"136.md": {
	id: "136.md";
  slug: "136";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"137.md": {
	id: "137.md";
  slug: "137";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"138.md": {
	id: "138.md";
  slug: "138";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"139.md": {
	id: "139.md";
  slug: "139";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"140.md": {
	id: "140.md";
  slug: "140";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"141.md": {
	id: "141.md";
  slug: "141";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"142.md": {
	id: "142.md";
  slug: "142";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"143.md": {
	id: "143.md";
  slug: "143";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"144.md": {
	id: "144.md";
  slug: "144";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"145.md": {
	id: "145.md";
  slug: "145";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"146.md": {
	id: "146.md";
  slug: "146";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"147.md": {
	id: "147.md";
  slug: "147";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"148.md": {
	id: "148.md";
  slug: "148";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"149.md": {
	id: "149.md";
  slug: "149";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"150.md": {
	id: "150.md";
  slug: "150";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"151.md": {
	id: "151.md";
  slug: "151";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"152.md": {
	id: "152.md";
  slug: "152";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"153.md": {
	id: "153.md";
  slug: "153";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"154.md": {
	id: "154.md";
  slug: "154";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"155.md": {
	id: "155.md";
  slug: "155";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"156.md": {
	id: "156.md";
  slug: "156";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"157.md": {
	id: "157.md";
  slug: "157";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"158.md": {
	id: "158.md";
  slug: "158";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"159.md": {
	id: "159.md";
  slug: "159";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"160.md": {
	id: "160.md";
  slug: "160";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"161.md": {
	id: "161.md";
  slug: "161";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"162.md": {
	id: "162.md";
  slug: "162";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"163.md": {
	id: "163.md";
  slug: "163";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"164.md": {
	id: "164.md";
  slug: "164";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"165.md": {
	id: "165.md";
  slug: "165";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"166.md": {
	id: "166.md";
  slug: "166";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"167.md": {
	id: "167.md";
  slug: "167";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"168.md": {
	id: "168.md";
  slug: "168";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"169.md": {
	id: "169.md";
  slug: "169";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"170.md": {
	id: "170.md";
  slug: "170";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"171.md": {
	id: "171.md";
  slug: "171";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"172.md": {
	id: "172.md";
  slug: "172";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"173.md": {
	id: "173.md";
  slug: "173";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"174.md": {
	id: "174.md";
  slug: "174";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"175.md": {
	id: "175.md";
  slug: "175";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"176.md": {
	id: "176.md";
  slug: "176";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"177.md": {
	id: "177.md";
  slug: "177";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"178.md": {
	id: "178.md";
  slug: "178";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"179.md": {
	id: "179.md";
  slug: "179";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"180.md": {
	id: "180.md";
  slug: "180";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"181.md": {
	id: "181.md";
  slug: "181";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"182.md": {
	id: "182.md";
  slug: "182";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"183.md": {
	id: "183.md";
  slug: "183";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"184.md": {
	id: "184.md";
  slug: "184";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"185.md": {
	id: "185.md";
  slug: "185";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"186.md": {
	id: "186.md";
  slug: "186";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"187.md": {
	id: "187.md";
  slug: "187";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"188.md": {
	id: "188.md";
  slug: "188";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"189.md": {
	id: "189.md";
  slug: "189";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"190.md": {
	id: "190.md";
  slug: "190";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"191.md": {
	id: "191.md";
  slug: "191";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"192.md": {
	id: "192.md";
  slug: "192";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"193.md": {
	id: "193.md";
  slug: "193";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"194.md": {
	id: "194.md";
  slug: "194";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"195.md": {
	id: "195.md";
  slug: "195";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"196.md": {
	id: "196.md";
  slug: "196";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"197.md": {
	id: "197.md";
  slug: "197";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"198.md": {
	id: "198.md";
  slug: "198";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"199.md": {
	id: "199.md";
  slug: "199";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"200.md": {
	id: "200.md";
  slug: "200";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"201.md": {
	id: "201.md";
  slug: "201";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"202.md": {
	id: "202.md";
  slug: "202";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"203.md": {
	id: "203.md";
  slug: "203";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"204.md": {
	id: "204.md";
  slug: "204";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"205.md": {
	id: "205.md";
  slug: "205";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"206.md": {
	id: "206.md";
  slug: "206";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"207.md": {
	id: "207.md";
  slug: "207";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"208.md": {
	id: "208.md";
  slug: "208";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"209.md": {
	id: "209.md";
  slug: "209";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"210.md": {
	id: "210.md";
  slug: "210";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"211.md": {
	id: "211.md";
  slug: "211";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"212.md": {
	id: "212.md";
  slug: "212";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"213.md": {
	id: "213.md";
  slug: "213";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"214.md": {
	id: "214.md";
  slug: "214";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"215.md": {
	id: "215.md";
  slug: "215";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"216.md": {
	id: "216.md";
  slug: "216";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"217.md": {
	id: "217.md";
  slug: "217";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"218.md": {
	id: "218.md";
  slug: "218";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"219.md": {
	id: "219.md";
  slug: "219";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"220.md": {
	id: "220.md";
  slug: "220";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"221.md": {
	id: "221.md";
  slug: "221";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"222.md": {
	id: "222.md";
  slug: "222";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"223.md": {
	id: "223.md";
  slug: "223";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"224.md": {
	id: "224.md";
  slug: "224";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"225.md": {
	id: "225.md";
  slug: "225";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"226.md": {
	id: "226.md";
  slug: "226";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"227.md": {
	id: "227.md";
  slug: "227";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"228.md": {
	id: "228.md";
  slug: "228";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"229.md": {
	id: "229.md";
  slug: "229";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"230.md": {
	id: "230.md";
  slug: "230";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"231.md": {
	id: "231.md";
  slug: "231";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"232.md": {
	id: "232.md";
  slug: "232";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"233.md": {
	id: "233.md";
  slug: "233";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"234.md": {
	id: "234.md";
  slug: "234";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"235.md": {
	id: "235.md";
  slug: "235";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"236.md": {
	id: "236.md";
  slug: "236";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"237.md": {
	id: "237.md";
  slug: "237";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"238.md": {
	id: "238.md";
  slug: "238";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"239.md": {
	id: "239.md";
  slug: "239";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"240.md": {
	id: "240.md";
  slug: "240";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"241.md": {
	id: "241.md";
  slug: "241";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"242.md": {
	id: "242.md";
  slug: "242";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"243.md": {
	id: "243.md";
  slug: "243";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"244.md": {
	id: "244.md";
  slug: "244";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"245.md": {
	id: "245.md";
  slug: "245";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"246.md": {
	id: "246.md";
  slug: "246";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"247.md": {
	id: "247.md";
  slug: "247";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"248.md": {
	id: "248.md";
  slug: "248";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"249.md": {
	id: "249.md";
  slug: "249";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"250.md": {
	id: "250.md";
  slug: "250";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"251.md": {
	id: "251.md";
  slug: "251";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"252.md": {
	id: "252.md";
  slug: "252";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"253.md": {
	id: "253.md";
  slug: "253";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"254.md": {
	id: "254.md";
  slug: "254";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"255.md": {
	id: "255.md";
  slug: "255";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"256.md": {
	id: "256.md";
  slug: "256";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"257.md": {
	id: "257.md";
  slug: "257";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"258.md": {
	id: "258.md";
  slug: "258";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"259.md": {
	id: "259.md";
  slug: "259";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"260.md": {
	id: "260.md";
  slug: "260";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"261.md": {
	id: "261.md";
  slug: "261";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"262.md": {
	id: "262.md";
  slug: "262";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"263.md": {
	id: "263.md";
  slug: "263";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"264.md": {
	id: "264.md";
  slug: "264";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"265.md": {
	id: "265.md";
  slug: "265";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"266.md": {
	id: "266.md";
  slug: "266";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"267.md": {
	id: "267.md";
  slug: "267";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"268.md": {
	id: "268.md";
  slug: "268";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"269.md": {
	id: "269.md";
  slug: "269";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"270.md": {
	id: "270.md";
  slug: "270";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"271.md": {
	id: "271.md";
  slug: "271";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"272.md": {
	id: "272.md";
  slug: "272";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"273.md": {
	id: "273.md";
  slug: "273";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"274.md": {
	id: "274.md";
  slug: "274";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"275.md": {
	id: "275.md";
  slug: "275";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"276.md": {
	id: "276.md";
  slug: "276";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"277.md": {
	id: "277.md";
  slug: "277";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"278.md": {
	id: "278.md";
  slug: "278";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"279.md": {
	id: "279.md";
  slug: "279";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"280.md": {
	id: "280.md";
  slug: "280";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"281.md": {
	id: "281.md";
  slug: "281";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"282.md": {
	id: "282.md";
  slug: "282";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"283.md": {
	id: "283.md";
  slug: "283";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"284.md": {
	id: "284.md";
  slug: "284";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"285.md": {
	id: "285.md";
  slug: "285";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"286.md": {
	id: "286.md";
  slug: "286";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"287.md": {
	id: "287.md";
  slug: "287";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"288.md": {
	id: "288.md";
  slug: "288";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"289.md": {
	id: "289.md";
  slug: "289";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"290.md": {
	id: "290.md";
  slug: "290";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"291.md": {
	id: "291.md";
  slug: "291";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"292.md": {
	id: "292.md";
  slug: "292";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"293.md": {
	id: "293.md";
  slug: "293";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"294.md": {
	id: "294.md";
  slug: "294";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"295.md": {
	id: "295.md";
  slug: "295";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"296.md": {
	id: "296.md";
  slug: "296";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"297.md": {
	id: "297.md";
  slug: "297";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"298.md": {
	id: "298.md";
  slug: "298";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"299.md": {
	id: "299.md";
  slug: "299";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"300.md": {
	id: "300.md";
  slug: "300";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"301.md": {
	id: "301.md";
  slug: "301";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"302.md": {
	id: "302.md";
  slug: "302";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"303.md": {
	id: "303.md";
  slug: "303";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"304.md": {
	id: "304.md";
  slug: "304";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"305.md": {
	id: "305.md";
  slug: "305";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"306.md": {
	id: "306.md";
  slug: "306";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"307.md": {
	id: "307.md";
  slug: "307";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"308.md": {
	id: "308.md";
  slug: "308";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"309.md": {
	id: "309.md";
  slug: "309";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"310.md": {
	id: "310.md";
  slug: "310";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"311.md": {
	id: "311.md";
  slug: "311";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"312.md": {
	id: "312.md";
  slug: "312";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"313.md": {
	id: "313.md";
  slug: "313";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"314.md": {
	id: "314.md";
  slug: "314";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"315.md": {
	id: "315.md";
  slug: "315";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"316.md": {
	id: "316.md";
  slug: "316";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"317.md": {
	id: "317.md";
  slug: "317";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"318.md": {
	id: "318.md";
  slug: "318";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"319.md": {
	id: "319.md";
  slug: "319";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"320.md": {
	id: "320.md";
  slug: "320";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"321.md": {
	id: "321.md";
  slug: "321";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"322.md": {
	id: "322.md";
  slug: "322";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"323.md": {
	id: "323.md";
  slug: "323";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"324.md": {
	id: "324.md";
  slug: "324";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"325.md": {
	id: "325.md";
  slug: "325";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"326.md": {
	id: "326.md";
  slug: "326";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"327.md": {
	id: "327.md";
  slug: "327";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"328.md": {
	id: "328.md";
  slug: "328";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"329.md": {
	id: "329.md";
  slug: "329";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"330.md": {
	id: "330.md";
  slug: "330";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"331.md": {
	id: "331.md";
  slug: "331";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"332.md": {
	id: "332.md";
  slug: "332";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"333.md": {
	id: "333.md";
  slug: "333";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"334.md": {
	id: "334.md";
  slug: "334";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"335.md": {
	id: "335.md";
  slug: "335";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"336.md": {
	id: "336.md";
  slug: "336";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"337.md": {
	id: "337.md";
  slug: "337";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"338.md": {
	id: "338.md";
  slug: "338";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"339.md": {
	id: "339.md";
  slug: "339";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"340.md": {
	id: "340.md";
  slug: "340";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"341.md": {
	id: "341.md";
  slug: "341";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"342.md": {
	id: "342.md";
  slug: "342";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"343.md": {
	id: "343.md";
  slug: "343";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"344.md": {
	id: "344.md";
  slug: "344";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"345.md": {
	id: "345.md";
  slug: "345";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"346.md": {
	id: "346.md";
  slug: "346";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"347.md": {
	id: "347.md";
  slug: "347";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"348.md": {
	id: "348.md";
  slug: "348";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"349.md": {
	id: "349.md";
  slug: "349";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"350.md": {
	id: "350.md";
  slug: "350";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"351.md": {
	id: "351.md";
  slug: "351";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"352.md": {
	id: "352.md";
  slug: "352";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"353.md": {
	id: "353.md";
  slug: "353";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"354.md": {
	id: "354.md";
  slug: "354";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"355.md": {
	id: "355.md";
  slug: "355";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"356.md": {
	id: "356.md";
  slug: "356";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"357.md": {
	id: "357.md";
  slug: "357";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"358.md": {
	id: "358.md";
  slug: "358";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"359.md": {
	id: "359.md";
  slug: "359";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"360.md": {
	id: "360.md";
  slug: "360";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"361.md": {
	id: "361.md";
  slug: "361";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"362.md": {
	id: "362.md";
  slug: "362";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"363.md": {
	id: "363.md";
  slug: "363";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"364.md": {
	id: "364.md";
  slug: "364";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"365.md": {
	id: "365.md";
  slug: "365";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"366.md": {
	id: "366.md";
  slug: "366";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"367.md": {
	id: "367.md";
  slug: "367";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"368.md": {
	id: "368.md";
  slug: "368";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"369.md": {
	id: "369.md";
  slug: "369";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"370.md": {
	id: "370.md";
  slug: "370";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"371.md": {
	id: "371.md";
  slug: "371";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"372.md": {
	id: "372.md";
  slug: "372";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"373.md": {
	id: "373.md";
  slug: "373";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"374.md": {
	id: "374.md";
  slug: "374";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"375.md": {
	id: "375.md";
  slug: "375";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"376.md": {
	id: "376.md";
  slug: "376";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"377.md": {
	id: "377.md";
  slug: "377";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"378.md": {
	id: "378.md";
  slug: "378";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"44.md": {
	id: "44.md";
  slug: "44";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"45.md": {
	id: "45.md";
  slug: "45";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"46.md": {
	id: "46.md";
  slug: "46";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"47.md": {
	id: "47.md";
  slug: "47";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"48.md": {
	id: "48.md";
  slug: "48";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"49.md": {
	id: "49.md";
  slug: "49";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"50.md": {
	id: "50.md";
  slug: "50";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"51.md": {
	id: "51.md";
  slug: "51";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"52.md": {
	id: "52.md";
  slug: "52";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"53.md": {
	id: "53.md";
  slug: "53";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"54.md": {
	id: "54.md";
  slug: "54";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"55.md": {
	id: "55.md";
  slug: "55";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"56.md": {
	id: "56.md";
  slug: "56";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"57.md": {
	id: "57.md";
  slug: "57";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"58.md": {
	id: "58.md";
  slug: "58";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"59.md": {
	id: "59.md";
  slug: "59";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"60.md": {
	id: "60.md";
  slug: "60";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"61.md": {
	id: "61.md";
  slug: "61";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"62.md": {
	id: "62.md";
  slug: "62";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"63.md": {
	id: "63.md";
  slug: "63";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"64.md": {
	id: "64.md";
  slug: "64";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"65.md": {
	id: "65.md";
  slug: "65";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"66.md": {
	id: "66.md";
  slug: "66";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"67.md": {
	id: "67.md";
  slug: "67";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"68.md": {
	id: "68.md";
  slug: "68";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"69.md": {
	id: "69.md";
  slug: "69";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"70.md": {
	id: "70.md";
  slug: "70";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"71.md": {
	id: "71.md";
  slug: "71";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"72.md": {
	id: "72.md";
  slug: "72";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"73.md": {
	id: "73.md";
  slug: "73";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"74.md": {
	id: "74.md";
  slug: "74";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"75.md": {
	id: "75.md";
  slug: "75";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"76.md": {
	id: "76.md";
  slug: "76";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"77.md": {
	id: "77.md";
  slug: "77";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"78.md": {
	id: "78.md";
  slug: "78";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"79.md": {
	id: "79.md";
  slug: "79";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"80.md": {
	id: "80.md";
  slug: "80";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"81.md": {
	id: "81.md";
  slug: "81";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"82.md": {
	id: "82.md";
  slug: "82";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"83.md": {
	id: "83.md";
  slug: "83";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"84.md": {
	id: "84.md";
  slug: "84";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"85.md": {
	id: "85.md";
  slug: "85";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"86.md": {
	id: "86.md";
  slug: "86";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"87.md": {
	id: "87.md";
  slug: "87";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"88.md": {
	id: "88.md";
  slug: "88";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"89.md": {
	id: "89.md";
  slug: "89";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"90.md": {
	id: "90.md";
  slug: "90";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"91.md": {
	id: "91.md";
  slug: "91";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"92.md": {
	id: "92.md";
  slug: "92";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"93.md": {
	id: "93.md";
  slug: "93";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"94.md": {
	id: "94.md";
  slug: "94";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"95.md": {
	id: "95.md";
  slug: "95";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"96.md": {
	id: "96.md";
  slug: "96";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"97.md": {
	id: "97.md";
  slug: "97";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"98.md": {
	id: "98.md";
  slug: "98";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
"99.md": {
	id: "99.md";
  slug: "99";
  body: string;
  collection: "css";
  data: any
} & { render(): Render[".md"] };
};
"curl": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "curl";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "curl";
  data: any
} & { render(): Render[".md"] };
};
"electron": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "electron";
  data: any
} & { render(): Render[".md"] };
};
"electronics": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "electronics";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "electronics";
  data: any
} & { render(): Render[".md"] };
};
"express_typescript": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "express_typescript";
  data: any
} & { render(): Render[".md"] };
};
"git": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "git";
  data: any
} & { render(): Render[".md"] };
};
"github-gitlab": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "github-gitlab";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "github-gitlab";
  data: any
} & { render(): Render[".md"] };
};
"gjs": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "gjs";
  data: any
} & { render(): Render[".md"] };
};
"gnome": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "gnome";
  data: any
} & { render(): Render[".md"] };
};
"heap": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "heap";
  data: any
} & { render(): Render[".md"] };
};
"html": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"100.md": {
	id: "100.md";
  slug: "100";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"101.md": {
	id: "101.md";
  slug: "101";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"102.md": {
	id: "102.md";
  slug: "102";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"103.md": {
	id: "103.md";
  slug: "103";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"104.md": {
	id: "104.md";
  slug: "104";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"105.md": {
	id: "105.md";
  slug: "105";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"106.md": {
	id: "106.md";
  slug: "106";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"107.md": {
	id: "107.md";
  slug: "107";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"108.md": {
	id: "108.md";
  slug: "108";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"109.md": {
	id: "109.md";
  slug: "109";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"110.md": {
	id: "110.md";
  slug: "110";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"111.md": {
	id: "111.md";
  slug: "111";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"44.md": {
	id: "44.md";
  slug: "44";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"45.md": {
	id: "45.md";
  slug: "45";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"46.md": {
	id: "46.md";
  slug: "46";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"47.md": {
	id: "47.md";
  slug: "47";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"48.md": {
	id: "48.md";
  slug: "48";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"49.md": {
	id: "49.md";
  slug: "49";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"50.md": {
	id: "50.md";
  slug: "50";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"51.md": {
	id: "51.md";
  slug: "51";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"52.md": {
	id: "52.md";
  slug: "52";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"53.md": {
	id: "53.md";
  slug: "53";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"54.md": {
	id: "54.md";
  slug: "54";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"55.md": {
	id: "55.md";
  slug: "55";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"56.md": {
	id: "56.md";
  slug: "56";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"57.md": {
	id: "57.md";
  slug: "57";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"58.md": {
	id: "58.md";
  slug: "58";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"59.md": {
	id: "59.md";
  slug: "59";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"60.md": {
	id: "60.md";
  slug: "60";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"61.md": {
	id: "61.md";
  slug: "61";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"62.md": {
	id: "62.md";
  slug: "62";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"63.md": {
	id: "63.md";
  slug: "63";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"64.md": {
	id: "64.md";
  slug: "64";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"65.md": {
	id: "65.md";
  slug: "65";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"66.md": {
	id: "66.md";
  slug: "66";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"67.md": {
	id: "67.md";
  slug: "67";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"68.md": {
	id: "68.md";
  slug: "68";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"69.md": {
	id: "69.md";
  slug: "69";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"70.md": {
	id: "70.md";
  slug: "70";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"71.md": {
	id: "71.md";
  slug: "71";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"72.md": {
	id: "72.md";
  slug: "72";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"73.md": {
	id: "73.md";
  slug: "73";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"74.md": {
	id: "74.md";
  slug: "74";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"75.md": {
	id: "75.md";
  slug: "75";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"76.md": {
	id: "76.md";
  slug: "76";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"77.md": {
	id: "77.md";
  slug: "77";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"78.md": {
	id: "78.md";
  slug: "78";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"79.md": {
	id: "79.md";
  slug: "79";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"80.md": {
	id: "80.md";
  slug: "80";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"81.md": {
	id: "81.md";
  slug: "81";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"82.md": {
	id: "82.md";
  slug: "82";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"83.md": {
	id: "83.md";
  slug: "83";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"84.md": {
	id: "84.md";
  slug: "84";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"85.md": {
	id: "85.md";
  slug: "85";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"86.md": {
	id: "86.md";
  slug: "86";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"87.md": {
	id: "87.md";
  slug: "87";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"88.md": {
	id: "88.md";
  slug: "88";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"89.md": {
	id: "89.md";
  slug: "89";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"90.md": {
	id: "90.md";
  slug: "90";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"91.md": {
	id: "91.md";
  slug: "91";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"92.md": {
	id: "92.md";
  slug: "92";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"93.md": {
	id: "93.md";
  slug: "93";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"94.md": {
	id: "94.md";
  slug: "94";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"95.md": {
	id: "95.md";
  slug: "95";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"96.md": {
	id: "96.md";
  slug: "96";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"97.md": {
	id: "97.md";
  slug: "97";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"98.md": {
	id: "98.md";
  slug: "98";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
"99.md": {
	id: "99.md";
  slug: "99";
  body: string;
  collection: "html";
  data: any
} & { render(): Render[".md"] };
};
"javascript": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "javascript";
  data: any
} & { render(): Render[".md"] };
};
"linux": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "linux";
  data: any
} & { render(): Render[".md"] };
};
"makefile": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "makefile";
  data: any
} & { render(): Render[".md"] };
};
"markdown": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "markdown";
  data: any
} & { render(): Render[".md"] };
};
"node.js": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "node.js";
  data: any
} & { render(): Render[".md"] };
};
"node.js_typescript": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "node.js_typescript";
  data: any
} & { render(): Render[".md"] };
};
"python": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "python";
  data: any
} & { render(): Render[".md"] };
};
"redis": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
};
"scss": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "scss";
  data: any
} & { render(): Render[".md"] };
};
"terminal_bash": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"100.md": {
	id: "100.md";
  slug: "100";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"101.md": {
	id: "101.md";
  slug: "101";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"102.md": {
	id: "102.md";
  slug: "102";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"44.md": {
	id: "44.md";
  slug: "44";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"45.md": {
	id: "45.md";
  slug: "45";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"46.md": {
	id: "46.md";
  slug: "46";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"47.md": {
	id: "47.md";
  slug: "47";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"48.md": {
	id: "48.md";
  slug: "48";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"49.md": {
	id: "49.md";
  slug: "49";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"50.md": {
	id: "50.md";
  slug: "50";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"51.md": {
	id: "51.md";
  slug: "51";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"52.md": {
	id: "52.md";
  slug: "52";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"53.md": {
	id: "53.md";
  slug: "53";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"54.md": {
	id: "54.md";
  slug: "54";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"55.md": {
	id: "55.md";
  slug: "55";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"56.md": {
	id: "56.md";
  slug: "56";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"57.md": {
	id: "57.md";
  slug: "57";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"58.md": {
	id: "58.md";
  slug: "58";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"59.md": {
	id: "59.md";
  slug: "59";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"60.md": {
	id: "60.md";
  slug: "60";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"61.md": {
	id: "61.md";
  slug: "61";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"62.md": {
	id: "62.md";
  slug: "62";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"63.md": {
	id: "63.md";
  slug: "63";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"64.md": {
	id: "64.md";
  slug: "64";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"65.md": {
	id: "65.md";
  slug: "65";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"66.md": {
	id: "66.md";
  slug: "66";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"67.md": {
	id: "67.md";
  slug: "67";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"68.md": {
	id: "68.md";
  slug: "68";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"69.md": {
	id: "69.md";
  slug: "69";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"70.md": {
	id: "70.md";
  slug: "70";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"71.md": {
	id: "71.md";
  slug: "71";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"72.md": {
	id: "72.md";
  slug: "72";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"73.md": {
	id: "73.md";
  slug: "73";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"74.md": {
	id: "74.md";
  slug: "74";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"75.md": {
	id: "75.md";
  slug: "75";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"76.md": {
	id: "76.md";
  slug: "76";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"77.md": {
	id: "77.md";
  slug: "77";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"78.md": {
	id: "78.md";
  slug: "78";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"79.md": {
	id: "79.md";
  slug: "79";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"80.md": {
	id: "80.md";
  slug: "80";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"81.md": {
	id: "81.md";
  slug: "81";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"82.md": {
	id: "82.md";
  slug: "82";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"83.md": {
	id: "83.md";
  slug: "83";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"84.md": {
	id: "84.md";
  slug: "84";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"85.md": {
	id: "85.md";
  slug: "85";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"86.md": {
	id: "86.md";
  slug: "86";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"87.md": {
	id: "87.md";
  slug: "87";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"88.md": {
	id: "88.md";
  slug: "88";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"89.md": {
	id: "89.md";
  slug: "89";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"90.md": {
	id: "90.md";
  slug: "90";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"91.md": {
	id: "91.md";
  slug: "91";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"92.md": {
	id: "92.md";
  slug: "92";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"93.md": {
	id: "93.md";
  slug: "93";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"94.md": {
	id: "94.md";
  slug: "94";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"95.md": {
	id: "95.md";
  slug: "95";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"96.md": {
	id: "96.md";
  slug: "96";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"97.md": {
	id: "97.md";
  slug: "97";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"98.md": {
	id: "98.md";
  slug: "98";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
"99.md": {
	id: "99.md";
  slug: "99";
  body: string;
  collection: "terminal_bash";
  data: any
} & { render(): Render[".md"] };
};
"tmux": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "tmux";
  data: any
} & { render(): Render[".md"] };
};
"typescript": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "typescript";
  data: any
} & { render(): Render[".md"] };
};
"useful_know": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "useful_know";
  data: any
} & { render(): Render[".md"] };
};
"vim": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"44.md": {
	id: "44.md";
  slug: "44";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"45.md": {
	id: "45.md";
  slug: "45";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"46.md": {
	id: "46.md";
  slug: "46";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"47.md": {
	id: "47.md";
  slug: "47";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"48.md": {
	id: "48.md";
  slug: "48";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"49.md": {
	id: "49.md";
  slug: "49";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"50.md": {
	id: "50.md";
  slug: "50";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "vim";
  data: any
} & { render(): Render[".md"] };
};
"vscode": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "vscode";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "vscode";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "vscode";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "vscode";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "vscode";
  data: any
} & { render(): Render[".md"] };
};
"vue": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"10.md": {
	id: "10.md";
  slug: "10";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"11.md": {
	id: "11.md";
  slug: "11";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"12.md": {
	id: "12.md";
  slug: "12";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"13.md": {
	id: "13.md";
  slug: "13";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"14.md": {
	id: "14.md";
  slug: "14";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"15.md": {
	id: "15.md";
  slug: "15";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"16.md": {
	id: "16.md";
  slug: "16";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"17.md": {
	id: "17.md";
  slug: "17";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"18.md": {
	id: "18.md";
  slug: "18";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"19.md": {
	id: "19.md";
  slug: "19";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"20.md": {
	id: "20.md";
  slug: "20";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"21.md": {
	id: "21.md";
  slug: "21";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"22.md": {
	id: "22.md";
  slug: "22";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"23.md": {
	id: "23.md";
  slug: "23";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"24.md": {
	id: "24.md";
  slug: "24";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"25.md": {
	id: "25.md";
  slug: "25";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"26.md": {
	id: "26.md";
  slug: "26";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"27.md": {
	id: "27.md";
  slug: "27";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"28.md": {
	id: "28.md";
  slug: "28";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"29.md": {
	id: "29.md";
  slug: "29";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"30.md": {
	id: "30.md";
  slug: "30";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"31.md": {
	id: "31.md";
  slug: "31";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"32.md": {
	id: "32.md";
  slug: "32";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"33.md": {
	id: "33.md";
  slug: "33";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"34.md": {
	id: "34.md";
  slug: "34";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"35.md": {
	id: "35.md";
  slug: "35";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"36.md": {
	id: "36.md";
  slug: "36";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"37.md": {
	id: "37.md";
  slug: "37";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"38.md": {
	id: "38.md";
  slug: "38";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"39.md": {
	id: "39.md";
  slug: "39";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"40.md": {
	id: "40.md";
  slug: "40";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"41.md": {
	id: "41.md";
  slug: "41";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"42.md": {
	id: "42.md";
  slug: "42";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"43.md": {
	id: "43.md";
  slug: "43";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"44.md": {
	id: "44.md";
  slug: "44";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"45.md": {
	id: "45.md";
  slug: "45";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"46.md": {
	id: "46.md";
  slug: "46";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"47.md": {
	id: "47.md";
  slug: "47";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"48.md": {
	id: "48.md";
  slug: "48";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"49.md": {
	id: "49.md";
  slug: "49";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"50.md": {
	id: "50.md";
  slug: "50";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"51.md": {
	id: "51.md";
  slug: "51";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"52.md": {
	id: "52.md";
  slug: "52";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"53.md": {
	id: "53.md";
  slug: "53";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"54.md": {
	id: "54.md";
  slug: "54";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"55.md": {
	id: "55.md";
  slug: "55";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"56.md": {
	id: "56.md";
  slug: "56";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"57.md": {
	id: "57.md";
  slug: "57";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"58.md": {
	id: "58.md";
  slug: "58";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"59.md": {
	id: "59.md";
  slug: "59";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"60.md": {
	id: "60.md";
  slug: "60";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"61.md": {
	id: "61.md";
  slug: "61";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"62.md": {
	id: "62.md";
  slug: "62";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"63.md": {
	id: "63.md";
  slug: "63";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"64.md": {
	id: "64.md";
  slug: "64";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"65.md": {
	id: "65.md";
  slug: "65";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"8.md": {
	id: "8.md";
  slug: "8";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
"9.md": {
	id: "9.md";
  slug: "9";
  body: string;
  collection: "vue";
  data: any
} & { render(): Render[".md"] };
};
"war": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "war";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "war";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"_images": {
};
"_pages": {
};
"_video": {
};
"express_javascript": {
};
"law": {
};
"math": {
};
"physics": {
};
"react": {
};
"regexp": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
