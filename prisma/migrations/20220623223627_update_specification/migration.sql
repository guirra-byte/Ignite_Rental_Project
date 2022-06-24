/*
  Warnings:

  - You are about to drop the column `specification_id` on the `cars` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_specification_id_fkey`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `specification_id`;

-- CreateTable
CREATE TABLE `_CarToSpecifications` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CarToSpecifications_AB_unique`(`A`, `B`),
    INDEX `_CarToSpecifications_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CarToSpecifications` ADD CONSTRAINT `_CarToSpecifications_A_fkey` FOREIGN KEY (`A`) REFERENCES `cars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarToSpecifications` ADD CONSTRAINT `_CarToSpecifications_B_fkey` FOREIGN KEY (`B`) REFERENCES `specification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
