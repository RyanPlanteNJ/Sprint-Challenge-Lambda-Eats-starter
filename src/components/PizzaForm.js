import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function PizzaForm() {
    const [post, setPost] = useState([]);
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni:"",
        pineapple: "",
        bacon:"",
        peppers: "",
        special: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni:"",
        pineapple: "",
        bacon:"",
        peppers: "",
        special: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        name: yup.string()
              .required("Need name in order to submit order"),
        size: yup.string(),
        special: yup.string(),
        pepperoni: yup.mixed(),
        pineapple: yup.mixed(),
        bacon: yup.mixed(),
        peppers: yup.mixed() 
    });

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({...errors,[event.target.name]: "" });
        })
        .catch(err => setErrors({...errors, [event.target.name]: err.errors[0]}));
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid);
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                      name: "",
                      size: "",
                      pepperoni:"",
                      pineapple: "",
                      bacon:"",
                      peppers: "",
                      special: "",
                });
            })
            .catch(err => console.log(err.response));

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
            
            <label htmlFor="size">
                Size:
                <select
                    id="size"
                    name="size"
                    onChange={inputChange}>
                    <option value ="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                {errors.size.length > 0 ? (<p className="error">{errors.size}</p>) : null}
            </label>
            <div className="toppings">
                <h1>Toppings</h1>
                <label htmlFor="checkbox">
                    <input 
                        id="pepperoni"
                        type="checkbox"
                        name="pepperoni"
                        data-cy="pepperoni"
                        onChange={inputChange}
                        checked={formState.pepperoni}
                    /> Pepperoni
                      <input 
                        id="bacon"
                        type="checkbox"
                        name="bacon"
                        data-cy="bacon"
                        onChange={inputChange}
                        checked={formState.bacon}
                    /> Bacon
                      <input 
                        id="pineapple"
                        type="checkbox"
                        name="pineapple"
                        data-cy="pineapple"
                        onChange={inputChange}
                        checked={formState.pineapple}
                    /> Pineapple
                      <input 
                        id="peppers"
                        type="checkbox"
                        name="peppers"
                        data-cy="peppers"
                        onChange={inputChange}
                        checked={formState.peppers}
                    /> Peppers
                </label>
            </div>
            <label htmlFor="special">
                Please Enter Any Special Requests
                <textarea
                    name="special"
                    onChange={inputChange}
                    value={formState.special}
                />
                {errors.special.length > 0 ? (
                    <p className="error">{errors.special}</p>
                ) : null }
            </label>
            
            <button disabled={isButtonDisabled} type ="submit">
                Place Order
            </button>
            <pre>{JSON.stringify(post,null,2)}</pre>
        </form>
    )
}