import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Language = 'EN' | 'NP';

export type Category = 'Locals' | 'General Public' | 'Foreign Employment';

export interface IPO {
  id: string;
  name: string;
  nameNP: string;
  sector: Sector;
  type: 'IPO' | 'FPO' | 'Rights' | 'Debenture';
  category: Category;
  issuedUnits: number;
  price: number;
  openDate: string;
  closeDate: string;
  // Optional fields for history/results if needed later
  oversubscription?: number;
  allotmentRate?: number;
  listingPrice?: number;
  listingGain?: number;
}

export type Sector = 
  | 'Hydropower' 
  | 'Microfinance' 
  | 'Insurance' 
  | 'Development Bank' 
  | 'Commercial Bank' 
  | 'Manufacturing' 
  | 'Hotels & Tourism' 
  | 'Investment'
  | 'Others';

export interface PredictionResult {
  probability: number;
  verdict: string;
  color: string;
  breakdown: {
    label: string;
    value: string;
  }[];
}
