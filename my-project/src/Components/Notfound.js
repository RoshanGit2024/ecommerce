import React from 'react'
import notfound from '../Assets/Notfounderr.webp'

function Notfound() {
  return (
    <div className='notfound-container'>
      <h1 >Result not found</h1>
      <img src={notfound} alt='err' height="250" width="250"/>
    </div>
  )
}

export default Notfound
