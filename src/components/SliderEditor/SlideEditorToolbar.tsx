import { TextFormattingTools } from "./TextFormattingTools";

export function SlideEditorToolbar({currentSlideIndex}: {currentSlideIndex: number}) {
    return (
        <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-2">
            <TextFormattingTools currentSlideIndex={currentSlideIndex} />
        </div>
    );
}