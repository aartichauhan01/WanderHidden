export type DestinationCategory =
  | 'Mountains'
  | 'Waterfalls'
  | 'Beaches'
  | 'Villages'
  | 'Forests'
  | 'Heritage'
  | 'Lakes'
  | 'Offbeat';

export type IndianRegion =
  | 'North'
  | 'South'
  | 'East'
  | 'West'
  | 'North-East'
  | 'Central';

export type TravelStyle = 'Solo' | 'Couples' | 'Backpacker' | 'Family' | 'Adventure' | 'Slow Travel';

export interface TravelOptions {
  nearestAirport: string;
  nearestRailwayStation: string;
  roadRoute: string;
  localTransport: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  region: IndianRegion;
  category: DestinationCategory;
  shortDescription: string;
  description: string;
  highlights: string[];
  latitude: number;
  longitude: number;
  best_season: string;
  idealSeasons: ('Summer' | 'Monsoon' | 'Autumn' | 'Winter' | 'Spring')[];
  suggested_duration_days: number;
  estimated_budget: number; // in INR
  image_url: string;
  gallery: string[];
  travelOptions: TravelOptions;
  nearbyAttractions: string[];
  travelTips: string[];
  safetyAndResponsibleTourism: string[];
  verifiedStatus: 'curated_gem' | 'verified_local' | 'community_spot';
  isTrending?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewsCount?: number;
  tags: string[];
}

export interface TripBudget {
  travelers: number;
  days: number;
  nightlyAccommodation: number;
  dailyFoodPerPerson: number;
  transportation: number;
  activities: number;
  miscellaneous: number;
  spendingTarget?: number;
}

export interface TripStop {
  id: string;
  tripId: string;
  destinationId: string;
  destination?: Destination;
  day: number;
  order: number;
  notes?: string;
  plannedActivities?: string[];
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  budget: TripBudget;
  stops: TripStop[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  travelPreferences: DestinationCategory[];
  preferredBudget: 'Budget (< ₹10k)' | 'Moderate (₹10k - ₹25k)' | 'Luxury (> ₹25k)';
  preferredTravelStyle: TravelStyle;
  homeCity?: string;
  bio?: string;
  createdAt: string;
}

export interface FilterOptions {
  query: string;
  category: string;
  state: string;
  region: string;
  season: string;
  travelStyle: string;
  maxBudget: number;
  minDuration: number;
  maxDuration: number;
  sortBy: 'popularity' | 'budget_asc' | 'budget_desc' | 'name' | 'duration';
}
