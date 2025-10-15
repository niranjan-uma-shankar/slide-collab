import { useState } from 'react';
import { useStorage } from "@liveblocks/react/suspense";
import SlideEditorToolbar from './EditorToolbar/index.tsx';
import SlideCanvas from './SlideCanvas';
import { useParams, useSearchParams } from 'react-router-dom';

function SlideEditor() {
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const { slideId } = useParams<{ slideId: string }>();
    const [searchParams] = useSearchParams();
    const slides = useStorage((root) => root.slides);

    const slideIndex = slideId 
    ? slides.findIndex((s) => s.id === slideId)
    : 0;

    if (slideId && slideIndex === -1) {
      if ( searchParams.get('share') ) {
        return <EmptyState content="Slide not found" />;
      }

      return null;
    }

    const currentSlide = slides[slideIndex];

    if ( !currentSlide ) {
        return <EmptyState content="Add a slide from the sidebar" />;
    }

    return (
        <>
            <SlideEditorToolbar
              currentSlideIndex={slideIndex}
              currentSlideId={currentSlide.id}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
            />
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-gray-50">
                <SlideCanvas
                  elements={Array.from(currentSlide.elements)}
                  currentSlideIndex={slideIndex}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                />
            </div>
        </>
    );
}

function EmptyState({content}:{content: string}) {
  return (
    <>
      <SlideEditorToolbar
              currentSlideIndex={-1}
              currentSlideId={''}
              selectedElement={null}
              setSelectedElement={() => null}
            />
    <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-gray-50">
        {content}
    </div>
    </>
  );
}

export default SlideEditor;