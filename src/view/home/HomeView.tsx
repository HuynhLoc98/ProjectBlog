/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "../../Css/HomeView.css"
import BlogServices from "../../services/BlogServices";
import { useNavigate } from 'react-router-dom';

function HomeView() {
    const [dataBlog, setDataBlog] = useState([])
    const [countPage, setCountPage] = useState<number[]>([])
    const navigate = useNavigate();
    const [params, setParams] = useState({
        page: 1,
        offset: 20,
        search: ''
    })
    useEffect(() => {
        getAllBlog(params)
    }, [params])


    const handleChangePage = (check: string, page: number) => {
        if (check === 'pre') {
            setParams({
                ...params,
                page: page - 1
            })
            setPageNow(page - 1)
        }
        if (check === 'next') {
            setParams({
                ...params,
                page: page + 1
            })
            setPageNow(page + 1)
        }
        if (check === 'number') {
            setParams({
                ...params,
                page: page
            })
            setPageNow(page)
        }
    }
    const [pageNow, setPageNow] = useState(1)
    const getAllBlog = (_params: any) => {
        BlogServices.getAllBlog(_params,
            (res: any) => {
                const list_blog = res.data.data.items
                const { count, offset, page } = res.data.pagination
                list_blog.forEach((blog: any) => {
                    blog.title = blog.title
                    blog.content = blog.content
                    blog.image = blog.image.url
                })
                setDataBlog(list_blog)
                let temp = []
                if (count % offset === 0) {
                    for (let i = 1; i <= count / offset; i++) {
                        temp.push(i)
                    }
                } else {
                    for (let i = 1; i <= parseInt((count / offset) + '') + 1; i++) {
                        temp.push(i)
                    }
                }
                setCountPage(temp)
            },
            (err: any) => {
                // console.log(err, '--------res')
            }
        )
    }

    const handleCreate = () => {
        navigate('/add')
    }

    const handleEdit = (id: any) => {
        navigate(`/edit/${id}`)
    }
    const handleDelete = (id: any) => {
        BlogServices.deleteBlog(id,
            (res: any) => {
                // enqueueSnackbar('thanh')
                getAllBlog(params)
            },
            (err: any) => {

            }
        )
    }

    const handleSearch = (event: any) => {
        const { value, name } = event.target
        setParams({
            ...params,
            [name]: value,
            page: 1,
            offset: 20
        })
    }

    return (
        <div className="container root">
            <input value={params.search} name="search" onChange={handleSearch} type="text" className="form-control search-input" aria-label="Amount (to the nearest dollar)" />
            <div className="row btn-create">
                <button type="button" className="btn button-create" onClick={handleCreate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <div className="text-button">Create Blog</div>
                </button>
            </div>
            <div className="row">
                {
                    dataBlog && dataBlog.length ?
                        dataBlog.map((item: any, index: any) => {
                            return (
                                <>
                                    <div key={index} className="container content-blog">
                                        <div className="row row-content">
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <img style={{ height: '100px', width: '100px', objectFit: 'cover' }} src={item.image} />
                                                    </div>
                                                    <div className="col-4 title-blog">
                                                        <p dangerouslySetInnerHTML={{ __html: item.title }} />
                                                    </div>
                                                    <div className="col-6">
                                                        <p dangerouslySetInnerHTML={{ __html: item.content }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 ">
                                                <div className="row btn-action">
                                                    <button type="button" className="btn button-edit" onClick={(id) => handleEdit(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                        </svg>
                                                        <div className="text-button">Edit</div>
                                                    </button>
                                                    <button type="button" className="btn button-delete" onClick={(id) => handleDelete(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                        <div className="text-button">Delete</div>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )

                        }) : ('')
                }
            </div>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" onClick={() => handleChangePage('pre', params.page)}>Previous</a>
                    </li>
                    {
                        countPage.map((x, i) => {
                            return (
                                <li key={i} onClick={() => handleChangePage('number', +x)} className={`page-item ${x == pageNow ? 'active' : ''}`}><a className="page-link">{x}</a></li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" onClick={() => handleChangePage('next', params.page)}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );

}
export default HomeView;