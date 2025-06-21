interface LogContext {
  endpoint?: string
  method?: string
  params?: Record<string, any>
  userId?: string
  requestId?: string
}

interface LogLevel {
  ERROR: 'ERROR'
  WARN: 'WARN'
  INFO: 'INFO'
  DEBUG: 'DEBUG'
}

class Logger {
  private formatTimestamp(): string {
    return new Date().toISOString()
  }

  private formatLogMessage(
    level: keyof LogLevel,
    message: string,
    context?: LogContext,
    error?: Error | unknown
  ): string {
    const timestamp = this.formatTimestamp()
    const contextStr = context ? JSON.stringify(context, null, 2) : ''

    let logMessage = `[${timestamp}] [${level}]`

    if (context?.endpoint) {
      logMessage += ` [${context.method || 'GET'} ${context.endpoint}]`
    }

    logMessage += ` ${message}`

    if (error) {
      if (error instanceof Error) {
        logMessage += `\nError: ${error.message}`
        if (error.stack) {
          logMessage += `\nStack: ${error.stack}`
        }
      } else {
        logMessage += `\nError: ${JSON.stringify(error)}`
      }
    }

    return logMessage
  }

  error(message: string, context?: LogContext, error?: Error | unknown): void {
    const logMessage = this.formatLogMessage('ERROR', message, context, error)
    console.error(logMessage)
  }

  warn(message: string, context?: LogContext): void {
    const logMessage = this.formatLogMessage('WARN', message, context)
    console.warn(logMessage)
  }

  info(message: string, context?: LogContext): void {
    const logMessage = this.formatLogMessage('INFO', message, context)
    console.info(logMessage)
  }

  debug(message: string, context?: LogContext): void {
    const logMessage = this.formatLogMessage('DEBUG', message, context)
    console.debug(logMessage)
  }

  // Convenience method for API route errors
  apiError(
    endpoint: string,
    method: string,
    message: string,
    error?: Error | unknown,
    additionalContext?: Record<string, any>
  ): void {
    this.error(
      message,
      {
        endpoint,
        method,
        ...additionalContext
      },
      error
    )
  }
}

export const logger = new Logger()

// Helper function to extract endpoint and method from request
export function getRequestContext(request: Request): { endpoint: string; method: string } {
  const url = new URL(request.url)
  return {
    endpoint: url.pathname,
    method: request.method
  }
}
