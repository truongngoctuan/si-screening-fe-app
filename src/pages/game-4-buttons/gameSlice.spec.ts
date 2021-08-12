import gameReducer, {
  ButtonsState, reset, selectState,
} from './gameSlice';

describe('game state reducer', () => {
  const initialState: ButtonsState = {
    currentStep: 'blue',
    histories: [],
    availableSteps: [],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      availableSteps: [],
      currentStep: "blue",
      histories: [],
      status: 'idle'
    });
  });

  it('should handle select state', () => {
    const actual = gameReducer(initialState, selectState("green"));
    expect(actual.currentStep).toEqual("green");
    expect(actual.histories.length).toEqual(1);
    expect(actual.histories[0]).toEqual("blue");
  });

  it('should handle reset', () => {
    const actual = gameReducer(initialState, reset());
    expect(actual.currentStep).toEqual("blue");
    expect(actual.histories.length).toEqual(0);
  });

});
