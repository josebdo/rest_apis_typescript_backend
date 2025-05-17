import { Request, Response, NextFunction } from "express";
import {validationResult } from "express-validator"

export const handleImputErrors = (req: Request, res: Response, next: NextFunction) => {


    let error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({errors: error.array()})
        return
    }
    
    next()
}