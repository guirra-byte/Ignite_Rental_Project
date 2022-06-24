-- AlterTable
ALTER TABLE `cars` ADD COLUMN `specification_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_specification_id_fkey` FOREIGN KEY (`specification_id`) REFERENCES `specification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
