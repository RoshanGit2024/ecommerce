import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function ChatArea() {
  return (
    <div class="col-md-9">
        <div class="chat-box p-3">
          <div class="messages">
            <div class="message-left mb-3 shadow">Hii....</div>
            <div class="message-right mb-3 shadow">Hii how are you....</div>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="type here..."/>
            <div class="input-group-append">
              <button class="btn btn-primary">Send</button>
            </div>
          </div>
    </div>
    </div>
  )
}

export default ChatArea
