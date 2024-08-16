/*
  Warnings:

  - Added the required column `type` to the `Coffe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coffe` ADD COLUMN `type` ENUM('Expresso', 'Americano', 'LongBlack', 'Cappucino', 'CaffeLatte', 'MoccaLatte', 'Afogato', 'ColdBrew', 'Macchiato') NOT NULL;
