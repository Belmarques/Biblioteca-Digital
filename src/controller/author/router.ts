import type { FastifyInstance } from "fastify";

import { verifyJWT } from "@/middleware/verifiJWT";
import { searchAuthor } from "./search-author";
export async function authorRouter(app:FastifyInstance) {
  app.get('/author/search',{onRequest:[verifyJWT]}, searchAuthor) //Buscar author

}