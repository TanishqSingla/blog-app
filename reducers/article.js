const initialState = {
  articles: [],
  article: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ARTICLES":
      return {
        ...state,
        articles: action.articles,
      };
  }
};
