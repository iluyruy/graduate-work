import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row, Modal } from 'react-bootstrap';
import { useParams,useNavigate} from 'react-router-dom';
import { addToBasket, fetchOneDevice, deleteDevice } from '../http/deviceAPI';
import { Context } from '../index';
const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, []);

    const add = () => {
        const formData = new FormData();
        formData.append('deviceId', id);
        addToBasket(formData).then(response => {
            setShowAddModal(true);
            setTimeout(() => setShowAddModal(false), 2000);
        });
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteDevice(device.id);
            setShowDeleteModal(true);
            setTimeout(() => setShowDeleteModal(false), 2000);
            setTimeout(() => navigate('/shop'), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            backgroundColor: '#e2e1f7',
                            border: 'none',
                            boxShadow: 'none',
                        }}
                    >
                        <h1>{device.name}</h1>
                    </Card>
                </Col>
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + device.img}
                        style={{ border: '4px solid #666cff', borderRadius: '10px' }}
                    />
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid #666cff', borderRadius: '10px' }}
                    >
                        <h3>Цена: {device.price} руб.</h3>
                        <Button variant="outline-dark" onClick={add}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="d-flex flex-column m-3">
                <h2 style={{ textAlign: 'left' }}>Характеристики</h2>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{
                            border: '2px solid lightgray',
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10,
                            textAlign: 'left' // Добавлено выравнивание по левой стороне
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
                <br />
                {user.isAdmin && (
                    <Button variant="outline-danger" onClick={handleDelete} disabled={loading} style={{ marginLeft: 0 }}>
                        Удалить товар
                    </Button>
                )}
            </Row>

            {/* Компонент модального окна для успешного добавления товара */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Body>
                    <p>Товар {device.name} был добавлен в вашу корзину!</p>
                </Modal.Body>
            </Modal>

            {/* Компонент модального окна для успешного удаления товара */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body>
                    <p>Товар {device.name} был успешно удален!</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DevicePage;