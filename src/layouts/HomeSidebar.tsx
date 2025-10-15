import { Home } from 'lucide-react';

export default function HomeSidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
          <Home size={20} />
          <span className="font-medium">Home</span>
        </div>
      </div>
    </div>
  );
}