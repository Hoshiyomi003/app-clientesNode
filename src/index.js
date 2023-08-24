import app from "./app.js";
import { port } from "./config.js";

app.listen(port);
console.log(`server on port ${port}`);

// de registro de un error
try {
    // Código que puede generar un error
  } catch (error) {
    logger.error('Error occurred:', error);
  }
