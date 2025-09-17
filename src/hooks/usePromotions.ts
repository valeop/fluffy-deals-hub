import { useState, useEffect } from 'react';
import { Promotion } from '@/types';

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('petstore:promotions');
    if (stored) {
      setPromotions(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const samplePromotions: Promotion[] = [
        {
          id: '1',
          name: 'Descuento Alimento Premium',
          description: 'Obtén 20% de descuento en alimentos premium para perros y gatos',
          category: 'Alimento',
          discount: 20,
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          image: 'dog-products'
        },
        {
          id: '2',
          name: 'Juguetes para Gatos',
          description: 'Compra 2 y llévate 1 gratis en toda la línea de juguetes para gatos',
          category: 'Juguetes',
          discount: 33,
          startDate: '2024-01-10',
          endDate: '2024-01-31',
          image: 'cat-products'
        }
      ];
      setPromotions(samplePromotions);
      localStorage.setItem('petstore:promotions', JSON.stringify(samplePromotions));
    }
  }, []);

  const addPromotion = (promotion: Omit<Promotion, 'id'>) => {
    const newPromotion = {
      ...promotion,
      id: Date.now().toString()
    };
    const updated = [...promotions, newPromotion];
    setPromotions(updated);
    localStorage.setItem('petstore:promotions', JSON.stringify(updated));
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.filter(p => p.id !== id);
    setPromotions(updated);
    localStorage.setItem('petstore:promotions', JSON.stringify(updated));
  };

  return { promotions, addPromotion, deletePromotion };
};