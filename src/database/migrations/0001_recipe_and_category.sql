CREATE TABLE `category` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`name` varchar(255) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` decimal NOT NULL,
	`preparation_time_in_seconds` bigint NOT NULL,
	`availability` boolean NOT NULL,
	`chief_id` varchar(255) NOT NULL,
	`category_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recipe_id` PRIMARY KEY(`id`),
	CONSTRAINT `recipe_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe_image` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`image_url` varchar(255) NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recipe_image_id` PRIMARY KEY(`id`),
	CONSTRAINT `recipe_image_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_chief_id_users_id_fk` FOREIGN KEY (`chief_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_image` ADD CONSTRAINT `recipe_image_recipe_id_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;