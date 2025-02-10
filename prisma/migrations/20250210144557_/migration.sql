/*
  Warnings:

  - You are about to drop the `PetCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetCustomer" DROP CONSTRAINT "PetCustomer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PetCustomer" DROP CONSTRAINT "PetCustomer_petId_fkey";

-- DropTable
DROP TABLE "PetCustomer";

-- CreateTable
CREATE TABLE "petcustomer" (
    "petId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "petcustomer_pkey" PRIMARY KEY ("petId","customerId")
);

-- AddForeignKey
ALTER TABLE "petcustomer" ADD CONSTRAINT "petcustomer_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petcustomer" ADD CONSTRAINT "petcustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
