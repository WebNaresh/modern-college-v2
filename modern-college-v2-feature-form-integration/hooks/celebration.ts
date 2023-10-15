import { create } from "zustand";

// Define the state type
type Celebration = {
  celebration: boolean;
  setCelebration: (value: boolean) => void;
};

// Create the Zustand store
const useCelebration = create<Celebration>((set) => ({
  celebration: false, // Initial celebration state
  setCelebration: (value) => {
    // Set celebration state to the provided value
    set({ celebration: value });
    // You can also set a timer to stop the confetti after a certain duration
    setTimeout(() => {
      set({ celebration: false });
    }, 5000);
    // Automatically set celebration to false after 2 seconds
  },
}));

export default useCelebration;
