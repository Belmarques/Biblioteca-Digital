import type {   Genre,  Prisma } from "@prisma/client";

export interface GenreRepository {
  create(data:Prisma.GenreUncheckedCreateInput): Promise<Genre>
  // getGenre(): Promise<Genre[]>
  // findGenre(name:string): Promise<Genre | null>
}