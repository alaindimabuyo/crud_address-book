import React from 'react'
import axios from 'axios'

const SetAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.commom['x-auth-token'];
    }
}

export default SetAuthToken
