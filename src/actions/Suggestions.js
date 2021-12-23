export let setPeopleSuggestions = (people) => {
    return {
        type: "SET_PEOPLE_SUGGESTIONS",
        payload: { people } 
    }
}
  