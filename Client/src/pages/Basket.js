import React, { useContext, useEffect,useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { getBasket } from '../http/deviceAPI';
import {Card, Col, Container, Row, Button, ButtonGroup} from 'react-bootstrap';
import { $host} from "../http/index";
import { check } from '../http/index';

const Basket = observer(() => {
    const { device } = useContext(Context);
    const [paymentCompleted, setPaymentCompleted] = useState(false);


    const handlePayment = () => {

        setPaymentCompleted(true);
    };

    const handleRemoveAllFromBasket = async () => {
        console.log('Работает')
        try {
            if (device.basket.length > 0) {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                await $host.delete('http://localhost:5000/api/basket/all', config);
                device.setBaskets([]);
            } else {
                console.error('Корзина пуста');
            }
        } catch (error) {
            console.error('Ошибка при удалении всех товаров из корзины:', error);
        }
    };

    const fetchBasket = async () => {
        try {
            const basket = await getBasket();
            device.setBaskets(basket);
            console.log(basket);
            return basket; // Вернуть полученную корзину
        } catch (error) {
            console.error('Ошибка при получении корзины:', error);
        }
    };

    useEffect(() => {
        fetchBasket();
    }, []);

    const handleRemoveFromBasket = async (basketDeviceId) => {
        try {
            if (basketDeviceId) {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                await $host.delete(`http://localhost:5000/basket/item/${basketDeviceId}`, config);
                const basket = await fetchBasket();
                device.setBaskets(basket);
            } else {
                console.error('Неверное значение basketDeviceId:', basketDeviceId);
            }
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };

    let totalPrice = 0;
    device.basket.forEach((product) => {
        totalPrice += Number(product.device.price);
    });
    const handlePaymentAndRemoveAll = () => {
        handleRemoveAllFromBasket();
        handlePayment();
    };

    return (
        <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
            <h1 className="pb-2">Корзина</h1>

            <Card className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
                <h1 className="pr-2">Итого:</h1>
                <h3 className="pl-2">
                    {totalPrice}
                    <span className="font-weight-light pl-2">рублей</span>
                </h3>
            </Card>

            {device.basket.map((product) => (
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} alt={product.device.name} />
                                <h1 className="pl-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.device.price} рублей</h2>
                            </div>
                        </Col>
                    </Row>

                    <Button variant="danger" onClick={() => handleRemoveFromBasket(product.id)}>
                        Удалить
                    </Button>
                </Card>
            ))}
            <div>
                {paymentCompleted && (
                    <div style={{ textAlign: 'center' }}>
                        <p>Оплата произведена</p>
                    </div>
                )}
                <ButtonGroup>
                    {device.basket.length > 0 && (
                        <Button variant="success" onClick={handlePaymentAndRemoveAll}>
                            Оплатить
                        </Button>
                    )}
                        <span style={{ margin: '0 5px' }}></span>
                    {device.basket.length > 0 && (
                        <Button variant="danger" onClick={handleRemoveAllFromBasket}>
                            Удалить все
                        </Button>
                    )}

                </ButtonGroup>
            </div>
        </Container>
    );
});

export default Basket;