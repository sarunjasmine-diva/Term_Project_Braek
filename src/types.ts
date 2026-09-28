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

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  memberSince: string;
  tier: 'Lilac Seedling' | 'Açai Enthusiast' | 'Braek Connoisseur' | 'VIP Master Braeker';
  points: number;
  bowlsPurchased: number;
  memberQrCode: string;
}

export interface CustomerOrder {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    details?: string;
  }[];
  total: number;
  pointsEarned: number;
  bowlsCount: number;
  status: 'Completed' | 'Ready for Pickup' | 'Preparing';
}

export interface CustomerDiscount {
  id: string;
  title: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_item';
  value: number; // e.g., 0.1 for 10% or 3.00 for $3
  expiry: string;
  status: 'active' | 'used' | 'locked';
  requiredPoints?: number;
}

export interface RewardStage {
  stage: number;
  bowlsRequired: number;
  title: string;
  rewardDescription: string;
  status: 'achieved' | 'current' | 'locked';
  perkBadge: string;
}
