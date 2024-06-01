CREATE TABLE `chief_request_application` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`request_number` serial AUTO_INCREMENT NOT NULL,
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chief_request_application_id` PRIMARY KEY(`id`),
	CONSTRAINT `chief_request_application_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `review` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`comment` text NOT NULL,
	`rating` int NOT NULL,
	`recipe_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_id` PRIMARY KEY(`id`),
	CONSTRAINT `review_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `review_recipe_id_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;