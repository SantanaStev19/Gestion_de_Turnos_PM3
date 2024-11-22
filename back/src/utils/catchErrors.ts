import { NextFunction, Request, Response } from "express";

export const catchError = < Params, ResBody, ReqBody > (controlador: (req: Request< Params, ResBody, ReqBody >, res: Response, next: NextFunction) => Promise<void> ) => {
    return (req: Request< Params, ResBody, ReqBody >, res: Response, next: NextFunction) => {
        controlador(req, res, next)
            .catch(error => next(error))
    }
}