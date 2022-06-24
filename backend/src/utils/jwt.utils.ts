import config from 'config';
import jwt from 'jsonwebtoken';

const privateKey = config.get<string>('secretKey')

export function signJWT(payload: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(payload, privateKey, {...(options && options)})
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, privateKey)
        return {
            decoded
        }
    } catch {
        return {
            decoded: null
        }
    }
}