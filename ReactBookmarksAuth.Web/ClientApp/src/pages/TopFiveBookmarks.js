import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../AuthContext';

const TopFiveBookmarks = () => {
    const { user } = useAuthContext();
    const [topFiveBookmarks, setTopFiveBookmarks] = useState([]);

    useEffect(() => {
        const getTopFiveBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/gettopfivebookmarks');
            setTopFiveBookmarks(data);
        }
        getTopFiveBookmarks();
    }, []);

    return (
        <div className="container">
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                        {topFiveBookmarks.map((b, k) => <tr>
                            <td>
                                <a href={`${b.url}`} target="_blank">{b.url}</a>
                            </td>
                            <td>{b.count}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default TopFiveBookmarks;
