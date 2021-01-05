import v from "../utils/req";

export function updatePwd(pojo) {
    return v.request1.put("/pwd",pojo)
}

export function updateAdmin(pojo) {
    return v.request1.put("/info",pojo)
}


export function deleteUrl(url) {
    return v.request1.delete(`upload/${url}`)
}

export function getInfo(){
    return v.request1.get('')
}