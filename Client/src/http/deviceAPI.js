import {$authHost, $host} from "./index";



export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}



export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 8) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

// ------ Добавляю подключение для добавление crud с корзиной ------- //

export const addToBasket = async (deviceId) => {
    const {response} = await $authHost.post('api/basket', deviceId)
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data

}

export const deleteType = async (typeId) => {
    try {
        const response = await $authHost.delete(`/api/type/${typeId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при удалении типа: ${error.message}`);
    }
};

export const deleteBrand = async (brandId) => {
    try {
        const response = await $authHost.delete(`/api/brand/${brandId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при удалении бренда: ${error.message}`);
    }
};
export const deleteDevice = async (deviceId) => {
    try {
        const response = await $authHost.delete(`/api/device/${deviceId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при удалении товара: ${error.message}`);
    }
};
