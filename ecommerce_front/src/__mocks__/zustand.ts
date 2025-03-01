import { create as zustandCreate, StateCreator } from 'zustand';

const storeResetFns = new Set<() => void>();

const create = <T>(stateCreator: StateCreator<T>) => {
  const store = zustandCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

beforeEach(() => {
  storeResetFns.forEach((resetFn) => resetFn());
});

export default create;
