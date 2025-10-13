 import { useState, useRef } from 'react';
 import { ChevronDown } from 'lucide-react';
import { getElementDefaults, getTextFormattingOptions } from '../../misc/utils';
import {useMutation} from "@liveblocks/react/suspense";
import type { ElementType, TextElement } from '../../types';
import { nanoid } from 'nanoid';
import type { LiveObject } from '@liveblocks/client';

 export function TextFormattingTools({currentSlideIndex}: {currentSlideIndex: number}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const handleClick = () => setShowDropdown(!showDropdown);

    return (
        <div className="relative" ref={dropdownRef}>
            <AddElementButton handleClick={handleClick} />
            {showDropdown && <ElementDropdown currentSlideIndex={currentSlideIndex} setShowDropdown={setShowDropdown} />}
        </div>
    );
 }

 function AddElementButton({ handleClick }: { handleClick: () => void }) {
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            onClick={handleClick}
        >
            <span>Add Element</span>
            <ChevronDown size={18} />
        </button>
    );
 }

 function ElementDropdown({currentSlideIndex, setShowDropdown}: {currentSlideIndex: number, setShowDropdown: (show: boolean) => void}) {
    const elementOptions = getTextFormattingOptions();
    const addElement = useMutation( ({ storage }, elementType: ElementType) => {
        const slides = storage.get('slides');
        const slide = slides.get(currentSlideIndex);
        if (!slide) return; // Guard against invalid index
        const elements = slide.get('elements');

        const defaults = getElementDefaults(elementType);
        const newElement: LiveObject<TextElement> = {
            id: `element-${nanoid(8)}`,
            type: elementType,
            x: 100 + Math.random() * 100,
            y: 100 + Math.random() * 100,
            color: '#000000',
            ...defaults,
        };

      elements.push(newElement);
      setShowDropdown(false);
    },
    [currentSlideIndex]
  );
    
    return (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {elementOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => addElement(option.type)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option.label}
                </button>
              ))}
        </div>
    );
}