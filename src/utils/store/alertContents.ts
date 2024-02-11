import { create } from "zustand";

interface AlertState {
  alertKey: string;
  title: string;
  body: string;
  setAlertProps: (alertKey: string, title: string, body: string) => void;
}

const useAlertContents = create<AlertState>((set) => ({
  alertKey: "",
  title: "",
  body: "",
  setAlertProps: (alertKey: string, title: string, body: string) =>
    set((state) => ({ ...state, alertKey, title, body })),
}));

export default useAlertContents;
