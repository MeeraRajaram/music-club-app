export interface GalleryItem {
    id: number;
    category: string;
    image: string;
    title: string;
    type: 'image' | 'video';
    videoUrl?: string;
  }
  
  export const galleryItems: GalleryItem[] = [
    { id: 1, category: 'performances', image: '/performances/20240815_103444.jpg', title: 'Independence Day Performance', type: 'image' },
    { id: 2, category: 'jams', image: '/performances/20240831_210445.jpg', title: 'Weekend Jam Session', type: 'image' },
    { id: 3, category: 'performances', image: '/performances/IMG_9793.jpg', title: 'Blastroduction', type: 'image' },
    { id: 4, category: 'jams', image: '/performances/20240831_210858.jpg', title: 'Weekend Jam Session', type: 'image' },
    { id: 5, category: 'covers', image: '/gallery/Enter_Sandman.png', title: 'Enter Sandman', type: 'video', videoUrl: 'https://www.youtube.com/embed/hpURyv_xhu0' },
    // { id: 6, category: 'workshops', image: '/gallery/guitar-masterclass.jpg', title: 'Guitar Masterclass', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ];