-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_email_key" ON "Productos"("email");
