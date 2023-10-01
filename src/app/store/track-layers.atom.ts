import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";



const { persistAtom } = recoilPersist();

export const trackLayersState = atom<string[]>({
  key: "trackLayers",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
