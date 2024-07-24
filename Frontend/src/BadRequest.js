import React from 'react'

function BadRequest({message}) {
  return (
    <div className="error-container">
            <h1>400</h1>
            <h2>Bad Request</h2>
            <p>{message}</p>
            <p>Please check the product and try again.</p>
        </div>
  )
}

export default BadRequest
