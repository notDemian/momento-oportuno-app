export class NotLoggedInError extends Error {
  constructor() {
    super('No se ha iniciado sesión')
    this.name = 'NotLoggedInError'
    this.message = 'No se ha iniciado sesión'
  }
}
