import DocumentItem from './DocumentItem';
import type { Document } from '../types';

function AllDocumentsList({documents, handleDocumentClick}: {documents: Document[], handleDocumentClick: (id: string) => void}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
                <DocumentItem key={doc.id} doc={doc} handleDocumentClick={handleDocumentClick} />
            ))}
        </div>
    );
}
export default AllDocumentsList;        