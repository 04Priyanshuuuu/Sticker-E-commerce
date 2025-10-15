"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { User, Package, Heart, Settings, Star, Award, Calendar, Edit3, LogOut, Eye } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Please login to see your profile</h1>
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

  const stats = [
    { title: "Total Orders", value: 12, icon: Package, color: "from-blue-500 to-cyan-500" },
    { title: "Wishlist", value: 5, icon: Heart, color: "from-red-500 to-pink-500" },
    { title: "Custom Uploads", value: 3, icon: Star, color: "from-yellow-500 to-orange-500" },
    { title: "Reward Points", value: 240, icon: Award, color: "from-purple-500 to-indigo-500" },
  ];

  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-700/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {user.name || "User"} 👋
                </h1>
                <p className="text-gray-400 flex items-center space-x-2 mt-2">
                  <span>@{user.username || "username"}</span>
                  <Calendar className="w-4 h-4" />
                  <span>Joined: Jan 2025</span>
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
              >
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-3 opacity-80" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.title}</div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs Section */}
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-800/50 rounded-2xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "orders" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
                  {[1, 2, 3].map((order) => (
                    <motion.div
                      key={order}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Order #{order}</h3>
                            <p className="text-green-400 text-sm flex items-center space-x-1 mt-1">
                              <span>Delivered</span>
                              <span>✅</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">₹999</div>
                          <button className="text-purple-400 hover:text-purple-300 text-sm mt-1 flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-6">Your Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div
                        key={item}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30 hover:border-pink-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Cool Sticker #{item}</h3>
                          <Heart className="w-5 h-5 text-pink-500" />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                          Add to Cart
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <span>📧</span>
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 text-sm">Edit</button>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Change Password</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
