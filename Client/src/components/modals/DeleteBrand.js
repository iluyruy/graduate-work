import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import { deleteBrand, fetchBrands } from "../../http/deviceAPI";

const DeleteBrand = ({ show, onHide }) => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Получение списка брендов при открытии модального окна
    useEffect(() => {
        fetchBrandData();
    }, []);

    const fetchBrandData = async () => {
        try {
            const brandsData = await fetchBrands();
            setBrands(brandsData);
        } catch (error) {
            console.log("Ошибка при получении списка брендов:", error.message);
        }
    };

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
    };

    const handleDeleteBrand = async () => {
        console.log('Handle Delete Brand called');
        if (selectedBrand) {
            try {
                await deleteBrand(selectedBrand.id);
                setSelectedBrand(null);
                fetchBrandData(); // Обновление списка брендов после удаления
            } catch (error) {
                console.log("Ошибка при удалении бренда:", error.message);
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {brands.map((brand) => (
                        <ListGroup.Item
                            key={brand.id}
                            active={selectedBrand?.id === brand.id}
                            onClick={() => selectBrand(brand)}
                            action
                        >
                            {brand.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    onClick={handleDeleteBrand}
                    disabled={!selectedBrand}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrand;