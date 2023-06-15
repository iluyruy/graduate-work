const { Brand } = require('../models/models');

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const brand = await Brand.create({ name })
            return res.json(brand)
        } catch (error) {
            next(error); // Передаем ошибку дальше для обработки в обработчике ошибок
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (error) {
            next(error); // Передаем ошибку дальше для обработки в обработчике ошибок
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.findByPk(id)
            if (!brand) {
                return res.status(404).json({ error: `Brand with id ${id} not found` })
            }
            await brand.destroy()
            return res.json({ message: 'Бренд успешно удален' })
        } catch (error) {
            next(error); // Передаем ошибку дальше для обработки в обработчике ошибок
        }
    }
}

module.exports = new BrandController()
