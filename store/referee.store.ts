import { create } from "zustand";

import { IReferee, IRefereeStore } from "@/interface/Referee";

export const refereeStore = create<IRefereeStore>(
  (set) => ({
    referee: {},
    isSure: false,
    showForm: false,
    hideAndShowAddReferee: (show: boolean) =>
      set(() => ({
        showForm: show,
      })),
    sureRemoveReferee: (sure: boolean) =>
      set(() => ({
        isSure: sure,
      })),
    getReferee: (data: IReferee) =>
      set(() => ({
        referee: data,
      })),
  })
);
