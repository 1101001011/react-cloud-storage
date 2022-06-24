import {AnyZodObject} from 'zod'
import {NextFunction, Request, Response} from 'express';

const validate =
    (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch (e) {
            return res.sendStatus(400).json(e.errors)
        }
}

export default validate