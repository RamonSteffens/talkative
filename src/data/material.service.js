import axios from "axios";
import BaseService from './base.service'

export default class MaterialService extends BaseService {

    static singletonInstance
    static RESOURCE_NAME = '/material'

    constructor() {
        super()
        this.baseUrl += MaterialService.RESOURCE_NAME
    }

    static get() {
        if (!MaterialService.singletonInstance) {
            MaterialService.singletonInstance = new MaterialService()
        }
        return MaterialService.singletonInstance
    }

    getMaterials () {
        return axios({
            url: this.baseUrl,
            method: 'GET',
            responseType: 'json'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    getMaterialsTitle () {
        return axios({
            url: this.baseUrl + '/title',
            method: 'GET',
            responseType: 'json'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    createMaterial (material) {
        return axios({
            url: this.baseUrl,
            method: 'POST',
            responseType: 'json',
            data: material
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }

    getMaterialsByTopic (topic) {
        return axios({
            url: this.baseUrl + `/topic?topic=${topic}`,
            method: 'GET',
            responseType: 'json'
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })
    }
}