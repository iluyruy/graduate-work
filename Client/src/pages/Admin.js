import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);

    const handleDeleteTypeModal = () => {
        setDeleteTypeVisible(true);
    };

    const handleDeleteBrandModal = () => {
        setDeleteBrandVisible(true);
    };




    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setTypeVisible(true)}>
                Добавить тип
            </Button>
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setBrandVisible(true)}>
                Добавить бренд
            </Button>
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setDeviceVisible(true)}>
                Добавить товар
            </Button>

            <Button variant={"outline-danger"} className="mt-4 p-2" onClick={handleDeleteTypeModal}>
                Удалить тип
            </Button>
            <Button variant={'outline-danger'} className="mt-4 p-2" onClick={handleDeleteBrandModal}>
                Удалить бренд
            </Button>


            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
            <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)} />
        </Container>
    );
};

export default Admin;