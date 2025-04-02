// import { UserRepository } from '@/repositories/user-repository'
// import { UserAlreadyExistsError } from '../error/user-alrealdy-exist'
// import type { Loan } from '@prisma/client'
// import { NotFound } from '../error/not-found.error'
// import type { ReservationBook } from '@/repositories/book-repository'
// interface createReservationRequest {
// userId: string
// bookId: string
// }
// interface createReservationResponse {
//   reserva: Loan
// }

// export class CreateReservation {
//   constructor(private userRepository: UserRepository,
//     private reservationBook: ReservationBook
//   ) {}

//   async execute({
//   userId,
//   bookId
//   }: createReservationRequest): Promise<createReservationResponse> {
//     const findBook = await this.reservationBook.findById(bookId)
//     if (!findBook) {
//       throw new NotFound()
//     }

//     const user = await this.reservationBook.create({
//       user: userId,
//       book: bookId

//     })
//     return { user }
//   }
// }
