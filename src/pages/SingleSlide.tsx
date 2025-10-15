import { useParams } from 'react-router-dom';
import SlideEditor from '../components/SliderEditor';

export default function SingleSlidePage() {
  const { slideId } = useParams<{ slideId: string }>();

  if (!slideId) return <div>Invalid URL</div>;

  return <SlideEditor />;
}