"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, Heart, Package, Truck, Shield, CreditCard, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch("http://localhost:8000/api/auth/profile/", {
          credentials: "include",
        });
        if (!userRes.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await userRes.json();
        setUser(userData);

        const cartRes = await fetch("http://localhost:8000/api/cart/", {
          credentials: "include",
        });
        const cartData = await cartRes.json();
        setCart(cartData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingItem(itemId);
    
    setTimeout(() => {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
      setUpdatingItem(null);
    }, 500);
  };

  const removeItem = async (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Please login to see your Cart</h1>
          <a
            href="/auth/login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <span>Go to Login</span>
          </a>
        </div>
      </main>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCharge - discount;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Hi {user.name || user.username || "User"}, your cart is here 🛒
          </h1>
          <p className="text-gray-400">{cart.length} items in your cart</p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-3xl flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Start shopping to add items to your cart</p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-8 h-8 text-purple-400" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-1">
                          ₹{item.price}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-gray-700/50 rounded-xl">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={updatingItem === item.id || (item.quantity || 1) <= 1}
                            className="p-2 hover:bg-gray-600/50 rounded-l-xl transition-colors disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          
                          <div className="px-4 py-2 min-w-[3rem] text-center font-semibold">
                            {updatingItem === item.id ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"
                              />
                            ) : (
                              item.quantity || 1
                            )}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            disabled={updatingItem === item.id}
                            className="p-2 hover:bg-gray-600/50 rounded-r-xl transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-xl transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-400">Discount (10%)</span>
                      <span className="text-green-400 font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery Charges</span>
                    <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-400' : ''}`}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Free Delivery</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {subtotal >= 500 ? 
                      "You get free delivery on this order!" : 
                      `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`
                    }
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure checkout guaranteed</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
