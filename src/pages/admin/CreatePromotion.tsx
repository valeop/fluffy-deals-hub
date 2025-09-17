import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { usePromotions } from '@/hooks/usePromotions';
import { useToast } from '@/hooks/use-toast';

const promotionSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  description: z.string().min(1, 'Descripción requerida'),
  category: z.string().min(1, 'Categoría requerida'),
  discount: z.coerce.number().min(1, 'Descuento debe ser mayor a 0').max(100, 'Descuento no puede ser mayor a 100'),
  startDate: z.string().min(1, 'Fecha de inicio requerida'),
  endDate: z.string().min(1, 'Fecha de fin requerida'),
});

type PromotionForm = z.infer<typeof promotionSchema>;

const CreatePromotion = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { addPromotion } = usePromotions();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PromotionForm>({
    resolver: zodResolver(promotionSchema),
  });

  const categories = [
    { value: 'alimento', label: 'Alimento' },
    { value: 'juguetes', label: 'Juguetes' },
    { value: 'cuidado', label: 'Cuidado e Higiene' },
    { value: 'accesorios', label: 'Accesorios' },
  ];

  const onSubmit = async (data: PromotionForm) => {
    setLoading(true);
    
    try {
      const imageMap: Record<string, string> = {
        'alimento': 'dog-products',
        'juguetes': 'cat-products',
        'cuidado': 'dog-products',
        'accesorios': 'cat-products',
      };

      addPromotion({
        name: data.name,
        description: data.description,
        category: data.category,
        discount: data.discount,
        startDate: data.startDate,
        endDate: data.endDate,
        image: imageMap[data.category] || 'dog-products',
      });

      toast({
        title: "Promoción creada",
        description: "La promoción se ha creado exitosamente",
      });
      
      navigate('/admin/promotions');
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la promoción",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Crear Nueva Promoción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la promoción</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register('startDate')}
                    className={errors.startDate ? 'border-destructive' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha de fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register('endDate')}
                    className={errors.endDate ? 'border-destructive' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-destructive">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setValue('category', value);
                    }}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Porcentaje de descuento</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="1"
                    max="100"
                    {...register('discount')}
                    className={errors.discount ? 'border-destructive' : ''}
                  />
                  {errors.discount && (
                    <p className="text-sm text-destructive">{errors.discount.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="cancel"
                  className="flex-1"
                  onClick={() => navigate('/admin/promotions')}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatePromotion;