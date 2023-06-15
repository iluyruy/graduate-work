import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Col, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    const selectBrand = (brand) => {
        if (brand.id === device.selectedBrand?.id) {
            device.setSelectedBrand(null);
        } else {
            device.setSelectedBrand(brand);
        }
    };

    return (
        <Row className="d-flex flex-row">
            {device.brands.map(brand => (
                <Col className="p-3" key={brand.id}>
                    <Card
                        style={{
                            cursor: 'pointer',
                            border: brand.id === device.selectedBrand?.id ? '2px solid blue' : '1px solid lightgray',
                            backgroundColor: brand.id === device.selectedBrand?.id ? 'blue' : 'white',
                            color: brand.id === device.selectedBrand?.id ? 'white' : 'black',
                            padding: '10px' // Добавлен отступ к тексту
                        }}
                        onClick={() => selectBrand(brand)}
                    >
                        <span style={{ marginLeft: '10px' }}>{brand.name}</span> {/* Добавлен отступ к тексту */}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default BrandBar;
