import {request} from "@/utils";

export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

export function createArticleAPI(data) {
    return request({
        url: '/mp/articles',
        method: 'POST',
        data
    })
}

export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

export function getArticleDetailByIdAPI(id) {
    return request({
        url: `/mp/articles/${id}`
    })
}