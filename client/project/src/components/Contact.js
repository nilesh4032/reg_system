import React, { useEffect, useState } from 'react'

function Contact() {

    const [userData , setUserData] = useState({name:"",email:"",phone:"",message:""})

    const callContactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json()//badho data responce ma made
            console.log(data)
            setUserData({...userData, name:data.name,email:data.email,phone:data.phone})

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callContactPage();
    }, [])

    // storing data in state 

    const handleInput = (e) =>{
        const name = e.target.name
        const value = e.target.value

        setUserData({...userData,[name]:value})
    }

    // send data to backend

    const contactForm = async (e) =>{
        e.preventDefault()

        const { name , email , phone , message} = userData

        const res = await fetch("/contact",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name , email , phone , message})
        })

        const data = await res.json()

        if(!data)
        {
            console.log("Message not Send")
        }
        else
        {
            alert("Message Send")
            setUserData({...userData,message:""})
        }
    }

    return (
        <>

            <div className="contatcontainer">
                <div className="contact-info-item d-flex justify-content-start">
                    <div className="contact-info-content">
                        <div className="contact-info-title" >
                            Phone
                                   </div>
                        <div className="contact-info-text" >
                            +91 1111 124 121
                                   </div>
                    </div>
                </div>

                <div className="contact-info-item d-flex justify-content-start">
                    <div className="contact-info-content">
                        <div className="contact-info-title" >
                            Email
                                   </div>
                        <div className="contact-info-text" >
                           nileshkumar2304@gmail.com
                                   </div>
                    </div>
                </div>

                <div className="contact-info-item d-flex justify-content-start">
                    <div className="contact-info-content">
                        <div className="contact-info-title" >
                            Address
                                   </div>
                        <div className="contact-info-text" >
                            jalandhar
                                   </div>
                    </div>
                </div>
            </div>


            <div className="contact-form">
                <div className="contactcontainer">
                    <div className="formcontainer">
                        <div className="contact-form-title">
                            Get in Touch
                        </div>

                        <form method="POST" id="contact-form">
                            <div className="contact-form-name">
                                <input type="text" id="contact-form-name" className="input-field" onChange={handleInput} name="name" value={userData.name} placeholder="Your Name" required="true" />
                                <input type="email" id="contact-form-email" className="input-field" onChange={handleInput} name="email" value={userData.email} placeholder="Your Email" required="true" />
                                <input type="number" id="contact-form-phone" className="input-field" onChange={handleInput} name="phone" value={userData.phone} placeholder="Your Phone" required="true" />
                            </div>

                            <div className="contact-form-text">
                                <textarea id="message" name="message" onChange={handleInput} value={userData.message} placeholder="Message" cols="100" rows="10"></textarea>
                            </div>

                            <div className="contact-form-button">
                                <input type="submit" id="cbutton" onClick={contactForm} value="Send Message"/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Contact
