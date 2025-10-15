import { Trash2 } from "lucide-react";
import { useMutation } from "@liveblocks/react/suspense";

const DeleteElementButton = ({
    currentSlideIndex,
    selectedElement,
    setSelectedElement
}:
{
    currentSlideIndex: number,
    selectedElement: string | null,
    setSelectedElement: (id: string | null) => void
}) => {
    const deleteElement = useMutation(
        ({ storage }, elementId: string | null) => {
            const slides = storage.get('slides');
            const slide = slides.get(currentSlideIndex);
            if (!slide || !elementId) return;
            const elements = slide.get('elements');

            const index = elements.toArray().findIndex((el) => el.get('id') === elementId);
            if (index !== -1) {
                elements.delete(index);
            }
            setSelectedElement(null);
        },
    [currentSlideIndex]
    );

    return (
        <button
            onClick={() => deleteElement(selectedElement)}
            className="p-2 hover:bg-red-100 text-red-600 rounded ml-2"
            title="Delete Element"
            style={{visibility: selectedElement ? 'visible' : 'hidden'}}
        >
            <Trash2 size={20} />
        </button>
    )            
}

export default DeleteElementButton;