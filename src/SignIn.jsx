import React from 'react'
import { useForm } from 'react-hook-form'

function SignIn() {
    const{register, handlesubmit} =useForm();
  return (
    
    <form onSubmit ={handlesubmit(myfunc)}>
    <input type ="text" placeholder="username"{...register("username")}/>
    <input type ="password" placeholder="password"{...register("password")}/>
    <button type ="submit">SignUp</button>
    </form> 
    
  )
}

export default SignIn;