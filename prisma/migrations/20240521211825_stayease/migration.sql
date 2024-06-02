-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `locationDescription` LONGTEXT NOT NULL,
    `guests` INTEGER NOT NULL,
    `Bedrooms` INTEGER NOT NULL,
    `Beds` INTEGER NOT NULL,
    `gym` BOOLEAN NOT NULL DEFAULT false,
    `publicPool` BOOLEAN NOT NULL DEFAULT false,
    `freeWifi` BOOLEAN NOT NULL DEFAULT false,
    `restaurant` BOOLEAN NOT NULL DEFAULT false,
    `parking` BOOLEAN NOT NULL DEFAULT false,
    `noSmoking` BOOLEAN NOT NULL DEFAULT false,
    `bathtub` BOOLEAN NOT NULL DEFAULT false,
    `roomServices` BOOLEAN NOT NULL DEFAULT false,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `Property_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `hotelOwnerId` VARCHAR(191) NOT NULL,
    `checkInDate` DATETIME(3) NOT NULL,
    `checkOutDate` DATETIME(3) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `paymentStatus` BOOLEAN NOT NULL DEFAULT false,
    `paymentIntentId` VARCHAR(191) NOT NULL,
    `bookedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Booking_paymentIntentId_key`(`paymentIntentId`),
    INDEX `Booking_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
