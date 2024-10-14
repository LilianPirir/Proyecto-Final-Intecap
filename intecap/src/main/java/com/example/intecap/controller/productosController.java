package com.example.intecap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.intecap.models.productosModel;
import com.example.intecap.service.productosService;

import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde el frontend
public class productosController {

    @Autowired
    private productosService productoService;

    // Obtener todos los productos
    @GetMapping("/listar")
    public Iterable<productosModel> getProductos() {
        return this.productoService.findAll();
    }

    // Obtener un producto por ID
    @GetMapping("/buscar/{idProducto}")
    public ResponseEntity<productosModel> getProductoById(@PathVariable int idProducto) {
        Optional<productosModel> producto = productoService.findById(idProducto);
        return producto.isPresent() ? ResponseEntity.ok(producto.get()) : ResponseEntity.notFound().build();
    }

    // Guardar un nuevo producto
    @PostMapping("/guardar")
    public ResponseEntity<String> saveProducto(@RequestBody productosModel entity) {
        try {
            this.productoService.save(entity);
            return ResponseEntity.ok("Producto guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    // Eliminar un producto por ID
    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<String> deleteProducto(@PathVariable int idProducto) {
        try {
            productoService.deleteById(idProducto);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar el producto");
        }
    }

    // Actualizar un producto por ID
    @PutMapping("/actualizar/{idProducto}")
    public ResponseEntity<String> updateProducto(@PathVariable int idProducto, @RequestBody productosModel entity) {
        try {
            productoService.update(entity, idProducto);
            return ResponseEntity.ok("Producto actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar el producto: " + e.getMessage());
        }
    }

    // Obtener un producto para editar
    @GetMapping("/editar/{id}")
    public ResponseEntity<productosModel> editarProducto(@PathVariable("id") int id) {
        Optional<productosModel> producto = productoService.findById(id);
        return producto.isPresent() ? ResponseEntity.ok(producto.get()) : ResponseEntity.notFound().build();
    }
}
