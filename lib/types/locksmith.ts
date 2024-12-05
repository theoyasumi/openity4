export interface Locksmith {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  cities: string[];
  services: string[];
  workingHours: {
    is24h: boolean;
    schedule?: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LocksmithFormData extends Omit<Locksmith, 'id' | 'createdAt' | 'updatedAt'> {}