import { Options as openOptions } from "open";

export interface BrowserDumpOptions {
  // What port to serve
  port: number;

  // What hostname to serve
  host: string;

  // Max number of browser dump instances (default: 1)
  maxBrowserCount: number;

  // A custom logger
  logger: typeof console.log;

  // What view to use (default is in ./views/index.view.ts)
  viewRenderer: ViewRenderer;

  // Options for the open() package - see https://www.npmjs.com/package/open
  // Can set which browser to use with this config
  openOptions: openOptions;
}

export type ViewRenderer = (rawData: any, stackTrace: string) => string;
