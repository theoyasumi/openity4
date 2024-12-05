export interface City {
  // SEO Fields
  metaTitle: string;
  metaDescription: string;
  imageUrl: string;
  imageAlt: string;

  // Page Content
  name: string;
  introduction: string;
  mainContent: string;

  // City Data
  count: string;
  linkedCities: string[];
  showInMenu: boolean;

  // Additional Content
  content: {
    services: string[];
    prices: {
      service: string;
      price: string;
      details: string;
    }[];
    testimonial: {
      text: string;
      author: string;
    };
  };

  // Nearby Areas
  nearbyAreas?: string[];
}