import React from 'react'
import errimg from '../Assets/error.webp'

function Errorcomp({message}) {
  return (
    <div className='error-container'>
      <h1>An Error occurd ☹</h1>
      <p>{message}</p>
    </div>
  )
}

export default Errorcomp
