import React, {useState} from 'react';
import Axios from 'axios';
import Form from './Form';
import { initialFormValues } from "./Register";


export default function() {
    const [formValues, setFormValues] = useState(initialFormValues);

    function onInputChange(e) {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function onFormSubmit(e) {
        e.preventDefault();
        Axios.post('http://localhost:5000/api/login', formValues)
        .then(res => {
            alert(res.data.message);
            sessionStorage.setItem("cookie", res.data.payload);
        })
        .catch(err => console.log(err));
        setFormValues(initialFormValues);
    }
    
    return (
        <Form formValues={formValues} onInputChange={onInputChange} onFormSubmit={onFormSubmit} />
    )
}