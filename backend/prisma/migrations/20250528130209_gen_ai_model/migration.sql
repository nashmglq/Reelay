-- CreateTable
CREATE TABLE "GenAI" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "thumbnailImage" TEXT,
    "script" VARCHAR(15000) NOT NULL,

    CONSTRAINT "GenAI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenAI_id_key" ON "GenAI"("id");
