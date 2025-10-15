import { Users } from 'lucide-react';
import { useOthers } from "@liveblocks/react/suspense";

function Header({viewMode}: {viewMode?: string}) {
    return (
        <header className="bg-white shadow">
            <div className="w-full flex items-center py-2 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <a href='/'><h1 className="text-xl font-bold text-gray-900">Slide Editor</h1></a>
                <div className="flex-1" />
                {viewMode === 'editor' && <PresenceIndicator />}
            </div>
        </header>
    );
}

function PresenceIndicator() {
    const others = useOthers();
    
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600 px-3 py-1.5 bg-gray-100 rounded-lg">
            <Users size={18} />
            <span>{others.length} other user(s) online</span>
        </div>
    );
}

export default Header;