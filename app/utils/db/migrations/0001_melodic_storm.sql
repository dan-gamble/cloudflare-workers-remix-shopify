CREATE TABLE `shopify_font_families` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`default_variant_handle` text NOT NULL,
	`name` text NOT NULL,
	`performant` integer NOT NULL,
	`provider` text NOT NULL,
	`variants` text NOT NULL
);
