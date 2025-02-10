import type { Author, Prisma } from "@prisma/client"

export interface AuthorRepository {
  findAuthor(name:string):Promise<Author | null>
  searchMany(query:string): Promise<Author[]>
  create(data:Prisma.AuthorCreateInput): Promise<Author>
}
