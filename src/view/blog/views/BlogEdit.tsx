import React, { useState } from "react";
import BlogForm from "../components/BlogForm"


function BlogEdit(props: any) {

    return (
        <React.Fragment>
            <BlogForm
                isCreate={false}
            />
        </React.Fragment>
    )


}


export default BlogEdit;
