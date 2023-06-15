const { Device, BasketDevice,  } = require("../models/models")

class BasketController {
    async removeFromBasket(req, res) {
        const { basketDeviceId } = req.params;

        try {
            await BasketDevice.destroy({ where: { id: basketDeviceId } });
            res.status(200).send();
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
            res.status(500).json({ error: 'Ошибка при удалении товара из корзины' });
        }
    }

    async addToBasket(req,res){
        const user = req.user
        const {deviceId} = req.body
        const basket = await BasketDevice.create({basketId : user.id, deviceId : deviceId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}})

        return res.json(basket)
    }
    async removeAllFromBasket(req, res) {
        const userId = req.user.id;

        try {
            await BasketDevice.destroy({ where: { basketId: userId } });
            res.status(204).json({ message: 'Все товары успешно удалены из корзины' });
        } catch (error) {
            console.error('Ошибка при удалении всех товаров из корзины:', error);
            res.status(500).json({ error: 'Ошибка при удалении товаров из корзины' });
        }
    }

}

module.exports = new BasketController()