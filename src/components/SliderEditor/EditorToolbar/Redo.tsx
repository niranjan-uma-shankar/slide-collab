import { Redo2 } from 'lucide-react';
import { useCanRedo, useRedo } from "@liveblocks/react";

const Redo = () => {
    const redo = useRedo();
    const canRedo = useCanRedo();

    return (
    <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Redo"
            >
                <Redo2 size={18} />
            </button>
    );
};

export default Redo;