-- CreateTable
CREATE TABLE `Favorite` (
    `id` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idCoffe` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchased` (
    `id` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idCoffe` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_idCoffe_fkey` FOREIGN KEY (`idCoffe`) REFERENCES `Coffe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchased` ADD CONSTRAINT `Purchased_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchased` ADD CONSTRAINT `Purchased_idCoffe_fkey` FOREIGN KEY (`idCoffe`) REFERENCES `Coffe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
