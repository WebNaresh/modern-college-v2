import { Session } from "next-auth";
import { create } from "zustand";

// Define the state type
type UserObject = {
  step: number;
  description: string;
  icon: string;
};

type UserTYpe = {
  stepper: UserObject[];
  loading: boolean;
  index: number;
  nextStep: () => void;
  prevStep: () => void;
  setIndex: (newIndex: number) => void;
  makeIndex: (data: Session) => number;
};

// Define functions that return JSX elements

const useUpdateUserStore = create<UserTYpe>((set) => ({
  stepper: [
    { step: 1, description: "user-info", icon: "AiOutlineUserIcon" },
    { step: 2, description: "user-details", icon: "BiSolidUserDetailIcon" },
    {
      step: 3,
      description: "family-details",
      icon: "RiGraduationCapLineIcon",
    },
    {
      step: 4,
      description: "user-education",
      icon: "MdOutlineFamilyRestroomIcon",
    },
  ],
  loading: false,
  index: 0,
  nextStep: () => {
    set((state) => {
      // Find the index of the last occurrence of an active step
      if (state.index < 3) {
        state.index++;
      }
      return { ...state };
    });
  },
  prevStep: () => {
    set((state) => {
      // Find the index of the last occurrence of an active step
      if (state.index > 0) {
        state.index--;
      }
      return { ...state };
    });
  },
  setIndex: (newIndex) => {
    set((state) => {
      state.index = newIndex;
      return { ...state };
    });
  },
  makeIndex: (data) => {
    if (data.user?.personalInfo === null || undefined) {
      return 1;
    } else if (data.user?.familyDetail?.length! < 2) {
      return 2;
    } else if (data.user?.previousAcademics?.length! < 2) {
      return 3;
    } else {
      return 0;
    }
  },
}));

export default useUpdateUserStore;
