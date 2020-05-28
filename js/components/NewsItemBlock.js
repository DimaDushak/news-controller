import React from 'react';
import { Link, useParams } from 'react-router-dom';

const NewsItemBlock = (props) => {
    let { title, description } = useParams();

    return (
        <div className="news-item-block">
            <Link to="/newsBlock" className="link-back">Назад</Link>
            <h2>{title}</h2>
            <p className="news-item-block__description">{description}</p>
            <p dangerouslySetInnerHTML={props.addNewsTextHTML()} />
        </div>
    );
}

export default NewsItemBlock;