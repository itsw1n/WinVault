-- DropIndex
DROP INDEX "Favorite_gameId_idx";

-- CreateIndex
CREATE INDEX "Favorite_createdAt_gameId_idx" ON "Favorite"("createdAt", "gameId");
