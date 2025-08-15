interface ExecuteResult {
  output: string;
  error: string;
}

export async function executeCode(code: string): Promise<ExecuteResult> {
  try {
    // Store original console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    // Capture console output
    const consoleOutput: string[] = [];

    // Override console methods to capture output
    console.log = (...args: unknown[]) => {
      consoleOutput.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")
      );
    };

    console.error = (...args: unknown[]) => {
      consoleOutput.push(
        `ERROR: ${args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")}`
      );
    };

    console.warn = (...args: unknown[]) => {
      consoleOutput.push(
        `WARN: ${args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")}`
      );
    };

    console.info = (...args: unknown[]) => {
      consoleOutput.push(
        `INFO: ${args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")}`
      );
    };

    try {
      // Execute the code
      const func = new Function(code);
      const returnValue = func();

      // Combine console output and return value
      let finalOutput = consoleOutput.join("\n");

      if (returnValue !== undefined) {
        if (finalOutput) finalOutput += "\n";
        if (typeof returnValue === "object") {
          finalOutput += JSON.stringify(returnValue, null, 2);
        } else {
          finalOutput += String(returnValue);
        }
      }

      // Restore original console methods
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      return {
        output: finalOutput,
        error: "",
      };
    } catch (error) {
      // Restore original console methods even if error occurs
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      throw error;
    }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
