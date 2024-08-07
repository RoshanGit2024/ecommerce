import React from 'react'
import image from '../../../Assets/product1.jpg'

function LatestOrders() {
  return (
    <div className="latest-orders">
    <h4>Lattest orders</h4>
    <div className="table-container">
    <table className="order-table">
      <tr style={{position:'sticky'}}>
        <th>customer</th>
        <th>date</th>
        <th>item</th>
      </tr>
      <tr>
        <td><img src={image} alt='image' className='order-image'/> roshan</td>
        <td className='text-danger'>12-12-2023</td>
        <td><img src={image} alt='image' className='order-image'/> prod</td>
      </tr>
      <tr>
      <td><img src={image} alt='image' className='order-image'/></td>
        <td>united state</td>
        <td className='text-danger'>pending</td>
      </tr>
      <tr>
      <td><img src={image} alt='image' className='order-image'/></td>
        <td>united state</td>
        <td className='text-danger'>pending</td>
      </tr>
      <tr>
      <td><img src={image} alt='image' className='order-image'/></td>
        <td>united state</td>
        <td className='text-danger'>pending</td>
      </tr>
      <tr>
      <td><img src={image} alt='image' className='order-image'/></td>
        <td>united state</td>
        <td className='text-danger'>pending</td>
      </tr>
      <tr>
      <td><img src={image} alt='image' className='order-image'/></td>
        <td>united state</td>
        <td className='text-danger'>pending</td>
      </tr>
    </table>
    </div>
    </div>
  )
}

export default LatestOrders
