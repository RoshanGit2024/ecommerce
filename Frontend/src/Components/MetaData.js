import React from 'react'
import { Helmet } from 'react-helmet-async'

function MetaData({title}) {
  return (
    <Helmet>
        <title>{`${title}-shoping`}</title>
    </Helmet>
  )
}

export default MetaData
