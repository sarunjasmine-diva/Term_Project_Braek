export interface MenuItem {
  id: string;
  name: string;
  category: 'bowls' | 'coffee' | 'beverages' | 'bites';
  price: number;
  description: string;
  tags?: string[];
  imageType?: 'classic' | 'tropical' | 'nutty' | 'matcha' | 'coffee' | 'smoothie' | 'bite';
  popular?: boolean;
  calories?: string;
}

export interface CustomBowlState {
  size: 'Regular' | 'Large' | 'Superbraek';
  base: string;
  granola: string;
  fruits: string[];
  superfoods: string[];
  drizzle: string;
  specialInstructions: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
  isCustomBowl?: boolean;
}

export interface CafeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Wellness' | 'Student' | 'Workshop' | 'Social' | 'Creative';
  description: string;
  spotsLeft: number;
  badge?: string;
  perks: string[];
}

export interface CorporateQuote {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  eventDate: string;
  pax: number;
  packageType: string;
  addCoffee: boolean;
  notes: string;
}
