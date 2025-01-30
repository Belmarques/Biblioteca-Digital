export class InvalidPassowrdOrEmail extends Error{
  constructor() {
    super('Email or password Invalid')
  }
}