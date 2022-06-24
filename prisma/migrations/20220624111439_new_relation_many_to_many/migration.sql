/*
  Warnings:

  - A unique constraint covering the columns `[car_id]` on the table `specification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_id` to the `specification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` ADD COLUMN `specificationsId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `specification` ADD COLUMN `car_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `specification_car_id_key` ON `specification`(`car_id`);

-- AddForeignKey
ALTER TABLE `specification` ADD CONSTRAINT `specification_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
