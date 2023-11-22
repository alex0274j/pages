// rename or copy the file to config-dev.js

const prod = {
  DEVICE_ADDRESS: window.location.hostname,
  BASE_URL: process.env.PUBLIC_URL,
  BASE_NAME: "/ng",
  API_URL: "/cgi-ng/",
  ASSETS_URL: ""
};

const dev = {
  DEVICE_ADDRESS: "10.24.64.87",
  BASE_URL: "http://10.24.64.87/",
  BASE_NAME: "/",
  API_URL: `http://10.24.64.87/cgi-ng/`,
  ASSETS_URL: ""
};

// eslint-disable-next-line import/prefer-default-export
export const config = process.env.NODE_ENV === "development" ? dev : prod;
