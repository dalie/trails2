import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type BaseLayer = "quebec" | "ontario" | "satellite" | "streets";

const { persistAtom } = recoilPersist();

export const baseLayerState = atom<BaseLayer>({
  key: "baseLayer",
  default: "satellite",
  effects_UNSTABLE: [persistAtom],
});
