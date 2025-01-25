-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "message" JSONB[],
    "fileData" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
