/*
  Warnings:

  - The values [SUPERADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER_ACCOUNT', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER_ACCOUNT';

-- CreateTable
CREATE TABLE `Personal_Token` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `expiry_time` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Personal_Token_user_id_key`(`user_id`),
    UNIQUE INDEX `Personal_Token_refresh_token_key`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Personal_Token` ADD CONSTRAINT `Personal_Token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
