import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', { title, url });
        history.push('/mybookmarks');
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h3>Add Bookmark</h3>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                        <br />
                        <input type="text" name="url" placeholder="Url" value={url} onChange={e => setUrl(e.target.value)} className="form-control" />
                        <br />
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>);
}

export default AddBookmark;