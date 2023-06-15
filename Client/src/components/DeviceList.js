import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    const devicesToShow = device.devices.slice(0, 8); // Limit to 9 devices

    return (
        <Row className="d-flex">
            {devicesToShow.map((device) => (
                <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    );
});

export default DeviceList;