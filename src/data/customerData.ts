import { CustomerProfile, CustomerOrder, CustomerDiscount, RewardStage } from '../types';

export const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-1029',
  name: 'Jasmine Sarun',
  email: 'sarunjasmine@gmail.com',
  phone: '+65 9123 4567',
  memberSince: 'September 2026',
  tier: 'Açai Enthusiast',
  points: 320,
  bowlsPurchased: 2, // Starts at 2 to illustrate "Today you were able to achieve..."
  memberQrCode: 'BRAEK-MEMBER-JASMINE-1029'
};

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'BK-8421',
    date: 'Sep 26, 2026 • 2:15 PM',
    items: [
      { name: 'The Classic Braek (Large)', quantity: 1, price: 12.50, details: 'Honey Almond Granola, Banana, Strawberries, Speculoos' },
      { name: 'Iced Oat Dirty Matcha', quantity: 1, price: 6.80, details: 'Minor Figures Oat Milk, Less Sweet' }
    ],
    total: 19.30,
    pointsEarned: 193,
    bowlsCount: 1,
    status: 'Completed'
  },
  {
    id: 'BK-7890',
    date: 'Sep 22, 2026 • 12:40 PM',
    items: [
      { name: 'Custom Açai Bowl (Regular)', quantity: 1, price: 9.90, details: 'Pure Açai Base, Cacao Nibs, Blueberries, Almond Butter' }
    ],
    total: 9.90,
    pointsEarned: 99,
    bowlsCount: 1,
    status: 'Completed'
  },
  {
    id: 'BK-6512',
    date: 'Sep 15, 2026 • 5:10 PM',
    items: [
      { name: 'Tropical Haven', quantity: 1, price: 10.90, details: 'Mango, Kiwi, Passionfruit, Coconut Flakes' },
      { name: 'Sea Salt Dark Chocolate Acai Bite', quantity: 1, price: 3.80 }
    ],
    total: 14.70,
    pointsEarned: 147,
    bowlsCount: 1,
    status: 'Completed'
  }
];

export const INITIAL_DISCOUNTS: CustomerDiscount[] = [
  {
    id: 'disc-1',
    title: 'SMU Student 10% Discount',
    code: 'SMU10',
    description: '10% off your entire order upon showing student ID or ordering online.',
    discountType: 'percentage',
    value: 0.10,
    expiry: 'Valid until Dec 31, 2026',
    status: 'active'
  },
  {
    id: 'disc-2',
    title: 'S$3.00 Off Any Large Bowl',
    code: 'BRAEK3OFF',
    description: 'Enjoy S$3 off on any Large or Superbraek Açai bowl creation.',
    discountType: 'fixed',
    value: 3.00,
    expiry: 'Expires in 14 days',
    status: 'active',
    requiredPoints: 150
  },
  {
    id: 'disc-3',
    title: 'Free Specialty Coffee / Cold Brew',
    code: 'FREECOFFEE',
    description: 'Complimentary Iced Oat Dirty Matcha or Nitro Cold Brew with any bowl.',
    discountType: 'free_item',
    value: 6.80,
    expiry: 'Unlocked at Stage 3',
    status: 'locked',
    requiredPoints: 300
  },
  {
    id: 'disc-4',
    title: 'Free Superbraek Açai Bowl',
    code: 'FREESUPER',
    description: 'Our ultimate bowl creation on the house once you complete Stage 4!',
    discountType: 'free_item',
    value: 15.50,
    expiry: 'Unlocked at Stage 4',
    status: 'locked',
    requiredPoints: 500
  }
];

export const REWARD_STAGES: RewardStage[] = [
  {
    stage: 1,
    bowlsRequired: 1,
    title: 'Stage 1: Welcome Braeker',
    rewardDescription: 'Free Extra Artisanal Drizzle & Welcome Immunity Shot',
    status: 'achieved',
    perkBadge: 'Free Drizzle'
  },
  {
    stage: 2,
    bowlsRequired: 4,
    title: 'Stage 2: Habit Builder',
    rewardDescription: 'S$3 Off Any Bowl + Double Superfood Topping Upgrade',
    status: 'current',
    perkBadge: 'S$3 Off + Topping'
  },
  {
    stage: 3,
    bowlsRequired: 7,
    title: 'Stage 3: Açai Aficionado',
    rewardDescription: 'Free Specialty Beverage (Iced Oat Dirty Matcha / Spanish Latte)',
    status: 'locked',
    perkBadge: 'Free Drink'
  },
  {
    stage: 4,
    bowlsRequired: 10,
    title: 'Stage 4: Master of the Braek',
    rewardDescription: 'Free Signature Superbraek Bowl (650ml) + Limited Edition Bear Pin',
    status: 'locked',
    perkBadge: 'Free Superbraek'
  }
];

export const getRewardsProgressWording = (bowls: number): {
  headline: string;
  subtext: string;
  isStart: boolean;
  isEnd: boolean;
} => {
  if (bowls <= 2) {
    return {
      headline: 'Today you were able to achieve your first milestones on your wellness journey!',
      subtext: `You have enjoyed ${bowls} wholesome açai bowl${bowls === 1 ? '' : 's'}. Keep taking meaningful pauses to fuel your mind and unlock the Stage 2 perks!`,
      isStart: true,
      isEnd: false
    };
  } else if (bowls < 8) {
    const needed = 10 - bowls;
    return {
      headline: "You're steadily building an inspiring rhythm of daily wellness!",
      subtext: `With ${bowls} bowls savored, you're past the halfway mark! Only ${needed} more bowl${needed === 1 ? '' : 's'} until your Free Superbraek Bowl.`,
      isStart: false,
      isEnd: false
    };
  } else {
    const remaining = Math.max(0, 10 - bowls);
    return {
      headline: 'You are almost there to collect your next reward!',
      subtext: remaining === 0
        ? 'Congratulations! You have reached Stage 4. Claim your complimentary Superbraek Açai Bowl today!'
        : `Just ${remaining} more bowl${remaining === 1 ? '' : 's'} to go! Your complimentary Superbraek Açai Bowl & exclusive Bear Pin are waiting.`,
      isStart: false,
      isEnd: true
    };
  }
};
