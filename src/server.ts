import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 5000;

async function main() {
    try {
        app.listen(port, () => {
            console.log(` 🌿 Server is running on ---> http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ Server failed to start:", err);
    }
}

main();