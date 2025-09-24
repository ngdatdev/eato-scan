import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<'dishes' | 'restaurants'>('restaurants');

  const favoriteRestaurants = [
    {
      id: 1,
      name: 'Pasta Paradiso',
      cuisine: 'Italian',
      priceRange: '$12-25',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Bella Vista Restaurant',
      cuisine: 'Italian',
      priceRange: '$18-35',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Ocean Breeze',
      cuisine: 'Seafood',
      priceRange: '$20-40',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      isFavorite: true,
    },
  ];

  const favoriteDishes = [
    {
      id: 1,
      name: 'Margherita Pizza',
      restaurant: 'Pasta Paradiso',
      price: '$18.99',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      rating: 4.8,
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Truffle Pasta',
      restaurant: 'Bella Vista',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      rating: 4.9,
      isFavorite: true,
    },
  ];

  const toggleFavorite = (type: 'dish' | 'restaurant', id: number) => {
    // Handle favorite toggle logic here
    console.log(`Toggle ${type} favorite for id: ${id}`);
  };

  const handleViewDetails = (type: 'dish' | 'restaurant', id: number) => {
    if (type === 'restaurant') {
      router.push('/restaurant-detail');
    } else {
      router.push('/capture/dish-recognition');
    }
  };

  const renderRestaurantCard = (restaurant: any) => (
    <View key={restaurant.id} style={styles.favoriteCard}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={() => toggleFavorite('restaurant', restaurant.id)}
        >
          <Ionicons 
            name={restaurant.isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={restaurant.isFavorite ? "#FF6B35" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{restaurant.name}</Text>
        <Text style={styles.cardSubtitle}>
          {restaurant.cuisine} {restaurant.priceRange}
        </Text>
        
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => handleViewDetails('restaurant', restaurant.id)}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDishCard = (dish: any) => (
    <View key={dish.id} style={styles.favoriteCard}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: dish.image }} style={styles.cardImage} />
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={() => toggleFavorite('dish', dish.id)}
        >
          <Ionicons 
            name={dish.isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={dish.isFavorite ? "#FF6B35" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{dish.name}</Text>
        <Text style={styles.cardSubtitle}>{dish.restaurant}</Text>
        
        <View style={styles.dishFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{dish.rating}</Text>
          </View>
          <Text style={styles.priceText}>{dish.price}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => handleViewDetails('dish', dish.id)}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'dishes' ? styles.activeTabButton : styles.inactiveTabButton
          ]}
          onPress={() => setActiveTab('dishes')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'dishes' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Dishes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'restaurants' ? styles.activeTabButton : styles.inactiveTabButton
          ]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'restaurants' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Restaurants
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Counter */}
        <Text style={styles.counterText}>
          {activeTab === 'restaurants' 
            ? `${favoriteRestaurants.length} saved restaurants` 
            : `${favoriteDishes.length} saved dishes`
          }
        </Text>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {activeTab === 'restaurants' 
            ? favoriteRestaurants.map(renderRestaurantCard)
            : favoriteDishes.map(renderDishCard)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF6B35',
  },
  inactiveTabButton: {
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 16,
    paddingBottom: 100, // Space for tab bar
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
});