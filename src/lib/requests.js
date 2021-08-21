import axios from 'axios'
import {getCSRF} from 'src/lib/cookie.js'


export default class Requestor {
    constructor() {
        this.statusCodes = {
            OK: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            NOT_MODIFIED: 304,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            CONFLICT: 409
        }
        this.errors = {}
    }

    axios_request(method, url, data, params) {
        let headers = {}
        let csrf_token = getCSRF()
        if (csrf_token) {
            headers['X-CSRFToken'] = csrf_token
        }
        let promise = axios({
            method: method,
            url: url,
            data: data,
            params: params,
            headers: headers,
        })
        return promise
    }

    request(url, data, params, method) {
        this.errors =  {}

        return this.axios_request(method, url, data, params).then((response) => {
            return {data: response.data, status_code: response.status}
        }).catch((error) => {
            if (error.response) {
                let statusCode = error.response.status
                this.errors.status_code = statusCode
                this.errors.data = error.response.data
                if (statusCode === this.statusCodes.BAD_REQUEST) {
                    this.errors.error = error.response.data
                } else if (statusCode === this.statusCodes.UNAUTHORIZED) {
                    this.errors.error = 'Request is unauthorized. Please authenticate and try again'
                } else if (statusCode === this.statusCodes.FORBIDDEN) {
                    this.errors.error = "You don't have permission to access this resource"
                } else if (statusCode === this.statusCodes.NOT_FOUND) {
                    this.errors.error = "The resource was not found on the server"
                } else if (statusCode >= 401 && statusCode < 500) {
                    this.errors.error = "The request could not be completed"
                }
            } else if (error.request) {
                // Request was sent, server did not respond
                this.errors.error = "Request could not be completed. Please try again soon."
            } else {
                // Request wasn't sent
                this.errors.error = 'Request could not be completed'
            }
            throw this.errors
        })
    }

    post(url, data) {
        return this.request(url, data, {}, 'post')
    }

    get(url, params) {
        return this.request(url, {}, params, 'get')
    }

    patch(url, data) {
        return this.request(url, data, {}, 'patch')
    }

    put(url, data) {
        return this.request(url, data, {}, 'put')
    }

    delete(url, data) {
        return this.request(url, data, {}, 'delete')
    }
}
