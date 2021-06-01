import axios from "axios";
import BaseService from './base.service'

export default class FeelinglService extends BaseService {

    static singletonInstance
    static RESOURCE_NAME = '/feeling'

    constructor() {
        super()
        this.baseUrl += FeelinglService.RESOURCE_NAME
    }

    static get() {
        if (!FeelinglService.singletonInstance) {
            FeelinglService.singletonInstance = new FeelinglService()
        }
        return FeelinglService.singletonInstance
    }

    registerFeeling (feeling) {
        return axios({
            url: this.baseUrl,
            method: 'POST',
            responseType: 'json',
            data: feeling
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }
}