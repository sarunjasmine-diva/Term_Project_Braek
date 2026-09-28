import { MenuItem, CafeEvent } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bowl-1',
    name: 'The Classic Braek',
    category: 'bowls',
    price: 9.90,
    description: 'Organic wild Brazilian açai base topped with banana slices, fresh strawberries, blueberries, artisanal honey granola, chia seeds, and cookie butter drizzle.',
    tags: ['Best Seller', 'Antioxidant Rich'],
    imageType: 'classic',
    popular: true,
    calories: '340 kcal'
  },
  {
    id: 'bowl-2',
    name: 'Tropical Haven',
    category: 'bowls',
    price: 10.90,
    description: 'Refreshing açai swirl with Alphonso mango chunks, sweet kiwi, passionfruit pulp, toasted coconut flakes, and raw clover honey.',
    tags: ['Vitamin C', 'Tropical'],
    imageType: 'tropical',
    calories: '310 kcal'
  },
  {
    id: 'bowl-3',
    name: 'Nutty Indulgence',
    category: 'bowls',
    price: 11.50,
    description: 'Creamy peanut & almond butter swirl on chilled açai, roasted crushed hazelnuts, cacao nibs, banana, and decadent dark chocolate fudge drizzle.',
    tags: ['High Protein', 'Customer Fav'],
    imageType: 'nutty',
    popular: true,
    calories: '420 kcal'
  },
  {
    id: 'bowl-4',
    name: 'Matcha Zen Bowl',
    category: 'bowls',
    price: 11.90,
    description: 'Half ceremonial Uji matcha chia pudding, half velvety açai, adorned with goji berries, pumpkin seeds, fresh blueberries, and almond flakes.',
    tags: ['Superfood', 'Antioxidants'],
    imageType: 'matcha',
    calories: '295 kcal'
  },
  {
    id: 'coffee-1',
    name: 'Iced Oat Dirty Matcha',
    category: 'coffee',
    price: 6.80,
    description: 'Ceremonial grade Uji matcha layered with velvety Minor Figures oat milk and a shot of rich single-origin Brazilian espresso.',
    tags: ['House Signature', 'Oat Milk'],
    imageType: 'coffee',
    popular: true,
  },
  {
    id: 'coffee-2',
    name: 'Spanish Latte (Hot / Iced)',
    category: 'coffee',
    price: 6.20,
    description: 'Double espresso pulled over gently sweetened condensed milk and silky steamed textured milk.',
    tags: ['Sweet & Smooth'],
    imageType: 'coffee'
  },
  {
    id: 'coffee-3',
    name: 'Cold Brew Tonic & Citrus',
    category: 'coffee',
    price: 6.50,
    description: '18-hour steep single-origin Ethiopian cold brew paired with botanical tonic water and fresh dehydrated citrus wheel.',
    tags: ['Refreshing', 'Low Calorie'],
    imageType: 'coffee'
  },
  {
    id: 'bev-1',
    name: 'Dragonfruit Açai Cooler',
    category: 'beverages',
    price: 6.90,
    description: 'Blended pink pitaya and pure açai puree with coconut water, mint leaves, and a squeeze of fresh calamansi lime.',
    tags: ['Hydrating', 'Dairy-Free'],
    imageType: 'smoothie',
    popular: true
  },
  {
    id: 'bev-2',
    name: 'Very Berry Antioxidant Smoothie',
    category: 'beverages',
    price: 7.50,
    description: 'Açai, blackberries, blueberries, strawberries blended with Greek yoghurt and flaxseed.',
    tags: ['Immunity Boost'],
    imageType: 'smoothie'
  },
  {
    id: 'bite-1',
    name: 'Sea Salt Dark Chocolate Acai Bite',
    category: 'bites',
    price: 3.80,
    description: 'Frozen bite-sized dark chocolate shell filled with pure açai sorbet and topped with Maldon flaky sea salt.',
    tags: ['Guilt-Free Snack'],
    imageType: 'bite'
  },
  {
    id: 'bite-2',
    name: 'Almond Butter Protein Truffles (2pcs)',
    category: 'bites',
    price: 4.50,
    description: 'Handmade dates, rolled oats, plant-based protein, roasted almonds, and raw cacao dusting.',
    tags: ['Plant Protein', 'No Added Sugar'],
    imageType: 'bite'
  }
];

export const EVENTS_DATA: CafeEvent[] = [
  {
    id: 'event-1',
    title: 'Açai & Acrylics: Sip, Paint & Chill',
    date: 'Friday, Oct 10, 2026',
    time: '5:00 PM – 7:30 PM',
    location: 'Li Ka Shing Library Patio / B1-25',
    category: 'Creative',
    badge: 'Popular',
    description: 'Unwind at the end of the week with guided canvas painting, ambient lo-fi music, and your choice of complimentary Regular Açai Bowl and Iced Coffee.',
    spotsLeft: 8,
    perks: ['Includes 1x Regular Bowl', '1x Iced Beverage', 'All painting materials provided', 'Take home your canvas']
  },
  {
    id: 'event-2',
    title: 'Study Braek: Finals Wellness Bar',
    date: 'Wednesday, Oct 22, 2026',
    time: '2:00 PM – 8:00 PM',
    location: 'Inside bræk. @ SMU Library',
    category: 'Student',
    badge: 'Student Special',
    description: 'Exclusive for SMU and nearby college students preparing for midterms and finals! Show your student pass to receive free energizer shots, 20% off all large bowls, and study lounge priority.',
    spotsLeft: 25,
    perks: ['Free Ginger Açai immunity shot', '20% off all Large bowls', 'Complimentary power outlets & fast Wi-Fi']
  },
  {
    id: 'event-3',
    title: 'Superfood 101: Açai Layering & Granola Making',
    date: 'Saturday, Nov 01, 2026',
    time: '11:00 AM – 12:30 PM',
    location: 'Workshop Studio, SMU Connexion',
    category: 'Workshop',
    badge: 'Hands-on',
    description: 'Learn the secrets of churning the perfect thick velvet açai base without ice crystals, baking crisp honey-cinnamon clusters, and aesthetic bowl styling for social media.',
    spotsLeft: 6,
    perks: ['Hands-on bowl crafting', 'Recipe booklet & apron to keep', 'Jar of homemade granola (250g)']
  },
  {
    id: 'event-4',
    title: 'Sunset Acoustic Sessions & Board Games',
    date: 'Thursday, Nov 12, 2026',
    time: '6:30 PM – 9:00 PM',
    location: 'bræk. Cafe Courtyard',
    category: 'Social',
    badge: 'Free Entry',
    description: 'An intimate evening of live acoustic covers by local campus indie musicians, board game tables, and late-night açai bowl specials.',
    spotsLeft: 18,
    perks: ['Free admission', 'Board games library open', 'Late-night menu extension']
  }
];
