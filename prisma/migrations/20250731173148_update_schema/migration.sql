-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_genreId_fkey";

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
