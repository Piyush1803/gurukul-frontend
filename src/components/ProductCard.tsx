import React from "react";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, imageUrl, price }) => {
  return (
    <div className="w-80 bg-white rounded-lg overflow-hidden group relative shadow hover:shadow-xl transition">
      <div className="relative">
        <img
          src={imageUrl}
          className="w-full h-64 object-cover"
          alt={name}
        />
        {/* Hover Add to Cart button */}
        <button><div className="absolute bottom-10 left-4 right-4 bg-black text-white text-base py-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ADD TO CART
        </div></button>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-xl">{name}</h3>
        <p className="text-lg font-medium text-gray-700">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
