CREATE TABLE `wallet` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`balance` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wallet_id` PRIMARY KEY(`id`),
	CONSTRAINT `wallet_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;