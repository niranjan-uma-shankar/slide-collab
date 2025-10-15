import { Undo2 } from 'lucide-react';
import { useCanUndo, useUndo } from "@liveblocks/react";

const Undo = () => {
    const undo = useUndo();
    const canUndo = useCanUndo();

    return (
    <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Undo"
            >
                <Undo2 size={18} />
            </button>
    );
};

export default Undo;