import http = require("http");
import open = require("open");
import { indexView } from "./views/index.view";
import { getStackTrace } from "./getStackTrace";
import { BrowserDumpOptions } from "./interfaces";

let browserCount = 0;

const DEFAULT_PORT = 3333;
const DEFAULT_HOST = "127.0.0.1";

export async function browserDump(
  rawData: unknown,
  customOptions: Partial<BrowserDumpOptions> = {}
) {
  const options: BrowserDumpOptions = {
    port: DEFAULT_PORT,
    host: DEFAULT_HOST,
    maxBrowserCount: 1,
    logger: console.log,
    viewRenderer: indexView,
    openOptions: {},
    ...customOptions,
  };

  if (++browserCount > options.maxBrowserCount) {
    console.warn(
      `webdevetc browserDump - too many instances (tried to allocate ${browserCount} instances, only ${options.maxBrowserCount} is supported)`
    );
    return;
  }

  await new Promise((done) => startServer(rawData, options, done));
}

async function startServer(
  rawData: unknown,
  options: BrowserDumpOptions,
  done: () => void
) {
  const htmlResponse = options.viewRenderer(rawData, getStackTrace());

  const dumpServer = http.createServer((req, res) => {
    const shutDownServer = () => {
      req.connection.unref();
      dumpServer.close();
      options.logger("🏁 Successfully closed webdevetc browser dump  🌟🌟🌟🌟");
      done();
    };

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlResponse, shutDownServer);
  });

  dumpServer.on("error", (error) => {
    console.error(error);
    done();
  });
  dumpServer.listen(options.port, options.host);

  options.logger(
    "\x1b[36m%s\x1b[0m",
    `✅  Started webdevetc browser dump: http://${options.host}:${options.port}  🌟🌟🌟🌟`
  );

  open(`http://${options.host}:${options.port}`, options.openOptions);
}
