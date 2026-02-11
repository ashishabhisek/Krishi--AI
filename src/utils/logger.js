// Error handling and logging utility for backend

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../logs/error.log');

// Ensure logs directory exists
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class Logger {
  static log(level, message, error = null) {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level}] ${message}`;

    if (error) {
      logMessage += `\n  Error: ${error.message}\n  Stack: ${error.stack}`;
    }

    // Console output
    if (level === 'ERROR') {
      console.error(logMessage);
    } else if (level === 'WARN') {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }

    // File output
    try {
      fs.appendFileSync(LOG_FILE, logMessage + '\n\n', 'utf8');
    } catch (err) {
      console.error('Failed to write to log file:', err.message);
    }
  }

  static info(message) {
    this.log('INFO', message);
  }

  static warn(message, error) {
    this.log('WARN', message, error);
  }

  static error(message, error) {
    this.log('ERROR', message, error);
  }

  static debug(message) {
    if (process.env.NODE_ENV === 'development') {
      this.log('DEBUG', message);
    }
  }
}

// Custom error class
class APIError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  Logger.error(`${req.method} ${req.path}`, err);

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    timestamp: new Date(),
    ...(process.env.NODE_ENV === 'development' && { error: err.stack }),
  });
};

module.exports = {
  Logger,
  APIError,
  errorHandler,
};
