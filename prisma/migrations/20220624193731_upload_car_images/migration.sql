-- CreateTable
CREATE TABLE `CarImages` (
    `id` VARCHAR(191) NOT NULL,
    `image_name` VARCHAR(191) NOT NULL,
    `car_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarImages` ADD CONSTRAINT `CarImages_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
