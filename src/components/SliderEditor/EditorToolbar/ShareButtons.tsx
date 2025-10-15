import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ShareButtons = ({currentSlideId} : {currentSlideId: string}) => {
    const [copied, setCopied] = useState(false);
    const [shareMode, setShareMode] = useState<'all' | 'single'>('all');
    const { slug } = useParams<{ slug: string }>();
    const copyShareLink = (mode: 'all' | 'single') => {
        const baseUrl = window.location.origin;
        const link =
            mode === 'single'
            ? `${baseUrl}/slides/${slug}/${currentSlideId}/?share=true`
            : `${baseUrl}/slides/${slug}/?share=true`;

        navigator.clipboard.writeText(link);
        setShareMode(mode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
  };

    return (
        <>
            <button
            onClick={() => copyShareLink('all')}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 text-sm cursor-pointer"
            >
                {copied && shareMode === 'all' ? <Check size={16} /> : <Copy size={16} />}
                Share All
            </button>
            <button
            onClick={() => copyShareLink('single')}
            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2 text-sm cursor-pointer"
            >
                {copied && shareMode === 'single' ? <Check size={16} /> : <Copy size={16} />}
                Share Slide
            </button>
        </>
    );
}

export default ShareButtons;