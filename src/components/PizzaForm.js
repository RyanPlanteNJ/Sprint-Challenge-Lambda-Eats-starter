import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function Form() {
    const [post, setPost] = useState([]);
    const [formState, setFormState] = useState({
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
            .test('len', 'Must be at least 2 characters', val => val.toString().length >= 2)
            .required("Need name in order to submit order"),
        size: yup.string(),
        special: yup.string()
    });

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({...errors,[event.target.name]: "" });
        })
        .catch(err => setErrors({...errors, [event.target.ane]: err.errors[0]}));
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users")
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: "",
                    size: "",
                    toppings: "",
                    special: "",
                });
            })
            .catch(err => console.log(err.respone));

    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                    data-cy="name"
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
        </form>
    )
}