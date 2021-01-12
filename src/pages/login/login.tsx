import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';

const Login: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <div>
            <h5>LOHIN</h5>
        </div>
    );
};

export default Login;
