import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: {} // This object will hold all cards keyed by their id
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { id, front, back } = action.payload;
      state.cards[id] = { id, front, back };
    }
  }
});

// Selector that returns a card with the given id
export const selectCardById = (state, cardId) => state.cards.cards[cardId];

export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;
