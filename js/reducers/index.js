const newsController = (state, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE_NUMBER':
            return {
                ...state,
                pageNumber: action.pageNumber
            }

        case 'CHANGE_CATEGORIES_ID':
            return {
                ...state,
                categoriesId: action.categoriesId
            }

        case 'OPEN_NEWS':
            return {
                ...state,
                news: action.news
            }

        case 'CHANGE_NEWS_TEXT':
            return {
                ...state,
                newsText: action.newsText
            }

        case 'ADD_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            }

        default:
            return state;
    }
}

export default newsController;