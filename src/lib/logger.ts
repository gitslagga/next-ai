/**
 * Project logger - replacement for console.log
 * Provides structured logging with log levels
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Creates a formatted log entry
 */
const createLogEntry = (
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
): LogEntry => ({
  level,
  message,
  data,
  timestamp: new Date().toISOString(),
});

/**
 * Logger instance with leveled output methods
 */
export const logger = {
  debug(message: string, data?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      const entry = createLogEntry("debug", message, data);
      process.stdout.write(
        `[DEBUG] ${entry.timestamp} ${entry.message} ${data ? JSON.stringify(data) : ""}\n`,
      );
    }
  },

  info(message: string, data?: Record<string, unknown>): void {
    const entry = createLogEntry("info", message, data);
    process.stdout.write(
      `[INFO] ${entry.timestamp} ${entry.message} ${data ? JSON.stringify(data) : ""}\n`,
    );
  },

  warn(message: string, data?: Record<string, unknown>): void {
    const entry = createLogEntry("warn", message, data);
    process.stderr.write(
      `[WARN] ${entry.timestamp} ${entry.message} ${data ? JSON.stringify(data) : ""}\n`,
    );
  },

  error(message: string, data?: Record<string, unknown>): void {
    const entry = createLogEntry("error", message, data);
    process.stderr.write(
      `[ERROR] ${entry.timestamp} ${entry.message} ${data ? JSON.stringify(data) : ""}\n`,
    );
  },
};
