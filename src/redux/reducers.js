const initialState = {
    user: null,
    posts: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addUser':
            return {
                ...state,
                user: action.payload
            };
        case 'addPosts':
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state;
    }
}
export default reducer;