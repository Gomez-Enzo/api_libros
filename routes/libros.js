const express = require("express");
const libros = require("../data/data");
const route = express.Router();

//mostrar productos
route.get('/',(req, res, next)=>{
    try {
        res.json(libros); 
    } catch (error) {
        next(error);
    }
    
});

//muestro producto por id
route.get('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const libro = libros.find((p) => p.id == id);

        if (!libro){
            const error = new Error ('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(libro);
    } catch (error) {
        next(error);
    }
    
});

//creo un producto
route.post('/',(req, res, next)=>{
    try {
        const {titulo, autor} = req.body;

        const nuevoLibro = {
            id: libros.length +1,
            titulo,
            autor,
        }
        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
    
});

//modificar producto
route.put('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const {titulo, autor} = req.body;

        const libro = libros.find((p)=> p.id == id);

        if (!libro) {
            const error = new Error ('Libro no encontrado');
            error.status = 404;
            throw error;
        }   
        
        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;

        res.json(libro);
        
    } catch (error) {
        next(error);
    }
    
});

//borrar producto
route.delete('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const index = libros.findIndex((p)=> p.id == id);
    
        if (index == -1) {
            const error = new Error ('Libro no encontrado');
            error.status = 404;
            throw error;
        }
            const LibroEliminado = libros.splice(index, 1);
            res.json(LibroEliminado[0]);
        
    } catch (error) {
        next(error);
    }
  
});

module.exports = route;