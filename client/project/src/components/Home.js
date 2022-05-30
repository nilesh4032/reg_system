import React, { useEffect, useState } from 'react'

function Home() {
    const [username , setUserName] = useState("")
    const [show , setShow] = useState(false)

    const callHomePage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json()//badho data responce ma made
            console.log(data)
            setUserName(data.name)
            setShow(true) 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])

    return (
        <>
            <div className="home-page">
                <div className="homediv">
                    <p>WELCOME {username}</p>
                    <h1>{show ?"Happy To See You Back" : "Please register to get started"}</h1>
                </div>
            </div>


        </>
    )
}
 
export default Home
