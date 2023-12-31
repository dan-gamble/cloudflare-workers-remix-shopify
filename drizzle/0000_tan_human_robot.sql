CREATE TABLE
  `shops` (
    `id` text PRIMARY KEY NOT NULL,
    `shop_domain` text NOT NULL,
    `app_id` text NOT NULL
  );

--> statement-breakpoint
CREATE UNIQUE INDEX `index_sessions_on_shop` ON `shops` (`shop_domain`);
