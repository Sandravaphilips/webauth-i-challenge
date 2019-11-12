import React, {useState} from 'react';
import Axios from 'axios';
import Form from './Form';

export const initialFormValues = {
    username: '',
    password: ''
}

export default function Register(props) {
    const [formValues, setFormValues] = useState(initialFormValues);

    function onInputChange(e) {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function onFormSubmit(e) {
        e.preventDefault();
        Axios.post('http://localhost:5000/api/register', formValues)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        props.history.replace('/login')
    }
    
    return (
        <Form formValues={formValues} onInputChange={onInputChange} onFormSubmit={onFormSubmit} />
    )
}