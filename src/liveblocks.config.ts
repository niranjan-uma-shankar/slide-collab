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
// const client = createClient({
//   publicApiKey: 'pk_dev_qF2YJqZ2-Ki4DHd2eNdPJTKY9ykROvD6BJHAM55I2XYs04tT9wxlJ_Mski224pf8',
// });

// Define types for your collaborative data
// export type TextElement = {
//   id: string;
//   type: "text";
//   content: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   fontSize: number;
//   color: string;
// };

// export type Slide = {
//   id: string;
//   elements: LiveList<TextElement>;
// };


// // UserMeta represents static/readonly metadata on each user
// type UserMeta = {
//   id?: string;
//   info?: {
//     name?: string;
//     color?: string;
//   };
// };

// Export typed hooks from Liveblocks
// export const {
//   suspense: {
//     ClientSideSuspense,
//     RoomProvider,
//     useStorage,
//     useMutation,
//     useUndo,
//     useRedo,
//     useCanUndo,
//     useCanRedo,
//     useOthers,
//     useSelf,
//   },
// } = createRoomContext<Presence, Storage, UserMeta>(client);