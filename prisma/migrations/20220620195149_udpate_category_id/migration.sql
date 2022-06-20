/*
  Warnings:

  - You are about to drop the column `categoryId` on the `cars` table. All the data in the column will be lost.
  - Made the column `category_id` on table `cars` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_categoryId_fkey`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `categoryId`,
    MODIFY `category_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
