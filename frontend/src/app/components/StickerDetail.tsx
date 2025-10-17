import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Image from 'next/image';

'use client';

interface StickerDetailProps {
    sticker: {
        id: number;
        name: string;
        price: number;
        image: string;
        description: string;
    };
    suggestedStickers: Array<{
        id: number;
        name: string;
        price: number;
        image: string;
    }>;
}

const StickerDetail: React.FC<StickerDetailProps> = ({ sticker, suggestedStickers }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // Add to cart logic here
        console.log('Added to cart:', sticker.name, 'Quantity:', quantity);
    };

    const handleBuyNow = () => {
        // Buy now logic here
        console.log('Buying:', sticker.name, 'Quantity:', quantity);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Left side - Image */}
                    <div className="relative h-[400px]">
                        <Image
                            src={sticker.image}
                            alt={sticker.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Right side - Details */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-3xl font-bold">{sticker.name}</h1>
                        <p className="text-xl font-semibold text-green-600">
                            ${sticker.price.toFixed(2)}
                        </p>
                        <p className="text-gray-600">{sticker.description}</p>
                        
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-20 p-2 border rounded"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggested Stickers */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">You might also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {suggestedStickers.map((suggestedSticker) => (
                            <div key={suggestedSticker.id} className="border rounded p-4">
                                <div className="relative h-[200px]">
                                    <Image
                                        src={suggestedSticker.image}
                                        alt={suggestedSticker.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="mt-2 font-semibold">{suggestedSticker.name}</h3>
                                <p className="text-green-600">${suggestedSticker.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StickerDetail;