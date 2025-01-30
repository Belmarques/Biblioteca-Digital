export class NotFound extends Error{
  constructor() {
    super('User Not Found')
  }
}