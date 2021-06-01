import axios from "axios";
import BaseService from './base.service'

export default class MeetService extends BaseService {

    static singletonInstance
    static RESOURCE_NAME = '/meet'

    constructor() {
        super()
        this.baseUrl += MeetService.RESOURCE_NAME
    }

    static get() {
        if (!MeetService.singletonInstance) {
            MeetService.singletonInstance = new MeetService()
        }
        return MeetService.singletonInstance
    }

    
    createMeet (meet) {
        return axios({
            url: this.baseUrl,
            method: 'POST',
            data: meet
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    meetUpdate (meet) {
        return axios({
            url: this.baseUrl + "/update",
            method: 'POST',
            responseType: 'json',
            data: meet
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    endMeet (meet) {
        return axios({
            url: this.baseUrl + "/end",
            method: 'POST',
            responseType: 'json',
            data: meet
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }


    joinMeet (meet) {
        return axios({
            url: this.baseUrl + "/join",
            method: 'POST',
            data: meet
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    getActiveMeets () {
        return axios({
            url: this.baseUrl + "/active",
            method: 'GET'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }
}