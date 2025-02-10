/*
  Warnings:

  - Added the required column `specie` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "specie" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetCustomer" (
    "petId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "PetCustomer_pkey" PRIMARY KEY ("petId","customerId")
);

-- AddForeignKey
ALTER TABLE "PetCustomer" ADD CONSTRAINT "PetCustomer_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCustomer" ADD CONSTRAINT "PetCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
