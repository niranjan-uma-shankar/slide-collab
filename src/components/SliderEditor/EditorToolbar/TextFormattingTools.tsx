 import { useEffect, useState, useRef } from 'react';
 import { ChevronDown } from 'lucide-react';
import { getElementDefaults, getTextFormattingOptions } from '../../../misc/utils';
import {useMutation} from "@liveblocks/react/suspense";
import type { ElementType } from '../../../types';
import { nanoid } from 'nanoid';
import { LiveObject } from '@liveblocks/client';

 export function TextFormattingTools({currentSlideIndex}: {currentSlideIndex: number}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: PointerEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };

      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, []);
    
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
            className="text-base px-4 py-1 bg-gray-100 text-black rounded hover:bg-gray-300 flex items-center gap-2 cursor-pointer"
            onClick={handleClick}
        >
            <span>+ Insert</span>
            <ChevronDown size={16} />
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
        const newElement = new LiveObject({
            id: `element-${nanoid(8)}`,
            type: elementType,
            x: 100 + Math.random() * 100,
            y: 100 + Math.random() * 100,
            color: '#000000',
            ...defaults,
        });

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
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors cursor-pointer"
                >
                  {option.label}
                </button>
              ))}
        </div>
    );
}