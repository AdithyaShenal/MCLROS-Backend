export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class InternalError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

export class RouteNotFoundError extends Error {
  constructor() {
    super("Not Found");
    this.status = 500;
  }
}
