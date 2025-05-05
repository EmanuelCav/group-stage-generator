import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IResponseStore } from "@/interface/Response";

export const responseStore = create(
    persist<IResponseStore>(
        (set) => ({
            isLoading: false,
            handleLoading: (data: boolean) => set(() => ({
                isLoading: data
            })),
        }),
        {
            // name: `${RESPONSE_STORAGE}`
            name: `group_stage_response_generator_storage`
        }
    )
)