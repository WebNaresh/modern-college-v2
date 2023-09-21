import { create } from "zustand";

// Define the state type
type BearStore = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  onceTime: () => void;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
};

// Create the Zustand store
const useStore = create<BearStore>((set) => ({
  loading: true, // Initial loading state
  setLoading: (value) => {
    // Set loading state to the provided value
    set({ loading: value });

    // Automatically set loading to false after 2 seconds
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
  setLoadingTrue: () => {
    set({ loading: true });
  },
  setLoadingFalse: () => {
    set({ loading: false });
  },
  onceTime: () => {
    // Set loading state to the provided value
    set({ loading: true });

    // Automatically set loading to false after 2 seconds
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
}));

export default useStore;
