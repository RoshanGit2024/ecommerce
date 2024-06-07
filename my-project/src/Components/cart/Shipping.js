import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from 'countries-list'
import { saveShippingInfo } from '../../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import Steps from './Steps'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import MetaData from '../MetaData'



export const validateShipping = (shippingInfo) => {
    const { address, city, phoneNumber, postalCode, country, state } = shippingInfo;
    if (!address || !city || !phoneNumber || !postalCode || !country || !state) {
        return false;
    }
    return true;
};

function Shipping() {
    const { shippingInfo = {} ,loading} = useSelector(state => state.cartState)
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city)
    const [phoneNumber, setPhoneNo] = useState(shippingInfo.phoneNumber);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.country)
    const countryList = Object.values(countries)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const shippingInfo = { address, city, phoneNumber, postalCode, country, state }
        if (validateShipping(shippingInfo)) {
            dispatch(saveShippingInfo(shippingInfo))
            console.log(shippingInfo)
            navigate('/order/confirm')
        } else {
            toast.error("please fill the shipping")
        }
    }

    return (
        <Fragment>
            {loading ? <Loader/> : 
        <Fragment>
            <MetaData title={'shipping information'}/>
            <Steps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required>
                                {countryList.map((country, i) => (
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)} required />
                        </div>

                        <button id="shipping_btn" type="submit" className="btn btn-block py-3">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>}
        </Fragment>
    )
}

export default Shipping
