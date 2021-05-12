import initialState from '../features/counter/counterSlice';
const createStore = initialValue => {
  let currentState = initialValue;
  let listener;
  const store = {
    getState: () => currentState,
    subscribe: notifyListeners => {
      listener = notifyListeners;
      return function unsubscribe() {
        listener = undefined;
      };
    },
    dispatch: modifier => {
      currentState = modifier(currentState);
      listener && listener();
    },
  };
  return store;
};

export default createStore(initialState);
