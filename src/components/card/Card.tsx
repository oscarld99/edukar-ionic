import React from 'react';
import { useHistory } from 'react-router-dom';
import './Card.css';

const Card: React.FC = ({ titulo, codigo, tiempo, cierre, numeroPreguntas, estado }: any) => {

    const history = useHistory();

    return (
        <div className="card" onClick={() => history.push("/exam")}>
            <h2 className="card__title">{titulo}</h2>
            <div className="card__details">
                <div className="card__item">
                    <span className="card__label">codigo:</span>
                    <span className="card__info">{codigo}</span>
                </div>
                <div className="card__item">
                    <span className="card__label">tiempo:</span>
                    <span className="card__info">{tiempo}</span>
                </div>
                <div className="card__item">
                    <span className="card__label">fecha cierre:</span>
                    <span className="card__info">{cierre}</span>
                </div>
                <div className="card__item">
                    <span className="card__label">preguntas:</span>
                    <span className="card__info">{numeroPreguntas}</span>
                </div>
                <div className="card__item">
                    <span className="card__label">estado:</span>
                    <span className="card__info">{estado}</span>
                </div>
            </div>

        </div>
    );
};

export default Card;
