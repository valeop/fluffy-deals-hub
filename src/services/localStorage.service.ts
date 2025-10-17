import { Promotion, User } from '@/types';

const KEYS = {
  USERS: 'petstore:users',
  PROMOTIONS: 'petstore:promotions',
  SESSION: 'petstore:session',
  SETTINGS: 'petstore:settings',
};

export interface AppSettings {
  contrast: number;
  fontSize: number;
}

export const localStorageService = {
  // Users
  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  // Session
  getSession: () => {
    const data = localStorage.getItem(KEYS.SESSION);
    return data ? JSON.parse(data) : null;
  },

  saveSession: (session: any) => {
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
  },

  clearSession: () => {
    localStorage.removeItem(KEYS.SESSION);
  },

  // Promotions
  getPromotions: (): Promotion[] => {
    const data = localStorage.getItem(KEYS.PROMOTIONS);
    return data ? JSON.parse(data) : [];
  },

  savePromotions: (promotions: Promotion[]) => {
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(promotions));
  },

  // Settings
  getSettings: (): AppSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { contrast: 50, fontSize: 50 };
  },

  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Initialize with default data
  initializeDefaults: () => {
    // Initialize users with a default admin
    const users = localStorageService.getUsers();
    if (users.length === 0) {
      localStorageService.saveUsers([
        { email: 'admin@petstore.com', password: 'admin123' }
      ]);
    }

    // Initialize promotions with sample data
    const promotions = localStorageService.getPromotions();
    if (promotions.length === 0) {
      const samplePromotions: Promotion[] = [
        {
          id: '1',
          name: 'Descuento Alimento Premium',
          description: 'Obtén 20% de descuento en alimentos premium para perros y gatos',
          category: 'alimento',
          discount: 20,
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          image: 'dog-products',
          isActive: true,
          selectedProducts: ['1', '2']
        },
        {
          id: '2',
          name: 'Juguetes para Gatos',
          description: 'Compra 2 y llévate 1 gratis en toda la línea de juguetes para gatos',
          category: 'juguetes',
          discount: 33,
          startDate: '2024-01-10',
          endDate: '2024-01-31',
          image: 'cat-products',
          isActive: true,
          selectedProducts: ['5', '6']
        }
      ];
      localStorageService.savePromotions(samplePromotions);
    }
  }
};
