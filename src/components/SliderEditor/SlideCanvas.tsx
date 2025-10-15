import { useCallback, useState, useRef } from 'react';
import { useHistory, useMutation } from "@liveblocks/react/suspense";
import type { TextElement } from '../../types';

function SlideCanvas({
    elements,
    currentSlideIndex,
    selectedElement,
    setSelectedElement
}: {
    elements: TextElement[];
    currentSlideIndex: number;
    selectedElement: string | null;
    setSelectedElement: (id: string | null) => void;
}) {
    const { resume, pause } = useHistory();
    const [draggedElement, setDraggedElement] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [innerHTMLBeforeEdit, setInnerHTMLBeforeEdit] = useState<string>('');
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateElement = useMutation(({ storage }, elementId: string, updates: Partial<TextElement>) => {
            const slides = storage.get('slides');
            const slide = slides.get(currentSlideIndex);
            if (!slide) return;
            const elements = slide.get('elements');

            const index = elements.findIndex((el) => el.get('id') === elementId);
            const element = elements.get(index);
            if (!element) return;
            Object.entries(updates).forEach(([key, value]) => {
                element.set(key as keyof TextElement, value);
            });
        },
    [currentSlideIndex]
    );

    const handleCanvasPointerMove = useCallback((e: React.PointerEvent) => {
        if (!draggedElement || !canvasRef.current) return;

        const canvas = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - canvas.left - dragOffset.x;
        const newY = e.clientY - canvas.top - dragOffset.y;

        updateElement(draggedElement, {
            x: Math.max(0, Math.min(newX, canvas.width - 200)),
            y: Math.max(0, Math.min(newY, canvas.height - 50)),
        });
    }, [draggedElement, dragOffset, updateElement]);

    const handleCanvasPointerUp = () => {
        setDraggedElement(null);
        resume();
    };

    const handleBlur = (e: React.FocusEvent, elementId: string, element: TextElement) => {
  const target = e.target as HTMLElement;
  target.contentEditable = 'false';
  
  if (element.type === 'numbered-list' || element.type === 'bullet-list') {
    // Parse only the <li> elements from the list
    const items = Array.from(target.querySelectorAll('li'))
      .map(li => li.textContent?.trim() || '')
      .filter(item => item.length > 0);
    // target.innerHTML = innerHTMLBeforeEdit;
    updateElement(elementId, { listItems: items });
  } else {
    //  e.currentTarget.innerHTML = innerHTMLBeforeEdit;
    updateElement(elementId, { content: target.textContent || '' });
  }
};

   const handleDoubleClick = (e: React.MouseEvent, element: TextElement) => {
  e.stopPropagation();
  const wrapper = e.currentTarget as HTMLElement;
  
  if (element.type === 'numbered-list' || element.type === 'bullet-list') {
    // For lists, make the <ol> or <ul> editable, not the wrapper
    const listElement = wrapper.querySelector('ol, ul') as HTMLElement;
    if (listElement) {
      listElement.contentEditable = 'true';
      listElement.focus();
    }
  } else {
    // For text elements, make wrapper editable
    wrapper.contentEditable = 'true';
    wrapper.focus();
  }
  setInnerHTMLBeforeEdit(wrapper.innerHTML);
};

  const handlePointerDown = (e: React.MouseEvent, element: TextElement) => {
    if ((e.currentTarget as HTMLElement).contentEditable === 'true') return;
      pause();
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
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={handleCanvasPointerUp}
        > 
        {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Click "Insert" to get started
            </div>
        )}
        {elements.map((element) => (
            <div
              key={element.id}
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown(e, element);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element.id);
              }}
              onDoubleClick={(e) => handleDoubleClick(e, element)}
              onBlur={(e) => handleBlur(e, element.id, element)}
              className={`editable-element absolute cursor-move transition-all ${
                selectedElement === element.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
              style={{
                transform: `translate(${element.x}px, ${element.y}px)`,
                transition: draggedElement === element.id ? 'none' : undefined,
                zIndex: draggedElement === element.id ? 1: 0,
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
      // console.log('Rendering SlideCanvas with element and length:' + (element.listItems || []).length);
    // console.log(element);
      return (
        <ol className="list-decimal list-inside" key={element.listItems?.join(',')}>
          {(element.listItems || []).map((item, idx) => {
            console.log('Rendering list item:', item);
            return <li key={idx}>{item}</li>;
          }
        )}
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