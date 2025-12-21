import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
    payload: JwtPayload,
    secret: Secret,
    expiresIn: string
): string => {
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn: expiresIn as any
    };

    return jwt.sign(payload, secret, options);
};


export const verifyToken = (token: string, secret: Secret): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
};