import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoriesList from '../components/CategoriesList';
import NewsBlock from '../components/NewsBlock';
import NewsItemBlock from '../components/NewsItemBlock';
import { changePageNumber, changeCategoriesId, openNews, changeNewsText, addCategories } from '../actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.openNewsList = this.openNewsList.bind(this);
        this.openNewsItem = this.openNewsItem.bind(this);
        this.addNewsTextHTML = this.addNewsTextHTML.bind(this);
        this.createDate = this.createDate.bind(this);
    }

    addNewsTextHTML() {
        return {
            __html: this.props.newsText
        }
    }

    createDate(date) {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const arr = [date.slice(8, 10), date.slice(5, 7) - 1, date.slice(0, 4) + 'г.'];

        return `${arr[0]} ${months[arr[1]]} ${arr[2]}`;
    }

    openNewsList(categoriesId, pageNumber) {
        window.fetch(`http://testtask.sebbia.com/v1/news/categories/${categoriesId}/news?page=${pageNumber}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.props.changeCategoriesId(categoriesId);
                this.props.changePageNumber(pageNumber);
                this.props.openNews(response.list);
            })
    }

    openNewsItem(id) {
        window.fetch(`http://testtask.sebbia.com/v1/news/details?id=${id}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.props.changeNewsText(response.news.fullDescription);
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.pageNumber !== prevProps.pageNumber) {
            this.openNewsList(this.props.categoriesId, this.props.pageNumber);
        }
    }

    componentDidMount() {
        window.fetch('http://testtask.sebbia.com/v1/news/categories')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.props.addCategories(response.list);
            })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" render={() => <CategoriesList categories={this.props.categories}
                    openNewsList={this.openNewsList} />} />
                <Route exact path="/newsBlock" render={() => <NewsBlock news={this.props.news} createDate={this.createDate}
                    pageNumber={this.props.pageNumber} changePageNumber={this.props.changePageNumber} openNewsItem={this.openNewsItem} />} />
                <Route exact path="/newsItemBlock/:title/:description" render={() => <NewsItemBlock addNewsTextHTML={this.addNewsTextHTML} />} />
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        categoriesId: state.categoriesId,
        pageNumber: state.pageNumber,
        news: state.news,
        newsText: state.newsText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePageNumber: (pageNumber) => dispatch(changePageNumber(pageNumber)),
        changeCategoriesId: (categoriesId) => dispatch(changeCategoriesId(categoriesId)),
        openNews: (news) => dispatch(openNews(news)),
        changeNewsText: (newsText) => dispatch(changeNewsText(newsText)),
        addCategories: (categories) => dispatch(addCategories(categories))
    }
}

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;