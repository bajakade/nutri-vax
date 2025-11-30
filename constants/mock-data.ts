import { User } from '@/types';

export const mockChildren = [
  {
    id: '001',
    name: 'Fatima Ibrahim',
    serial: 'NV-001234',
    photo: 'Girl',
    age: 18,
    muac: 120,
    visits: 8,
    lastVisit: '2025-11-09',
    sachetsIssued: 224,
    vaccineStatus: 'up-to-date',
  },
  {
    id: '002',
    name: 'Muhammad Sani',
    serial: 'NV-001235',
    photo: 'Boy',
    age: 11,
    muac: 118,
    visits: 5,
    lastVisit: '2025-11-08',
    sachetsIssued: 140,
    vaccineStatus: 'up-to-date',
  },
  {
    id: '003',
    name: 'Aisha Musa',
    serial: 'NV-001236',
    photo: 'Girl',
    age: 22,
    muac: 122,
    visits: 11,
    lastVisit: '2025-11-10',
    sachetsIssued: 308,
    vaccineStatus: 'updated-today',
  },
];

export const authDb: User[] = [
  {
    id: 'UUID-1',
    username: 'bajakade',
    email: 'bashhau@gmail.com',
    token: '1234567890',
    facility: {
      id: 'FACILITY-UUID',
      name: 'Afunori PHCC',
    },
  },
];
