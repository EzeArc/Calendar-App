const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//crear servidor de express

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//directorio publico (use <-- middleware (función q se ejecuta al momento en q alguien hace un petición al server))
app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidior corriendo en puerto ${process.env.PORT}`);
});
