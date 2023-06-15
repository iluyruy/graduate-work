const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware, basketController.getBasketUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.delete('/item/:basketDeviceId', authMiddleware, basketController.removeFromBasket);
router.delete('/all', authMiddleware, basketController.removeAllFromBasket);

module.exports = router;