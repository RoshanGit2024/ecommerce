import React from 'react'

function Avatar({name}) {

        const firstLetter = name ? name.charAt(0).toUpperCase():''

    const avatarStyle = {
        backgroundColor: '#ff0000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
        width:'100%',
        borderRadius: '50%',
        fontWeight: 'bold',
    };
  return (
    <div className='avatar' style={avatarStyle}>
         {firstLetter}
    </div>
  )
}

export default Avatar
