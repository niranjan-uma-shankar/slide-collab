import { useState, useRef } from 'react';
import { useMutation } from "@liveblocks/react/suspense";
import type { TextElement } from '../../types';

function SlideCanvas({elements, currentSlideIndex}: {elements: TextElement[], currentSlideIndex: number}) {
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const [draggedElement, setDraggedElement] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateElement = useMutation(({ storage }, elementId: string, updates: Partial<TextElement>) => {
        const slides = storage.get('slides');
        const slide = slides.get(currentSlideIndex);
        if (!slide) return;
        const elements = slide.get('elements');

        const index = elements.toArray().findIndex((el) => el.get('id') === elementId);
        const element = elements.get(index);
        if (!element) return;
        Object.entries(updates).forEach(([key, value]) => {
            element.set(key as keyof TextElement, value);
        });
    },
    [currentSlideIndex]
  );

    if (elements.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Click "Add Element" to get started
            </div>
        );
    }

    const handleBlur = (e: React.FocusEvent, elementId: string, element: TextElement) => {
    (e.target as HTMLElement).contentEditable = 'false';
    
    if (element.type === 'numbered-list' || element.type === 'bullet-list') {
      // For lists, parse the content back into listItems
      const content = (e.target as HTMLElement).innerText;
      const items = content.split('\n').filter(item => item.trim());
      updateElement(elementId, { listItems: items });
    } else {
      updateElement(elementId, { content: (e.target as HTMLElement).textContent || '' });
    }
  };

   const handleDoubleClick = (e: React.MouseEvent) => {
    (e.target as HTMLElement).contentEditable = 'true';
    (e.target as HTMLElement).focus();
  };

  const handleMouseDown = (e: React.MouseEvent, element: TextElement) => {
    if ((e.target as HTMLElement).contentEditable === 'true') return;

    setSelectedElement(element.id);
    setDraggedElement(element.id);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

    return (
        <div
            ref={canvasRef}
            className="relative bg-white shadow-lg"
            style={{ width: '960px', height: '540px' }}
            onClick={() => setSelectedElement(null)}
        > 
        {elements.map((element) => (
            <div
              key={element.id}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e, element);
              }}
              onDoubleClick={handleDoubleClick}
              onBlur={(e) => handleBlur(e, element.id, element)}
              className={`absolute cursor-move transition-all ${
                selectedElement === element.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                minHeight: `${element.height}px`,
                fontSize: `${element.fontSize}px`,
                color: element.color,
                padding: '8px',
                userSelect: selectedElement === element.id ? 'none' : 'auto',
              }}
            >
              {renderElement(element)}
            </div>
        ))}
        </div>
    )
}

const renderElement = (element: TextElement) => {
    if (element.type === 'numbered-list') {
      return (
        <ol className="list-decimal list-inside">
          {(element.listItems || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    }

    if (element.type === 'bullet-list') {
      return (
        <ul className="list-disc list-inside">
          {(element.listItems || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    return element.content;
  }

  export default SlideCanvas;