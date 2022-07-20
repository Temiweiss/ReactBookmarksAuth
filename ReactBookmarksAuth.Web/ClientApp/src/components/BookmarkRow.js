import React, { useState } from 'react';

const BookmarkRow = ({ bookmark, onDeleteClick, OnUpdateClick }) => {
    const { title, url } = bookmark;
    const [newTitle, setNewTitle] = useState('');
    const [editState, setEditState] = useState(false);

    const onEditClick = () => {
        setEditState(true);
    }

    const onCancelClick = () => {
        setEditState(false);
    }

    const updateClick = () => {
        bookmark.title = newTitle;
        OnUpdateClick(bookmark);
        setEditState(false);
    }

    return (<tr>
        <td>
            {!editState ? title : <input type="text" className="form-control" placeholder="Title" defaultValue={title} onChange={e => setNewTitle(e.target.value)} />}
        </td>

        <td><a href={`${url}`} target="_blank">{url}</a></td>

        <td>
            {!editState ? <button className="btn btn-success" onClick={onEditClick}>Edit Title</button> :
                <div><button className="btn btn-warning" onClick={updateClick}>Update</button>
                    <button className="btn btn-info" onClick={onCancelClick}>Cancel</button></div>}

            <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>);
}
export default BookmarkRow;