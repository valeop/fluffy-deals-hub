import { useState, useEffect } from 'react';
import { Promotion } from '@/types';
import { localStorageService } from '@/services/localStorage.service';

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorageService.initializeDefaults();
    const stored = localStorageService.getPromotions();
    setPromotions(stored);
    setIsLoading(false);
  }, []);

  const addPromotion = (promotion: Omit<Promotion, 'id'>) => {
    const newPromotion: Promotion = {
      ...promotion,
      id: Date.now().toString(),
      isActive: true,
      selectedProducts: promotion.selectedProducts || []
    };
    const updated = [...promotions, newPromotion];
    setPromotions(updated);
    localStorageService.savePromotions(updated);
  };

  const updatePromotion = (id: string, promotion: Partial<Promotion>) => {
    const updated = promotions.map(p => 
      p.id === id ? { ...p, ...promotion } : p
    );
    setPromotions(updated);
    localStorageService.savePromotions(updated);
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.map(p => 
      p.id === id ? { ...p, isActive: false } : p
    );
    setPromotions(updated);
    localStorageService.savePromotions(updated);
  };

  const permanentlyDeletePromotion = (id: string) => {
    const updated = promotions.filter(p => p.id !== id);
    setPromotions(updated);
    localStorageService.savePromotions(updated);
  };

  const restorePromotion = (id: string) => {
    const updated = promotions.map(p => 
      p.id === id ? { ...p, isActive: true } : p
    );
    setPromotions(updated);
    localStorageService.savePromotions(updated);
  };

  return { 
    promotions, 
    isLoading,
    addPromotion, 
    updatePromotion,
    deletePromotion,
    permanentlyDeletePromotion,
    restorePromotion
  };
};