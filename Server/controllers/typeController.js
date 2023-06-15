const { Type } = require('../models/models');

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async remove(req, res) {
        const { id } = req.params;
        const type = await Type.findByPk(id);

        if (!type) {
            throw new NotFoundError(`Тип с ID ${id} не найден`);
        }

        await type.destroy();

        return res.json({ message: 'Тип успешно удален' });
    }
}

module.exports = new TypeController();


