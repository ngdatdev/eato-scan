import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NearbyRestaurantsScreen() {
  const router = useRouter();

  const restaurants = [
    {
      id: 1,
      name: 'Pasta Paradiso',
      cuisine: 'Italian',
      distance: '0.3 km away',
      priceRange: '$12-25',
      rating: '4.8',
      image: require('@/assets/images/restaurant1.png'),
    },
    {
      id: 2,
      name: 'Burger Haven',
      cuisine: 'American',
      distance: '0.5 km away',
      priceRange: '$8-18',
      rating: '4.6',
      image: require('@/assets/images/restaurant1.png'),
    },
    {
      id: 3,
      name: 'Sushi Master',
      cuisine: 'Japanese',
      distance: '0.7 km away',
      priceRange: '$15-30',
      rating: '4.9',
      image: require('@/assets/images/restaurant1.png'),
    },
  ];

  const mapPins = [
    { id: 1, x: 80, y: 200, color: '#FF6B35' },
    { id: 2, x: 300, y: 350, color: '#4ECDC4' },
    { id: 3, x: 180, y: 450, color: '#FF6B35' },
    { id: 4, x: 520, y: 320, color: '#FF6B35' },
    { id: 5, x: 250, y: 680, color: '#FF6B35' },
    { id: 6, x: 520, y: 580, color: '#FF6B35' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants..."
            placeholderTextColor="#999"
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          {/* Map Control Buttons */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="locate-outline" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="add" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="remove" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Restaurant Pins */}
          {mapPins.map((pin) => (
            <View
              key={pin.id}
              style={[
                styles.mapPin,
                {
                  left: pin.x,
                  top: pin.y,
                  backgroundColor: pin.color,
                }
              ]}
            >
              <Ionicons name="restaurant" size={16} color="#fff" />
            </View>
          ))}

          {/* Current Location Pin */}
          <View style={styles.currentLocationPin}>
            <Ionicons name="location" size={20} color="#fff" />
          </View>

          {/* Distance Circle */}
          <View style={styles.distanceCircle} />
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />
        
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantTitle}>Nearby Restaurants</Text>
          <Text style={styles.restaurantCount}>12 found</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.restaurantScroll}
          contentContainerStyle={styles.restaurantScrollContent}
        >
          {restaurants.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id} 
              style={styles.restaurantCard}
              onPress={() => router.push(`/restaurant-detail?restaurantId=${restaurant.id}`)}
            >
              <View style={styles.restaurantImageContainer}>
                <Image source={restaurant.image} style={styles.restaurantImage} />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{restaurant.rating}</Text>
                </View>
              </View>
              
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantDetails}>
                  {restaurant.cuisine} • {restaurant.distance}
                </Text>
                <View style={styles.restaurantFooter}>
                  <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
                  <TouchableOpacity 
                    style={styles.viewMenuButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/restaurant-detail?restaurantId=${restaurant.id}`);
                    }}
                  >
                    <Text style={styles.viewMenuText}>View Menu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E8 100%)',
    position: 'relative',
  },
  mapControls: {
    position: 'absolute',
    top: 20,
    right: 16,
    gap: 8,
    zIndex: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPin: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  currentLocationPin: {
    position: 'absolute',
    left: 200,
    top: 400,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  distanceCircle: {
    position: 'absolute',
    left: 100,
    top: 300,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.3)',
    borderStyle: 'dashed',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  restaurantTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  restaurantCount: {
    fontSize: 14,
    color: '#999',
  },
  restaurantScroll: {
    paddingLeft: 20,
  },
  restaurantScrollContent: {
    paddingRight: 20,
  },
  restaurantCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  restaurantImageContainer: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  viewMenuButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewMenuText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});