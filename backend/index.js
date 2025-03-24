import express from "express";
import { PORT } from './config.js';

const app = express();
app.listen(PORT, () => {
  console.log(`App (Server) is listening to port ${PORT}`);
});
// The import statement is used to import the PORT constant from the config.js file. The PORT constant is then used in the app.listen() method to specify the port on which the server should listen. This allows the port number to be easily changed by updating the value in the config.js file.