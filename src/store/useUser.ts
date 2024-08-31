import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

interface UseUser {
  access: string | null;
  setAccess: (access: string) => void;
  removeAccess: () => void;
}

type UserPersist = (
  config: StateCreator<UseUser>,
  options: PersistOptions<UseUser>
) => StateCreator<UseUser>;

export const useUser = create<UseUser>(
  (persist as UserPersist)(
    (set) => ({
      access: null,
      setAccess: (access) => set({ access }),
      removeAccess: () => set({ access: null }),
    }),
    {
      name: "hito",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UseDetail {
  value: string;
  key: string;
  setValue: (val: string) => void;
  setKey: (key: string) => void;
}

export const useDetail = create<UseDetail>((set) => ({
  value: "",
  setValue(val) {
    set({ value: val });
  },
  key: "",
  setKey: (key) => set({ key }),
}));
