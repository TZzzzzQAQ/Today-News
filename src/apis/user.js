import {request} from "@/utils";

export function loginAPI(data) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data
    })
}

export function getUserInfoAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}

export function deleteArticleAPI(target) {
    return request({
        url: `/mp/articles/${target}`,
        method: 'DELETE',
    })
}