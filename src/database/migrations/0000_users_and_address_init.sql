CREATE TABLE `address` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`description` varchar(255) NOT NULL,
	`longitude` varchar(255) NOT NULL,
	`latitude` varchar(255) NOT NULL,
	`type` enum('home','office','other') NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `address_id` PRIMARY KEY(`id`),
	CONSTRAINT `address_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`phone_number` varchar(255) NOT NULL,
	`profile_picture` varchar(255),
	`date_of_birth` timestamp NOT NULL,
	`gender` enum('male','female') NOT NULL,
	`role` enum('guest','chief','client','admin') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_number_unique` UNIQUE(`phone_number`)
);
--> statement-breakpoint
ALTER TABLE `address` ADD CONSTRAINT `address_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;