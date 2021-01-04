import v from "../utils/req";

export function addBlog(pojo) {
    return v.request1.post("/blog",pojo);
}

export function updateBlog(pojo) {
    return v.request1.put("/blog",pojo);
}

export function blogList(page,size,searchMap) {
    return v.request1.post(`/blog/list/${page}/${size}`,searchMap);
}

export  function deleteBlog(id) {
    return v.request1.delete(`/blog/${id}`);
}

export function  getBlog(id) {
    return v.request1.get(`/blog/${id}`);
}

export function updateBlogTop(id) {
    return v.request1.put(`/blog/top/${id}`);
}

export function putWayBlog(id) {
    return v.request1.put(`/blog/${id}`);
}