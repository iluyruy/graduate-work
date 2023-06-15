import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    const selectType = (type) => {
        if (type.id === device.selectedType?.id) {
            device.setSelectedType({});
        } else {
            device.setSelectedType(type);
        }
    };

    return (
        <ListGroup>
            {device.types.map(type => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={type.id === device.selectedType?.id}
                    onClick={() => selectType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;