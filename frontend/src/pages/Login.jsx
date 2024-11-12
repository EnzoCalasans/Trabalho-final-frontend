import React, { useState } from 'react'
import './CSS/Login.css'

const Login = () => {

  const [state, setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async() =>{
    console.log("Função login executada", formData)
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data)=> responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  const cadastro = async() =>{
    console.log("Função cadastro executada", formData)
    let responseData;
    await fetch('http://localhost:4000/cadastro', {
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data)=> responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>{state}</h1>
        <div className='login-fields'>
            {state==="Cadastro"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Seu Nome'/>:<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Seu Email'/>
            <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Senha'/>
        </div>
        <button onClick={() => {state==="Login"?login():cadastro()}}>Continue</button>
        {state==="Cadastro"
        ?<p className='login-login'>Já tem uma conta? <span onClick={() =>{setState("Login")}}>Faça login</span> </p>
        :<p className='login-login'>Criar uma conta? <span onClick={() => {setState("Cadastro")}}>Clique aqui</span> </p>}
        <div className='login-aceito'>
            <input type='checkbox' name='' id=''/>
            <p>Para continuar, eu aceito os termos de use e politica de privacidade. </p>
        </div>
      </div>
    </div>
  )
}

export default Login
