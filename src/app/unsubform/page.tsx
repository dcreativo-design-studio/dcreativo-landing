import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import UnsubscribeForm from '@/components/unsubscribe/UnsubscribeForm';

export default function UnsubscribePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow pt-24 pb-16 relative">
        {/* Aggiunto z-index negativo allo sfondo per evitare che interferisca con gli altri elementi */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"></div>
        <UnsubscribeForm />
      </div>
      <Footer />
    </main>
  );
}
