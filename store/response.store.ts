import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IResponseStore } from "@/interface/Response";

export const responseStore = create(
  persist<IResponseStore>(
    (set) => ({
      isLoading: false,
      handleLoading: (data: boolean) =>
        set(() => ({
          isLoading: data,
        })),
    }),
    {
      name: "group_stage_response_generator_storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
