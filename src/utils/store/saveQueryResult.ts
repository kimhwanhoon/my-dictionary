import { create } from "zustand";

interface queryResultState {
  queryResult: string[];
  setQueryResult: (result: string[]) => void;
}

const saveQueryResult = create<queryResultState>((set) => ({
  queryResult: [],
  setQueryResult: (result: string[]) => set({ queryResult: result }),
}));

export default saveQueryResult;
