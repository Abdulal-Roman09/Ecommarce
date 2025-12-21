import jwt, { JwtPayload, Secret } from "jsonwebtoken";


export const generateToken = (
    payload: JwtPayload,
    secreate: Secret,
    expiresIn: string
): string => {
    return jwt.sign(payload, secreate, {
        algorithm: "HS256",
        expiresIn
    })
}