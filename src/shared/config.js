/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { config as defaultConfigFile } from "./config-default";

let devConfigFile = null;

try {
  const conf = require("./config-dev");
  devConfigFile = conf.config;
} catch (ex) {
  // console.log("default configuration loaded");
}

// eslint-disable-next-line import/prefer-default-export
export const config = devConfigFile || defaultConfigFile;
