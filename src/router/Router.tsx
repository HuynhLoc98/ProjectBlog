import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomeView from "../view/home/HomeView"
import BlogAdd from "../view/blog/views/BlogAdd"
import BlogEdit from "../view/blog/views/BlogEdit"

function Router() {
    return (
        <div className="root">
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/add" element={<BlogAdd />} />
                <Route path="/edit/:id" element={<BlogEdit />} />
            </Routes>
        </div>
    );
}
export default Router;