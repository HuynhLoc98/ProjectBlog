import React, { useState } from "react";
import BlogForm from "../components/BlogForm";

function BlogAdd(props: any) {

    return (
        <React.Fragment>
            <BlogForm
                isCreate={true}
            />
        </React.Fragment>
    )

}


export default BlogAdd;
