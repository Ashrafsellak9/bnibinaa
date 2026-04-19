
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  isEco: boolean;
  available: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  budget: string;
  style: string;
  beforeImg: string;
  afterImg: string;
}
