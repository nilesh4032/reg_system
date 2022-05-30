import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import img from "../img/2.png"

function Signup() {

    const history = useHistory()

    const[user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        country:"",
        password:"",
        cpassword:"",
    }) 

    let name,value

    const handleInput = (e)=>{
        name= e.target.name
        value = e.target.value

        setUser({...user,[name]:value})
    }

    const sendDataToBackend = async (e) =>{
        e.preventDefault()

        const { name,email,phone,work,country,password,cpassword } = user

        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,country,password,cpassword
            })
        })

        const data = await res.json()

        if(data.status === 422 || !data)
        {
            window.alert("Registration Failed")
        }
        else
        {
            window.alert("Register Scessful")
            history.push("/login")
        }

    }

    return (
        <>
            <section className="signup">
                <div className="container">
                    <div className="signup-form">
                        <h2 className="form-title">Register</h2>
                        <form id="register-form" method="POST" className="register-form">

                            <div className="form-group">
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInput} placeholder="Enter your username" />
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="Email">
                                    Email
                                </label>
                                <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInput} placeholder="Enter your email" />
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="Phone">
                                    Phone
                                </label>
                                <input type="text" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput} placeholder="Enter your phone" />
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="Work">
                                    course
                                </label>
                                <select type="text" name="work" id="Work" autoComplete="off" value={user.work} onChange={handleInput} placeholder="Enter your Course" >
                                 <option value="UG">Under Graduate</option>
                                  <option value="PG">Post Graduate</option>
                                  <option value="">select course</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">
                                    Country
                                </label>
                                <select type="text" name="country" id="country" autoComplete="off" value={user.country} onChange={handleInput} placeholder="Enter your Country" >
                                     <option value="Germany">Germany</option>
                                  <option value="France">France</option>
                                  <option value="India">India</option>
                                  <option value="Turkey">Turkey</option>
                                    </select>
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInput} placeholder="Enter your Password" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cpassword">
                                    CPassword
                                </label>
                                <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInput} placeholder="Enter your CPassword" />
                            </div>

                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" onClick={sendDataToBackend} className="form-submit" value="Register" />
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

export default Signup
