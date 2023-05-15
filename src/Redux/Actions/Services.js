
import axios from 'axios'
import Constants from '../Constants'

// get Service
const getService = (endPoint) => {
    return axios.get(Constants.BASEURL + endPoint)
        .then(Response => Response.data).catch(error => { return error.response });
}

// get By Id Service
const getByIdService = (endPoint, id) => {
    return axios.get(Constants.BASEURL + endPoint + '/' + id)
        .then(Response => Response.data).catch(error => { return error.response });
}

// post Service
const postService = (endPoint, details) => {
    return axios.post(Constants.BASEURL + endPoint, details, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(Response => Response.data).catch(error => { return error.response });
}

// post Service
const postIdService = (endPoint,id, details) => {
    return axios.post(Constants.BASEURL + endPoint + '/' + id, details, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(Response => Response.data).catch(error => { return error.response });
}

// patch Service
const patchService = (endPoint, id, details) => {
    return axios.patch(Constants.BASEURL + endPoint + '/' + id, details)
        .then(Response => Response.data).catch(error => { return error.response });
}

// delete Service
const deleteService = (endPoint, id) => {
    return axios.delete(Constants.BASEURL + endPoint + '/' + id)
        .then(Response => Response.data).catch(error => { return error.response });
}


export const Services = {
    getService,
    getByIdService,
    postService,
    patchService,
    deleteService,
    postIdService
}