import { Outlet, useParams } from 'react-router-dom';
import EditorSidebar from './EditorSidebar';
import HomeSidebar from './HomeSidebar.tsx';
import Header from './Header';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client";
import { liveblocksPublicApiKey } from '../misc/utils';

const Root = ({viewMode}: {viewMode?: string}) => {
  return (
    <>
      <LiveBlocksWrapper viewMode={viewMode}>
        <div>
          <Header viewMode={viewMode} />
        </div>
        <div className="flex h-screen bg-gray-50">
          {viewMode === 'editor' ? <EditorSidebar /> : <HomeSidebar />}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </LiveBlocksWrapper>
    </>
  );
};

function LiveBlocksWrapper({ children, viewMode }: { viewMode: string | undefined, children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    return <>{children}</>;
  }

  if (viewMode === 'editor') {
    return (
      <LiveblocksProvider publicApiKey={liveblocksPublicApiKey} throttle={16}>
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
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    </LiveblocksProvider>
    )
  }

  return <>{children}</>;
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading presentation...</p>
      </div>
    </div>
  );
}

export default Root;
