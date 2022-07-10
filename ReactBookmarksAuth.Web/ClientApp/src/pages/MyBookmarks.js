import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import BookmarkRow from '../components/BookmarkRow';
import { Link } from 'react-router-dom';

const MyBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const getMyBookmarks = async () => {
            const { data } = await axios.get(`/api/bookmark/mybookmarks?id=${user.id}`);
            setBookmarks(data);
        }
        getMyBookmarks();
    }, []);

    const onUpdateClick = async (bookmark) => {
        await axios.post('/api/bookmark/updatebookmark', { ...bookmark });
        const { data } = await axios.get(`/api/bookmark/mybookmarks?id=${user.id}`);
        setBookmarks(data);
    }

    const onDeleteClick = async (bookmark) => {
        await axios.post('/api/bookmark/deletebookmark', { ...bookmark });
        const { data } = await axios.get(`/api/bookmark/mybookmarks?id=${user.id}`);
        setBookmarks(data);
    }


    return (<div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1>Welcome back {`${user.firstName} ${user.lastName}`}!</h1>
                <Link className="btn btn-large btn-block" to='/addbookmark' >
                    <button className="btn btn-primary btn-large btn-block">Add Bookmark </button>
                </Link>
            </div>
        </div>
        <div className="row">
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks && bookmarks.map((b, k) =>
                        <BookmarkRow
                            bookmark={b}
                            key={k}
                            OnUpdateClick={onUpdateClick}
                            onDeleteClick={() => onDeleteClick(b)}
                        />)}
                </tbody>
            </table>
        </div>
    </div>)
}

export default MyBookmarks;