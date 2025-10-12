import { useParams } from 'react-router-dom';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client";
import SlideEditor from '../components/SliderEditor/index.tsx';
import { liveblocksPublicApiKey } from '../misc/utils';

export default function AllSlidesPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <div>Invalid URL</div>;

  return (
    <LiveblocksProvider publicApiKey={liveblocksPublicApiKey}>
        <RoomProvider
            id={slug}
            initialPresence={{ cursor: null }}
            initialStorage={{
                slides: new LiveList([
                    new LiveObject({ id: 'slide-1', elements: new LiveList([]) }),
                ]),
            }}
        >
            <ClientSideSuspense fallback={<LoadingScreen />}>
                <SlideEditor />
            </ClientSideSuspense>
        </RoomProvider>
    </LiveblocksProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading presentation...</p>
      </div>
    </div>
  );
}