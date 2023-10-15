import { create } from "zustand";

// Define the state type
type LoadingTypes = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  onceTime: () => void;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
};

const useLoader = create<LoadingTypes>((set) => ({
  loading: false,
  setLoading: (value) => {
    set({ loading: value });
  },
  setLoadingTrue: () => {
    set({ loading: true });
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
  setLoadingFalse: () => {
    set({ loading: false });
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
  onceTime: () => {
    set({ loading: true });

    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
}));

export default useLoader;
