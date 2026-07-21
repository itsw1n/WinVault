-- DropIndex
DROP INDEX "Comment_gameId_idx";

-- DropIndex
DROP INDEX "Comment_parentId_idx";

-- CreateIndex
CREATE INDEX "Comment_gameId_parentId_idx" ON "Comment"("gameId", "parentId");

-- CreateIndex
CREATE INDEX "Favorite_gameId_idx" ON "Favorite"("gameId");
