import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function Form() {
    const [fromState, setFormState] = useState({
        name: "",
        size: "",
        toppings: "",
        special: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        toppings: "",
        special: "",
    });

    const[isButtonDisabled, setIsButtonDisabled] = useState(false);

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Need name in order to submit order"),
        size: yup.string(),
        special: yup.string()
    });

    const validateChange = event => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid = {
            setErrors({...errors, [e.target.name]:""});
        })
        .catch(err => setErrors({...errors, [e.target.ane]: err.errros[0]}));
    };

    
}