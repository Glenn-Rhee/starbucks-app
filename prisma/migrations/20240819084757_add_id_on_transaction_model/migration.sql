/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `idCart` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    ADD COLUMN `idCart` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idCart`, `id`);
