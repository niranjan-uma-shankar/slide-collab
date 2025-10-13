import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import type { Document } from '../types';
import { Plus, FileText } from 'lucide-react';
import DocumentItem from '../components/DocumentItem';

export default function HomePage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load documents from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('documents');
    if (stored) {
      setDocuments(JSON.parse(stored));
    }
  }, []);

  const createNewDocument = () => {
    const slug = nanoid(12);
    const newDoc: Document = {
      id: slug,
      name: `Untitled Presentation ${documents.length + 1}`,
      createdAt: new Date().toISOString(),
    };

    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));

    navigate(`/slides/${slug}`);
  };

//   // Expose createNewDocument to parent via custom event
//   useEffect(() => {
//     const handleCreate = () => createNewDocument();
//     window.addEventListener('createNewDocument', handleCreate);
//     return () => window.removeEventListener('createNewDocument', handleCreate);
//   }, [documents]);

  

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Decks</h1>

        {documents.length === 0 ? 
            <EmptyHome handleCreateDocument={createNewDocument} /> :
            <AllDocumentsList documents={documents} />   
        }
      </div>
    </main>
  );
}

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
}

function AllDocumentsList({documents}: {documents: Document[]}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
            ))}
        </div>
    );
}
