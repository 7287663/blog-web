import v from "../utils/req";

export function update(pojo) {
    return v.request1.put("",pojo)
}

export function deleteUrl(url) {
    return v.request1.delete(`upload/${url}`)
}

export function getInfo(){
    return v.request1.get('')
}