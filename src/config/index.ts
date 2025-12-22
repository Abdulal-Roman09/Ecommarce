import path from "path"
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    solt_round: Number(process.env.SALT_ROUND),
    databaseUrl: process.env.DATABASE_URL as string,
    baseUrl: process.env.RESET_PASS_LINK as string,
    cloudinary: {
        clude_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secrate: process.env.CLOUDINARY_API_SECRET
    },
    access_token: {
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.EXPIRES_IN as string,
    },
    refresh_token: {
        secret: process.env.REFRESH_TOKEN_SECRET as string,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    },
    reset_token: {
        secret: process.env.RESET_PASS_TOKEN as string,
        expiresIn: process.env.RESET_PASS_TOKEN_EXPIRES_IN as string,
    },
    mailSender: {
        email: process.env.EMAIL as string,
        app_password: process.env.APP_PASS as string,
    }

}
