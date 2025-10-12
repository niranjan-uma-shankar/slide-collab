import { Plus, FileText } from 'lucide-react';
function EmptyHome ({handleCreateDocument} : {handleCreateDocument: () => void}) {
    return (
        <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Start creating content</h2>
            <button
              onClick={handleCreateDocument}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Create New Presentation
            </button>
          </div>
    );
};

export default EmptyHome;