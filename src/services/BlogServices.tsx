import axios from "axios";
import { GET_ALL_BLOG } from './constances';
import { withQuery } from '../helpers/withQueryString';

function xAuthToken(formData?: boolean | null, isJson?: boolean | null): object {
    let contentType = 'application/x-www-form-urlencoded'
    if (formData) {
        contentType = "multipart/form-data"
    }
    if (isJson) {
        contentType = "application/json"
    }
    const headers = {
        headers: {
            // 'Authorization': 'Bearer ',
            'Content-Type': contentType
        }
    }
    return headers;
}


function getAllBlog(params: any, responseCb: any, errorCb: any) {
    axios.get(withQuery(GET_ALL_BLOG, params), xAuthToken()).then(responseCb).catch(errorCb);
}

function createBlog(data: any, responseCb: any, errorCb: any) {
    axios.post(GET_ALL_BLOG, data, xAuthToken(true, null)).then(responseCb).catch(errorCb);
}

function getBlogId(id: any, responseCb: any, errorCb: any) {
    axios.get(GET_ALL_BLOG + `/${id}`, xAuthToken(true, null)).then(responseCb).catch(errorCb);
}

function updateBlog(id: any, data: any, responseCb: any, errorCb: any) {
    axios.put(GET_ALL_BLOG + `/${id}`, data, xAuthToken(true, null)).then(responseCb).catch(errorCb)
}

function deleteBlog(id: any, responseCb: any, error: any) {
    axios.delete(GET_ALL_BLOG + `/${id}`, xAuthToken(true, null)).then(responseCb).catch()
}
const BlogServices = {
    getAllBlog,
    createBlog,
    getBlogId,
    updateBlog,
    deleteBlog
};


export default BlogServices;

