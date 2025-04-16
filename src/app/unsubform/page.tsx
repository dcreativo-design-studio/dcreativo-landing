import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import UnsubscribeForm from '@/components/unsubscribe/UnsubscribeForm';

export default function UnsubscribePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow py-10 bg-gradient-to-br from-gray-50 to-gray-100">
        <UnsubscribeForm />
      </div>
      <Footer />
    </main>
  );
}
