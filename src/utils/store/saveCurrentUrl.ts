import { create } from "zustand";

interface currentUrlState {
  currentUrl: string | null;
  setCurrentUrl: (currentUrl: string | null) => void;
}

const useCurrentUrl = create<currentUrlState>((set) => ({
  currentUrl: null,
  setCurrentUrl: (currentUrl: string | null) => set({ currentUrl }),
}));

export default useCurrentUrl;
