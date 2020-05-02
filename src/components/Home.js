import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {

    const history = useHistory();
    const routeToForm = event => {
        history.push("/pizza");
    };

    return (
        <div>
            <button className="md-button pizza-button" onClick={routeToForm}>
                Order Now
            </button>
        </div>
    )
}