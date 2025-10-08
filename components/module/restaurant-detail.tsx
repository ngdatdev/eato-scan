import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams();

  // Mock data - in real app, you would fetch based on restaurantId
  console.log('Restaurant ID:', restaurantId); // For debugging
  const restaurant = {
    id: 1,
    name: 'Bella Vista Restaurant',
    rating: '4.8',
    reviewCount: '324',
    priceLevel: '$$',
    cuisine: 'Italian',
    distance: '1.2 km', 
    address: '123 Main Street, Downtown',
    status: 'Open',
    closingTime: '11:00 PM',
    images: [
      require('@/assets/images/detail_res.png'),
      // Add more images
    ],
    imageCount: 15,
  };

  const menuCategories = [
    { id: 1, name: 'All', active: true },
    { id: 2, name: 'Appetizers', active: false },
    { id: 3, name: 'Main Course', active: false },
    { id: 4, name: 'Desserts', active: false },
  ];

  const popularItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil',
      price: '$18.99',
      rating: '4.9',
      reviewCount: '45',
      image: require('@/assets/images/detail_dish.png'),
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'With roasted vegetables and lemon',
      price: '$24.99',
      rating: '4.7',
      reviewCount: '32',
      image: require('@/assets/images/detail_dish.png'),
    },
    {
      id: 3,
      name: 'Pasta Carbonara',
      description: 'Creamy sauce with pancetta and parmesan',
      price: '$19.99',
      rating: '4.8',
      reviewCount: '28',
      image: require('@/assets/images/detail_dish.png'),
    },
  ];

  const tabs = [
    { id: 'menu', name: 'Menu', active: true },
    { id: 'reviews', name: 'Reviews', active: false },
    { id: 'location', name: 'Location', active: false },
  ];

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < fullStars ? "star" : index === fullStars && hasHalfStar ? "star-half" : "star-outline"}
            size={14}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Image */}
      <View style={styles.imageContainer}>
        <Image source={restaurant.images[0]} style={styles.heroImage} />
        
        {/* Header Overlay */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Count Badge */}
        <View style={styles.imageCountBadge}>
          <Ionicons name="camera" size={16} color="#fff" />
          <Text style={styles.imageCountText}>{restaurant.imageCount}+</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          
          <View style={styles.ratingContainer}>
            {renderStars(restaurant.rating)}
            <Text style={styles.ratingText}>{restaurant.rating} ({restaurant.reviewCount})</Text>
            <Text style={styles.priceLevel}>{restaurant.priceLevel} • {restaurant.cuisine}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#FF6B35" />
            <Text style={styles.locationText}>{restaurant.distance} • {restaurant.address}</Text>
          </View>

          <View style={styles.statusContainer}>
            <Ionicons name="time-outline" size={16} color="#4CAF50" />
            <Text style={styles.statusText}>{restaurant.status}</Text>
            <Text style={styles.closingTime}>• Closes at {restaurant.closingTime}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab.id} style={[styles.tab, tab.active && styles.activeTab]}>
              <Text style={[styles.tabText, tab.active && styles.activeTabText]}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {menuCategories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryButton, category.active && styles.activeCategoryButton]}
            >
              <Text style={[styles.categoryText, category.active && styles.activeCategoryText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          
          {popularItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuItemImage} />
              
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemHeader}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>{item.price}</Text>
                </View>
                
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                
                <View style={styles.menuItemFooter}>
                  {renderStars(item.rating)}
                  <Text style={styles.menuItemRating}>{item.rating} ({item.reviewCount})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.directionsButton}>
          <Ionicons name="navigate-outline" size={20} color="#666" />
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.callText}>Call Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCountBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  imageCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  restaurantInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  priceLevel: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  closingTime: {
    fontSize: 14,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 32,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
  },
  menuSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  menuItemContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  menuItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemRating: {
    fontSize: 12,
    color: '#666',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    gap: 8,
  },
  directionsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    gap: 8,
  },
  callText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});