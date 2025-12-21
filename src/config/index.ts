import path from "path"
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    solt_round: Number(process.env.SALT_ROUND),
    databaseUrl: process.env.DATABASE_URL as string,
    cloudinary: {
        clude_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secrate: process.env.CLOUDINARY_API_SECRET
    }

}