import { prisma } from "@/lib/prisma";
import type { GenreRepository } from "../genre-repository";
import type { Prisma } from "@prisma/client";

export class PrismaGenreRepository implements GenreRepository {
  async findGenre(name: string) {
    const genre = await prisma.genre.findUnique({
      where: {
        name
      }
    })
    if (!genre) {
      return null
    }
    return genre
  }
  async create(data: Prisma.GenreUncheckedCreateInput) {
    const genre = await prisma.genre.create({
      data,

    })
    return genre
  }
  async getGenre() {
const genre = await prisma.genre.findMany()

return genre
  }
}