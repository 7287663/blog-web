import v from "../utils/req";

export function deleteComment(id) {
   return v.request1.delete(`/comment/${id}`)
}

export function getCommentList(page,size,blogId) {
    return v.request1.post(`/comment/${page}/${size}/${blogId}`)
}
