import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Eye } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { usePromotions } from '@/hooks/usePromotions';
import dogProducts from '@/assets/dog-products.jpg';
import catProducts from '@/assets/cat-products.jpg';

const PromotionsList = () => {
  const { promotions } = usePromotions();

  const getPromotionImage = (imageName: string) => {
    switch (imageName) {
      case 'dog-products':
        return dogProducts;
      case 'cat-products':
        return catProducts;
      default:
        return dogProducts;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Promociones</h1>
          <Link to="/admin/promotions/create">
            <Button variant="success" className="gap-2">
              <Plus size={20} />
              Crear
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {promotions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No hay promociones creadas</p>
              </CardContent>
            </Card>
          ) : (
            promotions.map((promotion) => (
              <Card key={promotion.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="w-32 h-24 flex-shrink-0">
                      <img
                        src={getPromotionImage(promotion.image)}
                        alt={promotion.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {promotion.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {promotion.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-success">
                            {promotion.discount}% OFF
                          </span>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye size={16} />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PromotionsList;