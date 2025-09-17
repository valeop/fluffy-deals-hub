import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import heroPets from '@/assets/hero-pets.jpg';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-8">
            PetStore.
          </h1>
          
          <div className="mb-12">
            <img 
              src={heroPets} 
              alt="Perro y gato felices juntos" 
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground mb-8">
              Todo lo que tu mascota necesita en un solo lugar
            </p>
            
            <Link to="/admin/promotions">
              <Button variant="hero" size="lg">
                Comprar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;