import { LiveList, LiveObject } from "@liveblocks/client";
import type {Slide} from './types/index.ts';


declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
    },
    Storage: {
      slides: LiveList<LiveObject<Slide>>;
    }
  }
}

export {};
