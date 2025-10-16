import { ChevronLeft, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@liveblocks/react/suspense'
import { nanoid } from 'nanoid';
import { LiveList, LiveObject } from '@liveblocks/client';
import SidebarSlidesPreview from '../components/SidebarSlidesPreview';
import { useEffect, useState } from 'react';

export default function EditorSidebar() {
  const navigate = useNavigate();
  const { slug, slideId } = useParams<{ slug: string; slideId?: string }>();
  const [isSidebarSlideFocused, setIsSidebarSlideFocused] = useState(false);
  const addSlide = useMutation(({ storage }) => {
    const slides = storage.get('slides');
    const newSlide = new LiveObject({
        id: `slide-${nanoid(8)}`,
        elements: new LiveList([])
    });
    slides.push(newSlide);
  }, []);
  const deleteSlide = useMutation(
    ({ storage }, slug, slideId) => {
      const slides = storage.get('slides');

      const indexToDelete = !slideId ? 0 : slides.findIndex((s) => s.get('id') === slideId);
      if (indexToDelete === -1) return;
      slides.delete(indexToDelete);
      
      // Navigate to previous slide or first slide
      const newIndex = Math.max(0, indexToDelete - 1);
      const newSlide = slides.get(newIndex);
      const newSlideId = newSlide ? newSlide.get('id') : null;
      
      if (newSlide) {
        navigate(`/slides/${slug}/${newSlideId}`, { replace: true });
      } else {
        navigate(`/slides/${slug}`, { replace: true });
      }
    },
    [slug, slideId, navigate]
  );
  // Listen for Delete key to delete current slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key);
      if (e.key === 'Delete' || e.key === 'Backspace') {
        console.log('isslidebarfocused', isSidebarSlideFocused);
        if ( !isSidebarSlideFocused ) {
          return;
        }
        
        e.preventDefault();
        deleteSlide(slug, slideId);
        setIsSidebarSlideFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSlide, isSidebarSlideFocused, slideId, slug]);

  const handleSlideFocus = () => {
    console.log('Sidebar slide focused');
    setIsSidebarSlideFocused(true);
  }

  const handleSlideBlur = () => {
    console.log('Sidebar slide blurred');
    setIsSidebarSlideFocused(false);
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-600">Slides</h2>
          <button
            onClick={addSlide}
            className="p-1 hover:bg-gray-100 rounded cursor-pointer"
            title="Add Slide"
          >
            <Plus size={16} />
          </button>
        </div>
        <SidebarSlidesPreview handleSlideFocus={handleSlideFocus} handleSlideBlur={handleSlideBlur} />
      </div>
    </div>
  );
}