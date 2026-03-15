
export interface Stay {
  _id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  description: string;
  imageUrl: string;
  imageGallery?: string[];
  propertyType: string;
  status: string;
  badge?: string;
  amenities?: string[];
  guests?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  totalPrice?: number;
  checkIn?: string;
  checkOut?: string;
  hostName?: string;
  cancellationPolicy?: string;
  externalUrl?: string;
  isFeatured?: boolean;
}