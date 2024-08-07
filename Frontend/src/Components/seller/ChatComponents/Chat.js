import React, { Fragment } from 'react'
import SidebarSeller from '../SidebarSeller'
import { Container, Row, Col } from 'react-bootstrap';
import ChatArea from './ChatArea';
import ChatUsers from './ChatUsers';

function Chat() {
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <SidebarSeller />
            </div>
            <div className="col-12 col-md-10 my-8">
                <Fragment>
                    <Row>
                        <Col md={8} className="bg-light">
                            <ChatArea/>
                        </Col>
                        <Col md={4} className="bg-secondary text-white">
                            <ChatUsers />
                        </Col>
                    </Row>
                </Fragment>
            </div>
        </div>
    )
}

export default Chat
