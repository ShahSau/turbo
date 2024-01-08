import { Listing, Reservation, User, Service, ServiceReservation } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeService = Omit<Service, 'createdAt'> & {
  createdAt: string;
};

export type SafeCar = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};
export type SafeReservation = Omit<
Reservation,
'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeServiceReservation = Omit<
ServiceReservation,
'createdAt' | 'startDate' | 'endDate' | 'service'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  service: SafeService;
};
export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
