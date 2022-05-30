import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
    return (
        <>
            <div className="error-page">
                <div className="homediv">
                    <h1 className="error">404</h1>
                </div>
                <div className="error-text">
                    <h1>We are sorry, Page not found!</h1>
                </div>
                <NavLink className="error-button" to="/">Back to Homepage</NavLink>
            </div>
        </>
    )
}

export default Error
