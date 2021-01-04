import v from "../utils/req";

export function tagList() {
    const  tagList = v.request1.post("/tag/list");
    return tagList;
}
export function addTag(pojo) {
    return v.request1.post("/tag",pojo)
}
export  function getById(id) {
    return v.request1.get(`/tag/${id}`)
}
export function deleteById(id) {
    return v.request1.delete(`/tag/${id}`)
}
export function update(pojo) {
    return v.request1.put(`/tag`,pojo)
}