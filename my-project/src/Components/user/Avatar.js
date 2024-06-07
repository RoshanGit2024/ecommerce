import React from 'react'

function Avatar({name,size=50,fontSize=20}) {

        const firstLetter = name ? name.charAt(0).toUpperCase():''

    const avatarStyle = {
        backgroundColor: '#ff0000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        fontWeight: 'bold',
        height:size,
        width:size,
        fontSize:fontSize
    };
  return (
    <div className='avatar' style={avatarStyle}>
         {firstLetter}
    </div>
  )
}

export default Avatar
