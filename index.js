import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoriesList from './js/components/CategoriesList';
import NewsBlock from './js/components/NewsBlock';
import NewsItemBlock from './js/components/NewsItemBlock';
import './scss/main.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            categoriesId: 0,
            pageNumber: 0,
            news: [],
            newsText: ''
        }

        this.openNewsList = this.openNewsList.bind(this);
        this.openNewsItem = this.openNewsItem.bind(this);
        this.addNewsTextHTML = this.addNewsTextHTML.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
    }

    changePageNumber(pageNumber) {
        this.setState({
            pageNumber
        })
    }

    addNewsTextHTML() {
        return {
            __html: this.state.newsText
        }
    }

    openNewsList(categoriesId, pageNumber) {
        window.fetch(`http://testtask.sebbia.com/v1/news/categories/${categoriesId}/news?page=${pageNumber}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    categoriesId,
                    pageNumber,
                    news: response.list
                })
            })
    }

    openNewsItem(id) {
        window.fetch(`http://testtask.sebbia.com/v1/news/details?id=${id}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    newsText: response.news.fullDescription
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.pageNumber !== prevState.pageNumber) {
            this.openNewsList(this.state.categoriesId, this.state.pageNumber);
        }
    }

    componentDidMount() {
        window.fetch('http://testtask.sebbia.com/v1/news/categories')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    categories: response.list
                })
            })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" render={() => <CategoriesList categories={this.state.categories}
                    openNewsList={this.openNewsList} />} />
                <Route exact path="/newsBlock" render={() => <NewsBlock news={this.state.news}
                    pageNumber={this.state.pageNumber} changePageNumber={this.changePageNumber} openNewsItem={this.openNewsItem} />} />
                <Route exact path="/newsItemBlock/:title/:description" render={() => <NewsItemBlock addNewsTextHTML={this.addNewsTextHTML} />} />
            </Router>
        );
    }
}

ReactDOM.render((
    <App />
), document.getElementById('root'));