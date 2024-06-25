import React, { useEffect } from 'react'
import errimg from '../Assets/error.webp'
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../slices/productSlice';
import { toast } from 'react-toastify';

function Errorcomp({message}) {
  //const { error } = useSelector((state) => state.prodSingleState);
  //const dispatch = useDispatch()

  return (
    <div className='error-container'>
      <h1>An Error occurd ☹</h1>
      <p>{message}</p>
    </div>
  )
}

export default Errorcomp
