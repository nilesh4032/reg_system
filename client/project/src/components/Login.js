import React , { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import img from "../img/2.png"

import {UserContext} from "../App"

function Login() {

    const {state , dispatch} = useContext(UserContext)

    const history = useHistory()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const loginUser = async(e)=>{
        e.preventDefault()

        const res = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
                
        })

        const data = res.json()

        if(res.status === 400 || !data)
        {
            window.alert("Invalid Credentials")
        }
        else
        {
            dispatch({type:"USER",payload:true})
            window.alert("Login Successful")
            history.push("/")
        }
    }


    return (
        <>
            <section className="signup">
                <div className="container">
                    <div className="signup-form">
                        <h2 className="form-title">Login</h2>
                        <form id="register-form" className="register-form" method="POST">
                            
                            <div className="form-group login">
                                <label htmlFor="Email">
                                    Email
                                </label>
                                <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                            </div>
                            
                            <div className="form-group login">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your Password" />
                            </div>


                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Login" onClick={loginUser} />
                            </div>

                        </form>

                    </div>
                </div>

                <div className="imgcontainer">
                    <img className="image" src={img}  alt="img" />
                </div>
            </section>
        </>
    )
}


export default Login
