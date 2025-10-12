import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import EmptyHome from '../components/EmptyHome';
import type { Document } from '../types';
import AllDocumentsList from '../components/AllDocumentsList';

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

  const handleDocumentClick = (slug: string) => {
    navigate(`/slides/${slug}`);
  };

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Decks</h1>

        {documents.length === 0 ? 
            <EmptyHome handleCreateDocument={createNewDocument} /> :
            <AllDocumentsList documents={documents} handleDocumentClick={handleDocumentClick} />   
        }
      </div>
    </main>
  );
}