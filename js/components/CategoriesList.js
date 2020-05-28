import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesList = (props) => {
    return (
        <ul className="categories-list">
            {
                props.categories.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={'/newsBlock'} onClick={() => props.openNewsList(item.id, 0)}>{item.name}</Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default CategoriesList;