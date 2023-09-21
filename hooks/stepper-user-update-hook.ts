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
  checkNextStep: (number: number, data: Session) => void;
};

// Define functions that return JSX elements

const useUpdateUserStore = create<UserTYpe>((set) => ({
  stepper: [
    { step: 1, description: "user-info", icon: "AiOutlineUserIcon" },
    { step: 2, description: "user-details", icon: "BiSolidUserDetailIcon" },
    {
      step: 3,
      description: "user-education",
      icon: "MdOutlineFamilyRestroomIcon",
    },
    {
      step: 4,
      description: "family-details",
      icon: "RiGraduationCapLineIcon",
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
  checkNextStep: (index, data) => {
    switch (index) {
      case 0:
        if (data.user?.image !== null && data.user?.name !== null) {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        } else {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        }
        break;
      case 1:
        if (data.user?.personalInfo !== null) {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        } else {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        }
        break;
      case 2:
        if (data.user?.previousAcademics !== null) {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        } else {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        }
        break;
      case 3:
        if (data.user?.familyDetail !== null) {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        } else {
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = true;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          set((state) => {
            state.loading = false;
            return { ...state };
          });
          return;
        }
        break;
      default:
        set((state) => {
          state.loading = true;
          return { ...state };
        });
        set((state) => {
          state.loading = false;
          return { ...state };
        });
        set((state) => {
          state.loading = true;
          return { ...state };
        });
        set((state) => {
          state.loading = false;
          return { ...state };
        });
        set((state) => {
          state.loading = true;
          return { ...state };
        });
        set((state) => {
          state.loading = false;
          return { ...state };
        });
        set((state) => {
          state.loading = true;
          return { ...state };
        });
        set((state) => {
          state.loading = false;
          return { ...state };
        });
        set((state) => {
          state.loading = false;
          return { ...state };
        });
        return;
    }
  },
}));

export default useUpdateUserStore;
