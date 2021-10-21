export class ValidationError extends Error {
    constructor(message) {
      super(message)
      this.name = 'ValidationError'
      this.message = message
    }
  }
export class PermissionError extends Error {
    constructor(message) {
      super(message)
      this.name = 'PermissionError'
      this.message = message
    }
  }
export class DatabaseError extends Error {
    constructor(message) {
      super(message)
      this.name = 'DatabaseError'
      this.message = message
    }
  }
