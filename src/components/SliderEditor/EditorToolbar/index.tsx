import { TextFormattingTools } from "./TextFormattingTools";
import Undo from "./Undo";
import Redo from "./Redo";
import DeleteElementButton from "./DeleteElementButton";
import ShareButtons from "./ShareButtons";

export default function SlideEditorToolbar({
  currentSlideIndex,
  currentSlideId,
  selectedElement,
  setSelectedElement
}: {
  currentSlideIndex: number,
  currentSlideId: string,
  selectedElement: string | null,
  setSelectedElement: (id: string | null) => void
}) {
    return (
        <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-2">
            <div className="flex-1" />
            <Undo />
            <Redo />
            {currentSlideIndex !== -1 && (
              <>
                <TextFormattingTools currentSlideIndex={currentSlideIndex} />
                <DeleteElementButton
                  currentSlideIndex={currentSlideIndex}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                />
              </>
            )}
            
            <div className="flex-1" />

            {currentSlideIndex !== -1 && <ShareButtons currentSlideId={currentSlideId} />}
      </div>
    );
}