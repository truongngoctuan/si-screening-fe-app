import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ButtonType } from '../../typings';
import { getNextStates } from './gameAPI';

export interface ButtonsState {
  currentStep: ButtonType;
  histories: ButtonType[];
  availableSteps: ButtonType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ButtonsState = {
  currentStep: 'blue',
  histories: [],
  availableSteps: [],
  status: 'idle',
};

export const getAvailableStatesAsync = createAsyncThunk(
  'counter/selectStateWithEligibleNextStates',
  async (step: ButtonType) => {
    const response = await getNextStates(step);
    // The value we return becomes the `fulfilled` action payload
    return {
      availableSteps: response.data
    }
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectState: (state, action: PayloadAction<ButtonType>) => {
      state.histories = state.histories.length > 0 ?
        [state.histories[state.histories.length - 1], state.currentStep] :
        [state.currentStep];
      state.currentStep = action.payload;
    },
    reset: (state) => {
      state.currentStep = initialState.currentStep;
      state.histories = [];
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableStatesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAvailableStatesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.availableSteps = action.payload.availableSteps;
      });
  },
});

export const { selectState, reset } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrentStep = (state: RootState) => state.game.currentStep;
export const selectAvailableSteps = (state: RootState) => state.game.availableSteps;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
