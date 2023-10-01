import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface TileSetMetadata {
  id: string;
  name: string;
  vector_layers: { id: string }[];
}

export const tilesetsState = atom<TileSetMetadata[]>({
  key: "tilesets",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
