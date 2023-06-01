import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://0.0.0.0/vahtangard',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;