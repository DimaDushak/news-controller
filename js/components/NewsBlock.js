import React from 'react';
import { Link } from 'react-router-dom';

const NewsBlock = (props) => {
    const { news, openNewsItem, changePageNumber, createDate } = props;
    let { pageNumber } = props;

    if (news.length > 0) {
        return (
            <div className="news-block">
                <Link to="/" className="link-back">Назад</Link>
                <ul className="news-block__list">
                    {
                        news.map((item) => {
                            return (
                                <li className="news-block__item" key={item.id}>
                                    <Link to={`/newsItemBlock/${item.title}/${item.shortDescription}`}
                                      onClick={() => openNewsItem(item.id)}>
                                        <h2>{item.title}</h2>
                                        <p className="news-block__item-description">{item.shortDescription}</p>
                                        <div>{createDate(item.date)}</div>
                                    </Link>
                                    <hr />
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="news-block__button-block">
                    <button className={`news-block__button news-block__button${(pageNumber === 0) ? '_desable' : ''}`}
                      onClick={() => {
                        if (pageNumber > 0) {
                            changePageNumber(--pageNumber);
                        }
                    }}
                    >Предыдущая страница</button>
                    <button className={`news-block__button news-block__button${(news.find(item => item.id == 3 || item.id == 19)) ? '_desable' : ''}`}
                      onClick={() => {
                        if (!news.find(item => item.id == 3 || item.id == 19)) {
                            changePageNumber(++pageNumber);
                        }
                    }}>Следующая страница</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Link to="/" className="link-back">Назад</Link>
                <div className="news-block news-block_none">Новостей нет</div>
            </div>
        );
    }
}

export default NewsBlock;