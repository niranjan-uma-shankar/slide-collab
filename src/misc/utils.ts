import type { ElementType } from "../types";

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  export const liveblocksPublicApiKey = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY || '';

  export const getTextFormattingOptions = () => {
    const elementOptions: { type: ElementType; label: string }[] = [
      { type: 'paragraph', label: 'Paragraph' },
      { type: 'heading1', label: 'Heading 1' },
      { type: 'heading2', label: 'Heading 2' },
      { type: 'heading3', label: 'Heading 3' },
      { type: 'numbered-list', label: 'Numbered List' },
      { type: 'bullet-list', label: 'Bullet List' },
    ];
    return elementOptions;
  }

  export const getElementDefaults = (type: ElementType) => {
    switch (type) {
      case 'heading1':
        return { content: 'Heading 1', fontSize: 48, width: 400, height: 60 };
      case 'heading2':
        return { content: 'Heading 2', fontSize: 36, width: 350, height: 50 };
      case 'heading3':
        return { content: 'Heading 3', fontSize: 28, width: 300, height: 40 };
      case 'paragraph':
        return { content: 'Double click to edit', fontSize: 18, width: 400, height: 100 };
      case 'numbered-list':
        return { 
          content: '', 
          fontSize: 18, 
          width: 400, 
          height: 120,
          listItems: ['First item', 'Second item', 'Third item']
        };
      case 'bullet-list':
        return { 
          content: '', 
          fontSize: 18, 
          width: 400, 
          height: 120,
          listItems: ['First item', 'Second item', 'Third item']
        };
      default:
        return { content: 'Text', fontSize: 24, width: 200, height: 50 };
    }
  };