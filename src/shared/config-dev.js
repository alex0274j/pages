// rename the file to config.js

const prod = {
  DEVICE_ADDRESS: window.location.hostname,
  BASE_URL: process.env.PUBLIC_URL,
  BASE_NAME: "/",
  name: "prod",
  API_URL: "/api/",
  ASSETS_URL: "http://minfusion01.sartorius.com:8118/assets/"
};

const dev = {
  DEVICE_ADDRESS: window.location.hostname,
  BASE_URL: process.env.PUBLIC_URL,
  BASE_NAME: "/",
  name: "dev",
  API_URL: "http://localhost:8118/api/",
};

// eslint-disable-next-line import/prefer-default-export
export const config = process.env.NODE_ENV === "development" ? dev : prod;
