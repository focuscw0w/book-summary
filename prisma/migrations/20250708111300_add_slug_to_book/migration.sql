/*
  Warnings:

  - Added the required column `slug` to the `SummarizedBook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SummarizedBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "image" TEXT,
    "publisher" TEXT,
    "publishedDate" TEXT,
    "description" TEXT,
    "previewLink" TEXT,
    "summarizedText" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SummarizedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SummarizedBook" ("authors", "description", "id", "image", "previewLink", "publishedDate", "publisher", "summarizedText", "title", "userId") SELECT "authors", "description", "id", "image", "previewLink", "publishedDate", "publisher", "summarizedText", "title", "userId" FROM "SummarizedBook";
DROP TABLE "SummarizedBook";
ALTER TABLE "new_SummarizedBook" RENAME TO "SummarizedBook";
CREATE UNIQUE INDEX "SummarizedBook_slug_key" ON "SummarizedBook"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
