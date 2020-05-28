export const changePageNumber = (pageNumber) => {
    return {
        type: 'CHANGE_PAGE_NUMBER',
        pageNumber
    }
}

export const changeCategoriesId = (categoriesId) => {
    return {
        type: 'CHANGE_CATEGORIES_ID',
        categoriesId
    }
}

export const openNews = (news) => {
    return {
        type: 'OPEN_NEWS',
        news
    }
}

export const changeNewsText = (newsText) => {
    return {
        type: 'CHANGE_NEWS_TEXT',
        newsText
    }
}

export const addCategories = (categories) => {
    return {
        type: 'ADD_CATEGORIES',
        categories
    }
}