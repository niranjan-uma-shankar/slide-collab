import { useState } from 'react';
import { useStorage } from "@liveblocks/react/suspense";
import { SlideEditorToolbar } from './SlideEditorToolbar';
import SlideCanvas from './SlideCanvas';

function SlideEditor() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const slides = useStorage((root) => root.slides);
    const currentSlide = slides[currentSlideIndex];
    return (
        <>
            <SlideEditorToolbar currentSlideIndex={currentSlideIndex} />
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-gray-50">
                <SlideCanvas elements={Array.from(currentSlide.elements)} currentSlideIndex={currentSlideIndex} />
            </div>
        </>
    );
}

export default SlideEditor;