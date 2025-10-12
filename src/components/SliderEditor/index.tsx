import { useState, useRef } from 'react';
import { useStorage } from "@liveblocks/react/suspense";
import { SlideEditorToolbar } from './SlideEditorToolbar';

function SlideEditor() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const canvasRef = useRef<HTMLDivElement>(null);
    const slides = useStorage((root) => root.slides);
    const currentSlide = slides[currentSlideIndex];
    return (
        <>
            <SlideEditorToolbar currentSlideIndex={currentSlideIndex} />
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-gray-50">
                <div
                    ref={canvasRef}
                    className="relative bg-white shadow-lg"
                    style={{ width: '960px', height: '540px' }}
                    // onClick={() => setSelectedElement(null)}
                >
                    {currentSlide.elements.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Click "Add Element" to get started
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SlideEditor;