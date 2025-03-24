import express from "express";
import { PORT } from './config.js';

const app = express();
app.listen(PORT, () => {
  console.log(`App (Server) is listening to port ${PORT}`);
});
// The import statement is used to import the PORT constant from the config.js file. The PORT constant is then used in the app.listen() method to specify the port on which the server should listen. This allows the port number to be easily changed by updating the value in the config.js file.

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Server Responding: Hello World!");
});
// The app.get() method is used to define a route for the root URL ("/") that sends a response of "Hello World!" when the route is accessed. This route will be accessible at the root URL of the server (e.g., http://localhost:5555/).