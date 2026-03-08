import stay1 from "@/assets/stay-1.jpg";
import stay2 from "@/assets/stay-2.jpg";
import stay3 from "@/assets/stay-3.jpg";
import stay4 from "@/assets/stay-4.jpg";
import stay5 from "@/assets/stay-5.jpg";

export interface Stay {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  badge?: string;
}

export const mockStays: Stay[] = [
  {
    id: 1,
    title: "Forest View Garden Suite",
    location: "Ubud, Bali",
    price: 45,
    rating: 4.8,
    description: "A peaceful retreat surrounded by lush tropical gardens with a private terrace.",
    image: stay1,
    badge: "Budget Friendly",
  },
  {
    id: 2,
    title: "Rustic Mountain Cabin",
    location: "Asheville, NC",
    price: 62,
    rating: 4.9,
    description: "Charming log cabin nestled in the misty mountains with cozy fireplace.",
    image: stay2,
    badge: "Best Value",
  },
  {
    id: 3,
    title: "Coastal View Apartment",
    location: "Lisbon, Portugal",
    price: 38,
    rating: 4.6,
    description: "Bright modern apartment with stunning ocean views and balcony.",
    image: stay3,
    badge: "No Hidden Fees",
  },
  {
    id: 4,
    title: "Beachfront Bungalow",
    location: "Tulum, Mexico",
    price: 55,
    rating: 4.7,
    description: "Steps from white sand beaches with palm trees and turquoise water.",
    image: stay4,
    badge: "Transparent Pricing",
  },
  {
    id: 5,
    title: "Downtown Urban Loft",
    location: "Brooklyn, New York",
    price: 72,
    rating: 4.5,
    description: "Stylish industrial loft with skyline views in a vibrant neighborhood.",
    image: stay5,
    badge: "Best Value",
  },
];
