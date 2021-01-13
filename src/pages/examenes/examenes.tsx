import React, { } from 'react';
import Card from '../../components/card/Card';

const Examenes: React.FC = () => {
    const info:any={
        titulo:'Quiz de matematicas',
        codigo:'EDX5480',
        tiempo:'20 Min',
        cierre: '01/01/2020 11:59a.m',
        numeroPreguntas: 25,
        estado:'PENDIENTE'
    };
    return (
        <div>
            <h5>EXAMENES sdsadsad</h5>
            <Card {...info}></Card>
        </div>
    );
};

export default Examenes;
