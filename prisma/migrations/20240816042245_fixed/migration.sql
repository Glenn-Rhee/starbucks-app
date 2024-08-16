/*
  Warnings:

  - The values [CaffeLatte] on the enum `Coffe_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `coffe` MODIFY `type` ENUM('Expresso', 'Americano', 'LongBlack', 'Cappucino', 'CoffeLatte', 'MoccaLatte', 'Afogato', 'ColdBrew', 'Macchiato') NOT NULL;
