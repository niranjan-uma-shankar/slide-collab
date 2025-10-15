import { useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '@liveblocks/react/suspense'

const SidebarSlidesPreview = () => {
    const navigate = useNavigate();
    const slides = useStorage((root) => root.slides);
    const { slug, slideId } = useParams<{ slug: string; slideId?: string }>();

    const currentSlideIndex = slideId 
        ? slides.findIndex((s) => s.id === slideId)
        : 0;

    const handleSlideSelect = (index: number) => {
        const slide = slides[index];
        navigate(`/slides/${slug}/${slide.id}`);
    };

    if (slides.length === 0) {
        return <div className="text-gray-500 text-sm">No slides available</div>;
    }

    return (
        slides.map((slide, index) => {
            return (
                <div
                key={slide.id}
                onClick={() => handleSlideSelect(index)}
                className={`mb-3 p-3 border-2 rounded cursor-pointer transition-all ${
                    index === currentSlideIndex
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                >
                    <div className="text-xs text-gray-500 mb-1">Slide {index + 1}</div>
                    <div className="bg-white border border-gray-200 rounded aspect-video flex items-center justify-center text-xs text-gray-400">
                        {slide.elements.length} elements
                    </div>
                </div>
            );
        })
    );
}

export default SidebarSlidesPreview;
    