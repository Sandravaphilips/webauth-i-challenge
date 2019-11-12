import React from "react";


export default function Form ({formValues, onFormSubmit, onInputChange}) {
      
    return (
      <form onSubmit={onFormSubmit} >
        <label>
          Username
          <input type="text" name="username" value={formValues.username} onChange={onInputChange} />
        </label>
  
        <label>
          Password
          <input type="text" name="password" value={formValues.password} onChange={onInputChange} />
        </label>
  
        <input type="submit" />
      </form>
    )
}