import React, { useEffect, useState } from 'react'
import img from "../img/IMG.jpg"
import { useHistory } from "react-router-dom"

function About() {

    const history = useHistory()

    const [userData , setUserData] = useState({})

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json()//badho data responce ma made
            console.log(data)
            setUserData(data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }

        } catch (error) {
            console.log(error)
            history.push("/login")
        }
    }

    useEffect(() => {
        callAboutPage();
    }, [])

    return (
        <>
            <div className="emp-profile">
                <form method="GET">
                    <div className="row">
                       

                        <div className="col-md-6">
                            <div className="profilehead">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>

                                
                            </div>
                        </div>

                        

                    </div>


                    <div className="row">
                        

                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent" >
                                <div className="tab-pan fade show active" id="home" role="tabpanel" area-aria-labelledby="home-tab">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData._id}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData.name}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData.email}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData.phone}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Course</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData.work}</label>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Country</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="blue-text">{userData.country}</label>
                                        </div>
                                    </div>

                                </div>


                               
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default About
