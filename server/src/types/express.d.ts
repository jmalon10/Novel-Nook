import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define user as optional
    }
  }
}