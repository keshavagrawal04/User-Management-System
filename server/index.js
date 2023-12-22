const app = require('./app');
const { database } = require('./utils');

const PORT = process.env.PORT || 8000;
try {
    database.connect();
    app.listen(PORT, () => {
        console.log(`[SERVER] Server Is Running On http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(`[SERVER] MongoDB Connection Failed : ${error.message}`)
}
