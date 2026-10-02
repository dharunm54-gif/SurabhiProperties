/**
 * lib/utils/logger.ts
 *
 * Structured logger for the application.
 *
 * Rules:
 * - Log technical errors server-side only (never expose to user).
 * - User-facing errors should be generic ("Something went wrong").
 * - Include context: [ServiceName] Error message.
 * - In production, swap console.* with a real log service if needed.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  context: string;
  message: string;
  data?: unknown;
}

function log({ level, context, message, data }: LogEntry) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${context}]`;

  if (data !== undefined) {
    console[level](`${prefix} ${message}`, data);
  } else {
    console[level](`${prefix} ${message}`);
  }
}

export const logger = {
  info: (context: string, message: string, data?: unknown) =>
    log({ level: "info", context, message, data }),

  warn: (context: string, message: string, data?: unknown) =>
    log({ level: "warn", context, message, data }),

  error: (context: string, message: string, data?: unknown) =>
    log({ level: "error", context, message, data }),

  debug: (context: string, message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      log({ level: "debug", context, message, data });
    }
  },
};

/**
 * Standard user-facing error messages.
 * Never expose raw DB or server errors to users.
 */
export const USER_ERRORS = {
  generic: "Something went wrong. Please try again.",
  notFound: "The requested item could not be found.",
  unauthorized: "You are not authorized to perform this action.",
  validation: "Please check your input and try again.",
  upload: "There was a problem uploading your file. Please try again.",
  network: "Connection issue. Please check your internet and try again.",
} as const;
