const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require('fs');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try{
            let {brandId, typeId, limit, page} = req.query
            page = page || 1

            limit = limit || 8

            let offset = page * limit - limit
            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
            return res.json(devices)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.findByPk(id);
            if (!device) {
                return res.status(404).json({ message: 'Товар не найден' });
            }

            const filePath = path.resolve(__dirname, '..', 'static', device.img);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                }
            });

            await Device.destroy({ where: { id } });
            return res.json({ message: 'Товар успешно удален' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController();


