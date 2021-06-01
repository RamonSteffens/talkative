import axios from "axios";
import BaseService from './base.service'

export default class FeedbackService extends BaseService {

    static singletonInstance
    static RESOURCE_NAME = '/feedback'

    constructor() {
        super()
        this.baseUrl += FeedbackService.RESOURCE_NAME
    }

    static get() {
        if (!FeedbackService.singletonInstance) {
            FeedbackService.singletonInstance = new FeedbackService()
        }
        return FeedbackService.singletonInstance
    }


    createFeedback(feedback) {
        return axios({
            url: this.baseUrl,
            method: 'POST',
            data: feedback
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    getFeedbackReceived(id) {
        return axios({
            url: this.baseUrl + "/received/" + id,
            method: 'GET'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    getFeedbackAuthored(id) {
        return axios({
            url: this.baseUrl + "/authored/" + id,
            method: 'GET'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }
}