const express = require("express");
const routeLibros = require("./routes/libros");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use('/libros', routeLibros);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor Express.js en funcionamiento en el puerto ${port}`);

});
