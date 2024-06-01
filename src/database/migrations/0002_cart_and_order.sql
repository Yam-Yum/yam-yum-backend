CREATE TABLE `cart` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`total_price` double NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cart_id` PRIMARY KEY(`id`),
	CONSTRAINT `cart_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`status` enum('placed','preparing','prepared','delivered','cancelled') NOT NULL,
	`payment_method` enum('cash','card') NOT NULL,
	`total_price` varchar(255) NOT NULL,
	`address_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_id` PRIMARY KEY(`id`),
	CONSTRAINT `order_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_recipe` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`order_id` varchar(255) NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_recipe_id` PRIMARY KEY(`id`),
	CONSTRAINT `order_recipe_id_unique` UNIQUE(`id`),
	CONSTRAINT `order_recipe_order_id_recipe_id_unique` UNIQUE(`order_id`,`recipe_id`)
);
--> statement-breakpoint
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart` ADD CONSTRAINT `cart_recipe_id_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_recipe` ADD CONSTRAINT `order_recipe_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_recipe` ADD CONSTRAINT `order_recipe_recipe_id_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;