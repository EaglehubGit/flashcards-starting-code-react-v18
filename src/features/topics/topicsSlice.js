import { createSlice } from '@reduxjs/toolkit';

// Initial state with an empty topics object
const initialState = {
  topics: {}
};

// Create a slice for topics
const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // Reducer to add a new topic
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      // Add the new topic with an empty quizIds array
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: []
      };
    }
  }
});

// Selector to get topics from the state
export const selectTopics = (state) => state.topics.topics;

// Export the action creator and reducer
export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
