import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/products"
import { handleImputErrors } from "./middleware"


const router = Router()

//routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    handleImputErrors,
    getProductById)

router.post('/', 
       body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
       body('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value => value > 0).withMessage('Precio no valido'),
        handleImputErrors,
        createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
         .isNumeric().withMessage('Valor no valido')
         .notEmpty().withMessage('El precio del producto no puede ir vacio')
         .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleImputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleImputErrors,
    updateAvailability)

router.delete('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    handleImputErrors,
    deleteProduct
)

export default router