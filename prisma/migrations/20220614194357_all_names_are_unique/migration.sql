/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `specification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cars_name_key` ON `cars`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `specification_name_key` ON `specification`(`name`);
