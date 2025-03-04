import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: {},
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      // Expecting payload: { id, name, topicId, cardIds }
      const { id, name, topicId, cardIds } = action.payload;
      // Add the new quiz to the state keyed by its id
      state.quizzes[id] = { id, name, topicId, cardIds };
    },
  },
});


// Selector to get all quizzes from state
export const selectQuizzes = (state) => state.quizzes.quizzes;

// Export the addQuiz action
export const { addQuiz } = quizzesSlice.actions;

export default quizzesSlice.reducer;
