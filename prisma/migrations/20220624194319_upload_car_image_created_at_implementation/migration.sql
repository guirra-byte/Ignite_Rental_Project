-- DropForeignKey
ALTER TABLE `carimages` DROP FOREIGN KEY `CarImages_car_id_fkey`;

-- AlterTable
ALTER TABLE `carimages` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `carImages` ADD CONSTRAINT `carImages_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
