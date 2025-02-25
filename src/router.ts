import { Router } from "express";
import {body, param} from 'express-validator'
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import {handleInputErrors} from './middleware/index'
const router=Router()

//Sintaxis especial para llenar la ui

/**
 * @swagger
 * components:
 *      schemas:
 *           Product:
 *              type: object
 *              properties:
 *                   id:
 *                       type: integer
 *                       description: The Product ID
 *                       example: 1
 *                   name:
 *                        type: string
 *                        description: The Product Name
 *                        example: Monitor Curvo de 40 pulgadas
 *                   price:
 *                         type: number
 *                         description: The Product price
 *                         example: 300
 *                   availability:
 *                         type: boolean
 *                         description: The Product availability
 *                         example: true
 */

router.get("/", getProducts)

router.get('/:id',
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)
router.post("/", 
    body("name").notEmpty().withMessage("El nombre del producto no debe estar vacío").isString().withMessage("Nombre no válido"),
    body("price").isNumeric().withMessage("Valor no valido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    handleInputErrors, //Funciones intermedias que se ejecutan en cada request de tipo http
    createProduct
)

router.put("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    body("name").notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("price").isNumeric().withMessage("Valor no válido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    body("availability").isBoolean().withMessage("Valor para la disponibilidad noválido"),
       handleInputErrors,  //Funciones intermedias que se ejecutan en cada request de tipo http
    updateProduct
)

router.patch("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct)

export default router