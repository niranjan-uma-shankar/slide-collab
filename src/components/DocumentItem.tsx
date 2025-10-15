import type { Document } from '../types';
import { FileText, Clock } from 'lucide-react';
import { formatDate } from '../misc/utils';
import { useNavigate } from 'react-router-dom';

export default function DocumentItem({doc}: {doc: Document}) {
  const navigate = useNavigate();
    const handleDocumentClick = (slug: string) => {
        navigate(`/slides/${slug}`);
    };

    return (
        <div
            key={doc.id}
            onClick={() => handleDocumentClick(doc.id)}
            className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center border-b border-gray-200">
            <FileText className="w-16 h-16 text-blue-600" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 truncate">{doc.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                <Clock size={14} />
                {formatDate(doc.createdAt)}
              </span>
            </div>
          </div>
        </div>
    )
}
