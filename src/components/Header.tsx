import React from 'react';
import { IceCream } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center md:justify-start">
        <IceCream className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">Heladería Delicia</h1>
      </div>
    </header>
  );
};

export default Header;