const winston = require('winston');

const logger = winston.createLogger({
  level: 'error', // Nivel de registro (puede ser 'error', 'warn', 'info', 'verbose', 'debug', 'silly')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} - ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Registro en la consola
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Registro en un archivo
  ]
});

module.exports = logger;