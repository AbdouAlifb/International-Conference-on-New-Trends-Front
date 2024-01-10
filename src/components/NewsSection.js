import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsSection = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/news')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching news', error);
            });
    }, []);

    return (
        <div>
            <h2>Latest News</h2>
            {news.map((newsItem, index) => (
                <div key={index}>
                    <p>{newsItem.description}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsSection;
