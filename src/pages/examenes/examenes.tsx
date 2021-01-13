import React, { } from 'react';
import Card from '../../components/card/Card';
import './examenes.css'
const Examenes: React.FC = () => {
    const info: any = {
        titulo: 'Quiz de matematicas',
        codigo: 'EDX5480',
        tiempo: '20 Min',
        cierre: '01/01/2020 11:59a.m',
        numeroPreguntas: 25,
        estado: 'PENDIENTE'
    };
    return (
        <div>

            <div className="buscador">

            </div>
            <div className="contenedor-examenes">
                <Card {...info}></Card>
                <Card {...info}></Card>
                <Card {...info}></Card>
                <Card {...info}></Card>
            </div>
        </div>
    );
};

export default Examenes;
