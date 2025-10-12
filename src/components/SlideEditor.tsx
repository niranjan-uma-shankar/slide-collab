import { useOthers } from "@liveblocks/react/suspense";

function SlideEditor() {
    const others = useOthers();
    const userCount = others.length;

    return <div>There are {userCount} other user(s) online</div>;
}

export default SlideEditor;