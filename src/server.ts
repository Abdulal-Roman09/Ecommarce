import dotenv from 'dotenv';
import app from './app';
import config from './config';

dotenv.config();

async function main() {
    try {
        app.listen(config.port, () => {
            console.log(` 🌿 Server is running on ---> http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error("❌ Server failed to start:", err);
    }
}

main();