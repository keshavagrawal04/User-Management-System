const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ level: 'info', filename: './info.log' }),
        new winston.transports.File({ level: 'error', filename: './error.log' })
    ]
});

module.exports = logger
