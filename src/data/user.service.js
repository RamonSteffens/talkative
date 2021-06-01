import axios from "axios";
import BaseService from './base.service'

export default class UserService extends BaseService {

    static singletonInstance
    static RESOURCE_NAME = '/user'

    constructor() {
        super()
        this.baseUrl += UserService.RESOURCE_NAME
    }

    static get() {
        if (!UserService.singletonInstance) {
            UserService.singletonInstance = new UserService()
        }
        return UserService.singletonInstance
    }

    userLogin (user) {
        return axios({
            url: this.baseUrl + "/login",
            method: 'POST',
            responseType: 'json',
            data: user
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    userRegister (user) {
        return axios({
            url: this.baseUrl,
            method: 'POST',
            responseType: 'json',
            data: user
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    /*fetchFile(url, filename) {
        return axios({
            url,
            method: 'GET',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            link.click();
            link.remove();
        }).catch((response) => {
            console.error("Could not Download the Excel report from the backend.", response);
        })
    }*/

}