// used to filter out any files related to this package.
const THIS_PACKAGE_NAME = "browserdump";

// @todo replace with something nicer such as https://www.npmjs.com/package/stack-trace
export const getStackTrace = (): string => {
  if (!("captureStackTrace" in Error)) {
    // (non standard V8 fn)
    return "Error generating stack trace";
  }

  const obj: { stack: string } = { stack: "" };
  Error.captureStackTrace(obj, getStackTrace);

  return obj.stack
    .split("\n")
    .slice(1)
    .filter((line: string) => !line.toLowerCase().includes(THIS_PACKAGE_NAME))
    .map((line: string) => line.trim())
    .map((line: string) => (line.startsWith("at ") ? line.substr(3) : line))
    .join("\n");
};
