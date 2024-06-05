import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    username: null,
    firstname: null,
    token: null,
    likedTweets: [],

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpUser: (state, action) => {
            state.firstname = action.payload.firstname;
            state.username = action.payload.username;
            state.token = action.payload.token;

        },
        logInUser: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.firstname = action.payload.firstname;
            state.likedTweets = action.payload.likedTweets

        },
        logOutUser: (state) => {
            state.token = null;
            state.username = null;
            state.firstname = null;
            state.likedTweets = []

        },
        setLikedTweet: (state, action) => {
            state.likedTweets = action.payload;
        },
        addLikedTweet: (state, action) => {
            state.likedTweets.push(action.payload);
        },
        removeLikedTweet: (state, action) => {
            state.likedTweets = state.likedTweets.filter(id => id !== action.payload)
        },
    },
});

export const { logInUser, logOutUser, signUpUser, setLikedTweet, addLikedTweet, removeLikedTweet } = userSlice.actions;
export default userSlice.reducer;