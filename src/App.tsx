//import React from 'react';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
//import CustomerForm from './components/CustomerForm';
//import ContainerSelection from './components/ContainerSelection';
//import FlavorSelection from './components/FlavorSelection';
import Footer from './components/Footer';
import OrderView from './pages/OrderView';

function App() {
  return (
    <OrderProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <OrderView />
        </main>
        <Footer />
      </div>
    </OrderProvider>
  );
}

export default App;