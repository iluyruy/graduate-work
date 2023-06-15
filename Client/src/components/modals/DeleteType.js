import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import { deleteType, fetchTypes } from "../../http/deviceAPI";

const DeleteType = ({ show, onHide }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    // Получение списка типов при открытии модального окна
    useEffect(() => {
        fetchTypeData();
    }, []);

    const fetchTypeData = async () => {
        try {
            const typesData = await fetchTypes();
            setTypes(typesData);
        } catch (error) {
            console.log("Ошибка при получении списка типов:", error.message);
        }
    };

    const selectType = (type) => {
        setSelectedType(type);
    };

    const handleDeleteType = async () => {
        console.log('Handle Delete Type called');
        if (selectedType) {
            try {
                await deleteType(selectedType.id);
                setSelectedType(null);
                fetchTypeData(); // Обновление списка типов после удаления
            } catch (error) {
                console.log("Ошибка при удалении типа:", error.message);
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {types.map((type) => (
                        <ListGroup.Item
                            key={type.id}
                            active={selectedType?.id === type.id}
                            onClick={() => selectType(type)}
                            action
                        >
                            {type.name}
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
                    onClick={handleDeleteType}
                    disabled={!selectedType}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;