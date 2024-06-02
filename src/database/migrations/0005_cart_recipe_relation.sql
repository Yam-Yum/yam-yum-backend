CREATE TABLE `cart_recipe` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`cart_id` varchar(255) NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cart_recipe_id` PRIMARY KEY(`id`),
	CONSTRAINT `cart_recipe_id_unique` UNIQUE(`id`),
	CONSTRAINT `cart_recipe_cart_id_recipe_id_unique` UNIQUE(`cart_id`,`recipe_id`)
);
--> statement-breakpoint
ALTER TABLE `address` RENAME COLUMN `description` TO `addressLine1`;--> statement-breakpoint
ALTER TABLE `cart` DROP FOREIGN KEY `cart_recipe_id_recipe_id_fk`;
--> statement-breakpoint
ALTER TABLE `order` MODIFY COLUMN `total_price` double NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` MODIFY COLUMN `price` double NOT NULL;--> statement-breakpoint
ALTER TABLE `review` MODIFY COLUMN `rating` int unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` MODIFY COLUMN `balance` double NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` MODIFY COLUMN `balance` double NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `address` ADD `addressLine2` varchar(255);--> statement-breakpoint
ALTER TABLE `recipe` ADD `rate` double DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `cart_recipe` ADD CONSTRAINT `cart_recipe_cart_id_cart_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart_recipe` ADD CONSTRAINT `cart_recipe_recipe_id_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart` DROP COLUMN `recipe_id`;