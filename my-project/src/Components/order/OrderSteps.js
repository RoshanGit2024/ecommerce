import React from 'react'

function OrderSteps({status}) {

    const getStatusClass = (step) => {
        switch (step) {
            case 'processing':
                return status === 'processing' || status === 'shipped' || status === 'delivered' ? 'active' : '';
            case 'shipped':
                return status === 'shipped' || status === 'delivered' ? 'active' : '';
            case 'delivered':
                return status === 'delivered' ? 'active' : '';
            default:
                return '';
        }
    };
    return (
        <div className="orders-container">
                <div className="order-status">
                    <div className={`status-step ${getStatusClass('processing')}`}>
                        <div className="status-marker">1</div>
                        <div className="status-label">Processing</div>
                        <div className="status-arrow">&#8594;</div>
                    </div>
                    <div className={`status-step ${getStatusClass('shipped')}`}>
                        <div className="status-marker">2</div>
                        <div className="status-label">Shipped</div>
                        <div className="status-arrow">&#8594;</div>
                    </div>
                    <div className={`status-step ${getStatusClass('delivered')}`}>
                        <div className="status-marker">3</div>
                        <div className="status-label">Delivered</div>
                    </div>
                </div>
        </div>
    );

}

export default OrderSteps
