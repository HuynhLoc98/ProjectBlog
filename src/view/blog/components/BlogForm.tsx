import React, { useEffect, useState } from "react";
import BlogServices from "../../../services/BlogServices";
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = (props: any) => {
    const navigate = useNavigate();
    const { isCreate } = props
    const [dataBlogAdd, setDataBlogAdd] = useState({
        title: '',
        content: '',
        image: '',
    })
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getBlogId(id)
        }
    }, [id])

    const getBlogId = (id: string) => {
        BlogServices.getBlogId(id,
            (res: any) => {
                setDataBlogAdd(res.data.data)
            },
            (err: any) => {

            }
        )
    }
    console.log(dataBlogAdd)
    const handleSave = () => {
        const data = new FormData()
        data.append('blog[title]', dataBlogAdd.title)
        data.append('blog[content]', dataBlogAdd.content)
        data.append('blog[image]', dataBlogAdd.image)
        if (isCreate === true) {
            BlogServices.createBlog(data,
                (res: any) => {
                    navigate('/')
                },
                (err: any) => {

                }
            )
        } else {
            BlogServices.updateBlog(id, data,
                (res: any) => {
                    navigate('/')
                },
                (err: any) => {

                }
            )
        }
    }

    const handleChangeInput = (event: any) => {
        setDataBlogAdd({
            ...dataBlogAdd,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectFile = (event: any) => {
        setDataBlogAdd({
            ...dataBlogAdd,
            image: event.target.files[0]
        })
    }


    return (
        <div className="container">
            <div className="row" style={{ padding: 30 }}>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Title Blog</span>
                        <input onChange={handleChangeInput} value={dataBlogAdd.title} type="text" name="title" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Content</span>
                        <textarea onChange={handleChangeInput} value={dataBlogAdd.content} name="content" className="form-control" aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Img File</label>
                        <input onChange={handleSelectFile} type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                </div>
            </div>
            <div className="row btn-form">
                <button type="button" className="btn button-save" onClick={handleSave}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    <div className="text-button">Save</div>
                </button>
                <button type="button" className="btn button-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                    <div onClick={() => navigate('/')} className="text-button">Back</div>
                </button>
            </div>
        </div>
    )

}


export default BlogForm;
