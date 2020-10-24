import http = require("http");
import open = require("open");
import { indexView } from "./views/index.view";

const DEFAULT_PORT = 3321;
const DEFAULT_ADDRESS = "127.0.0.1";

export interface BrowserDumpOptions {
  silent: boolean;
  port: number;
  address: string;
}

export async function browserDump(
  data: any,
  customOptions: Partial<BrowserDumpOptions> = {}
) {
  const options: BrowserDumpOptions = {
    silent: false,
    port: DEFAULT_PORT,
    address: DEFAULT_ADDRESS,
    ...customOptions,
  };
  const port = options.port || DEFAULT_PORT;
  const address = options.address || DEFAULT_ADDRESS;
  const logger = options.silent
    ? (..._: any) => undefined
    : (...value: any) => console.log(...value);

  await new Promise((finished) => {
    const dumpServer = http.createServer((req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(indexView(data), () => {
          req.connection.unref();
          dumpServer.close();
          logger("🏁 Closed webdevetc browser dump");
          finished();
        });
      } else {
        console.error(`Unhandled route: ${req.url}`);
      }
    });

    dumpServer.listen(port, address);

    logger(
      "\x1b[36m%s\x1b[0m",
      `✅  Started webdevetc browser dump: http://${address}:${port}`
    );
    open(`http://${address}:${port}`);
  });
}
