import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MetaData from '../MetaData'
import { toast } from 'react-toastify'
import { clearBulkMailsend, clearError } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { bulkMail } from '../../actions/userActions'

function SendMail() {
    const { loading, error,bulkMailSent } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")

    useEffect(() => {
        if (bulkMailSent) {
          toast.success("Mail Sent successfully", {
            onOpen: () => dispatch(clearBulkMailsend())
          })
          return
        }
    
        if (error) {
          toast.error(error, {
            onOpen: () => { dispatch(clearError()) }
          });
          return
        }
      }, [bulkMailSent, error, dispatch])

      const handleMailSend=(e)=>{
        e.preventDefault()
        dispatch(bulkMail(title,content))
      }
  return (
    <Fragment>
      <MetaData title={'Bulk mail'}/>
    <div className='row'>
      <div className='col-12 col-md-2'>
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-10">
            <form onSubmit={handleMailSend} className="shadow-lg" encType='multipart/form-data'>
              <h1 className="mb-4">Send Bulk Mail</h1>

              <div className="form-group">
                <label htmlFor="name_field">Subject</label>
                <input 
                 type="text"
                 id="name_field"
                 className="form-control"
                 onChange={(e)=>setTitle(e.target.value)}
                 value={title}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Body</label>
                <textarea 
                className="form-control" 
                id="description_field"
                onChange={(e)=>setContent(e.target.value)}
                value={content}
                rows="8"></textarea>
              </div>

             <button 
              id="login_button" 
              type="submit" 
              className="btn btn-block py-3"
              disabled={loading}
              >
                Send
              </button>

            </form>
          </div>
        </Fragment>
      </div>
    </div>
    </Fragment>
  )
}

export default SendMail
