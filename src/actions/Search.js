export let setSearchResult = (result) => {
    return {
        type: "SET_SEARCH_RESULT",
        payload: { result } 
    }
}
export let setSearchKeywords = (keywords) => {
    return {
        type: "SET_SEARCH_KEYWORDS",
        payload: { keywords } 
    }
}
  