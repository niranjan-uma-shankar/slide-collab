import { LiveList, LiveObject } from "@liveblocks/client";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: 'pk_dev_qF2YJqZ2-Ki4DHd2eNdPJTKY9ykROvD6BJHAM55I2XYs04tT9wxlJ_Mski224pf8',
});

// Define types for your collaborative data
export type TextElement = {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
};

export type Slide = {
  id: string;
  elements: LiveList<TextElement>;
};

// Presence represents the properties that exist on every user in the Room
type Presence = {
  cursor: { x: number; y: number } | null;
};

// Storage represents the shared document that persists in the Room
type Storage = {
  slides: LiveList<LiveObject<Slide>>;
};

// UserMeta represents static/readonly metadata on each user
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    color?: string;
  };
};

// Export typed hooks from Liveblocks
export const {
  suspense: {
    RoomProvider,
    useStorage,
    useMutation,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useOthers,
    useSelf,
  },
} = createRoomContext<Presence, Storage, UserMeta>(client);