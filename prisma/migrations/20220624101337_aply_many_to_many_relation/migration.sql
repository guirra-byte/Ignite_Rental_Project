/*
  Warnings:

  - You are about to drop the `_cartospecifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cartospecifications` DROP FOREIGN KEY `_CarToSpecifications_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartospecifications` DROP FOREIGN KEY `_CarToSpecifications_B_fkey`;

-- DropTable
DROP TABLE `_cartospecifications`;

-- CreateTable
CREATE TABLE `car_specification` (
    `car_id` VARCHAR(191) NOT NULL,
    `specification_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `car_specification_car_id_key`(`car_id`),
    UNIQUE INDEX `car_specification_specification_id_key`(`specification_id`),
    PRIMARY KEY (`car_id`, `specification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `car_specification` ADD CONSTRAINT `car_specification_specification_id_fkey` FOREIGN KEY (`specification_id`) REFERENCES `specification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `car_specification` ADD CONSTRAINT `car_specification_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
