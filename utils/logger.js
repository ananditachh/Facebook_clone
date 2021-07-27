const winston = require('winston');

const logConfig = {
    transports: [
        new winston.transports.File({
            //level: winston.config.syslog.levels,
            filename: 'logs/errorlogs.log'
        })
    ],

    format: winston.format.combine(
       
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
       winston.format.align(),
       winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message} `),
    )

};

const logger = winston.createLogger(logConfig);

const myStream = {
    write: (text) => {
        logger.info(text)
    }
}
//app.use(morgan('combined', { stream: myStream }));

module.exports = logger
