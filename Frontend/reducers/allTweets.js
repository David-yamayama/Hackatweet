import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tweets: []
}

export const allTweetsSlice = createSlice({
    name: 'allTweets',
    initialState,
    reducers: {
        setAllTweets: (state, action) => {
            state.tweets = action.payload
        },
        addTweet: (state, action) => {
            state.tweets.push(action.payload)
        },
        deleteTweet: (state, action) => {
            state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload)
        },

    },
});

export const { setAllTweets, addTweet, deleteTweet } = allTweetsSlice.actions;
export default allTweetsSlice.reducer;