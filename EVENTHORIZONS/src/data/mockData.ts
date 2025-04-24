// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer' | 'admin';
  avatar?: string;
  bio?: string;
  joinedEvents?: string[];
  createdEvents?: string[];
}

// Mock event data
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  hostUrl?: string;
  image?: string;
  tags: string[];
  maxCapacity: number;
  currentAttendees: number;
  organizer: {
    id: string;
    name: string;
  };
  isPublic: boolean;
  isFeatured: boolean;
  isLive?: boolean;
  location?: string;
  price?: number;
  rating?: number;
  duration?: number;
}

// Event categories
export const eventCategories = [
  'Technology',
  'Business',
  'Education',
  'Entertainment',
  'Health',
  'Networking',
  'Workshop',
  'Conference',
  'Webinar',
  'Other'
];

// Event tags
export const eventTags = [
  'beginner',
  'advanced',
  'professional',
  'free',
  'paid',
  'certificate',
  'interactive',
  'lecture',
  'panel',
  'Q&A',
  'live',
  'recorded',
  'hybrid'
];

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    bio: 'Platform administrator with full access and control.',
    joinedEvents: [],
    createdEvents: []
  },
  {
    id: '2',
    name: 'Event Organizer',
    email: 'organizer@example.com',
    role: 'organizer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    bio: 'Professional event organizer with 5+ years of experience.',
    joinedEvents: ['3', '5'],
    createdEvents: ['1', '2', '4', '6', '8']
  },
  {
    id: '3',
    name: 'Regular Attendee',
    email: 'attendee@example.com',
    role: 'attendee',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop',
    bio: 'Enthusiastic event attendee interested in technology and education.',
    joinedEvents: ['1', '2', '4', '7', '9'],
    createdEvents: []
  }
];

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    title: 'Web Development Masterclass',
    description: 'Learn modern web development techniques from industry experts. This comprehensive workshop covers HTML, CSS, JavaScript, and popular frameworks.',
    category: 'Technology',
    startDate: '2025-05-15T10:00:00Z',
    endDate: '2025-05-15T14:00:00Z',
    hostUrl: 'https://zoom.us/j/example',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=869&auto=format&fit=crop',
    tags: ['beginner', 'interactive', 'certificate'],
    maxCapacity: 100,
    currentAttendees: 67,
    organizer: {
      id: '2',
      name: 'Event Organizer'
    },
    isPublic: true,
    isFeatured: true,
    price: 0,
    rating: 4.8,
    duration: 4
  },
  {
    id: '2',
    title: 'Startup Funding Strategies',
    description: 'Connect with venture capitalists and learn proven strategies to secure funding for your startup.',
    category: 'Business',
    startDate: '2025-05-20T15:00:00Z',
    endDate: '2025-05-20T17:00:00Z',
    hostUrl: 'https://meet.google.com/example',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=869&auto=format&fit=crop',
    tags: ['professional', 'panel', 'networking'],
    maxCapacity: 50,
    currentAttendees: 42,
    organizer: {
      id: '2',
      name: 'Event Organizer'
    },
    isPublic: true,
    isFeatured: false,
    price: 25,
    rating: 4.5,
    duration: 2
  },
  {
    id: '3',
    title: 'Digital Marketing Workshop',
    description: 'Master the latest digital marketing techniques including SEO, social media marketing, and email campaigns.',
    category: 'Business',
    startDate: '2025-05-25T12:00:00Z',
    endDate: '2025-05-25T16:00:00Z',
    hostUrl: 'https://teams.microsoft.com/example',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=869&auto=format&fit=crop',
    tags: ['beginner', 'certificate', 'interactive'],
    maxCapacity: 75,
    currentAttendees: 34,
    organizer: {
      id: '4',
      name: 'Marketing Professional'
    },
    isPublic: true,
    isFeatured: true,
    price: 15,
    rating: 4.2,
    duration: 3
  },
  {
    id: '4',
    title: 'AI in Healthcare Conference',
    description: 'Explore how artificial intelligence is transforming the healthcare industry with real-world case studies.',
    category: 'Technology',
    startDate: '2025-06-05T09:00:00Z',
    endDate: '2025-06-05T18:00:00Z',
    hostUrl: 'https://zoom.us/j/example2',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=869&auto=format&fit=crop',
    tags: ['advanced', 'panel', 'Q&A', 'professional'],
    maxCapacity: 200,
    currentAttendees: 156,
    organizer: {
      id: '2',
      name: 'Event Organizer'
    },
    isPublic: true,
    isFeatured: true,
    location: 'Virtual',
    price: 50,
    rating: 4.9,
    duration: 5
  },
  {
    id: '5',
    title: 'Yoga for Beginners',
    description: 'A gentle introduction to yoga practice, focusing on basic poses and proper breathing techniques.',
    category: 'Health',
    startDate: '2025-06-10T08:00:00Z',
    endDate: '2025-06-10T09:00:00Z',
    hostUrl: 'https://zoom.us/j/example3',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=869&auto=format&fit=crop',
    tags: ['beginner', 'interactive', 'live'],
    maxCapacity: 30,
    currentAttendees: 12,
    organizer: {
      id: '5',
      name: 'Yoga Instructor'
    },
    isPublic: true,
    isFeatured: false,
    price: 10,
    rating: 4.7,
    duration: 1
  },
  {
    id: '6',
    title: 'Leadership and Team Management',
    description: 'Develop essential leadership skills to effectively manage and inspire your team in the modern workplace.',
    category: 'Business',
    startDate: '2025-06-15T13:00:00Z',
    endDate: '2025-06-15T16:00:00Z',
    hostUrl: 'https://meet.google.com/example2',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=869&auto=format&fit=crop',
    tags: ['professional', 'certificate', 'lecture'],
    maxCapacity: 60,
    currentAttendees: 42,
    organizer: {
      id: '2',
      name: 'Event Organizer'
    },
    isPublic: true,
    isFeatured: false,
    price: 30,
    rating: 4.3,
    duration: 2
  },
  {
    id: '7',
    title: 'Introduction to Python Programming',
    description: 'Start your coding journey with this beginner-friendly Python workshop covering basic syntax and programming concepts.',
    category: 'Technology',
    startDate: '2025-06-20T11:00:00Z',
    endDate: '2025-06-20T15:00:00Z',
    hostUrl: 'https://zoom.us/j/example4',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=869&auto=format&fit=crop',
    tags: ['beginner', 'interactive', 'certificate'],
    maxCapacity: 80,
    currentAttendees: 52,
    organizer: {
      id: '6',
      name: 'Python Developer'
    },
    isPublic: true,
    isFeatured: false,
    price: 0,
    rating: 4.6,
    duration: 3
  },
  {
    id: '8',
    title: 'Advanced Data Analysis Masterclass',
    description: 'Take your data analysis skills to the next level with advanced statistical methods and machine learning concepts.',
    category: 'Education',
    startDate: '2025-06-25T14:00:00Z',
    endDate: '2025-06-25T18:00:00Z',
    hostUrl: 'https://teams.microsoft.com/example2',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=869&auto=format&fit=crop',
    tags: ['advanced', 'professional', 'certificate'],
    maxCapacity: 40,
    currentAttendees: 28,
    organizer: {
      id: '2',
      name: 'Event Organizer'
    },
    isPublic: true,
    isFeatured: true,
    price: 45,
    rating: 4.8,
    duration: 4
  },
  {
    id: '9',
    title: 'Graphic Design Workshop',
    description: 'Learn essential graphic design principles and practical skills using industry-standard software tools.',
    category: 'Education',
    startDate: '2025-07-05T10:00:00Z',
    endDate: '2025-07-05T16:00:00Z',
    hostUrl: 'https://zoom.us/j/example5',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=869&auto=format&fit=crop',
    tags: ['beginner', 'interactive', 'live'],
    maxCapacity: 50,
    currentAttendees: 32,
    organizer: {
      id: '7',
      name: 'Graphic Designer'
    },
    isPublic: true,
    isFeatured: false,
    price: 20,
    rating: 4.4,
    duration: 2
  },
  {
    id: '10',
    title: 'Product Management Essentials',
    description: 'Learn the core practices and methodologies of successful product management in technology companies.',
    category: 'Business',
    startDate: '2025-07-10T09:00:00Z',
    endDate: '2025-07-10T17:00:00Z',
    hostUrl: 'https://meet.google.com/example3',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=869&auto=format&fit=crop',
    tags: ['professional', 'panel', 'certificate'],
    maxCapacity: 70,
    currentAttendees: 45,
    organizer: {
      id: '8',
      name: 'Product Manager'
    },
    isPublic: true,
    isFeatured: true,
    price: 35,
    rating: 4.7,
    duration: 3
  }
];

// Mock Comments
export interface Comment {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export const comments: Comment[] = [
  {
    id: '1',
    eventId: '1',
    userId: '3',
    userName: 'Regular Attendee',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop',
    content: 'Great session! I learned a lot about modern web development techniques.',
    timestamp: '2025-05-15T14:30:00Z'
  },
  {
    id: '2',
    eventId: '1',
    userId: '5',
    userName: 'Jane Smith',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    content: 'The instructor was very knowledgeable and answered all my questions.',
    timestamp: '2025-05-15T14:45:00Z'
  },
  {
    id: '3',
    eventId: '4',
    userId: '3',
    userName: 'Regular Attendee',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop',
    content: 'Fascinating insights into how AI is transforming healthcare!',
    timestamp: '2025-06-05T18:15:00Z'
  },
  {
    id: '4',
    eventId: '2',
    userId: '6',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    content: 'Very practical advice on securing startup funding. Will definitely apply these strategies.',
    timestamp: '2025-05-20T17:30:00Z'
  }
];

// Helper functions for local storage management
export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};
