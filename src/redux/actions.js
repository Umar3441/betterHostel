
const addUser = (user) => {
    return {
        type: 'addUser',
        payload: user
    }
}

const addPosts = (posts) => {
    return {
        type: 'addPosts',
        payload: posts
    }
}

export {
    addUser,
    addPosts,
}