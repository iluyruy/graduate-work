import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            user.setIsAdmin(true);
        }
    }, [user]);

    return (
        <Navbar style={{ background: '#8983f7' }} variant="light">
            <Container>
                <NavLink
                    className="d-flex row align-items-center"
                    style={{ color: 'black', fontSize: '25px', fontWeight: 'bold' }}
                    to={SHOP_ROUTE}
                >
                    TableGames
                </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'black' }}>
                        <Button
                            variant={"outline-dark"}
                            style={{ marginRight: '15px' }}
                            onClick={() => navigate(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>
                        {user.isAdmin && (
                            <Button
                                variant={"outline-dark"}
                                style={{ marginRight: '15px' }}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                        )}
                        <Button
                            variant={"outline-dark"}
                            onClick={() => logOut()}
                            style={{ marginLeft: '15px' }}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;