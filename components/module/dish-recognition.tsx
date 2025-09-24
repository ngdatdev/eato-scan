import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DishRecognitionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dish Recognition</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Food Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center'
            }}
            style={styles.foodImage}
            resizeMode="cover"
          />
          
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>

        {/* Dish Info Section */}
        <View style={styles.dishInfoSection}>
          <Text style={styles.dishName}>Margherita Pizza</Text>
          
          <Text style={styles.dishDescription}>
            A classic Italian pizza topped with fresh tomato sauce, creamy mozzarella cheese, and aromatic basil leaves. This traditional recipe originated in Naples and represents the colors of the Italian flag.
          </Text>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <View style={styles.starsContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.starEmpty}>☆</Text>
              <Text style={styles.ratingValue}>4.8</Text>
            </View>
            <Text style={styles.reviewsCount}>2,847 reviews</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          {/* Primary Button */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.primaryButtonText}>Find Nearby Restaurants</Text>
          </TouchableOpacity>

          {/* Secondary Buttons */}
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryIcon}>🍽️</Text>
              <Text style={styles.secondaryButtonText}>Similar Dishes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryIcon}>❤️</Text>
              <Text style={styles.secondaryButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrition Info */}
        <View style={styles.nutritionSection}>
          <Text style={styles.nutritionTitle}>Nutrition Information</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>285</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>12g</Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>36g</Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>10g</Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItems}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={[styles.navText, styles.navTextInactive]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/capture')}>
            <Text style={styles.navIconActive}>📷</Text>
            <Text style={[styles.navText, styles.navTextActive]}>Scan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>❤️</Text>
            <Text style={[styles.navText, styles.navTextInactive]}>Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={[styles.navText, styles.navTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 24,
    color: '#2D3748',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  shareButton: {
    padding: 4,
  },
  shareIcon: {
    fontSize: 24,
    color: '#2D3748',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  foodImage: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: 40,
    right: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingIcon: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 4,
  },
  dishInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  dishName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  dishDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 2,
  },
  starEmpty: {
    fontSize: 16,
    color: '#E5E7EB',
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  reviewsCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  actionButtonsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  secondaryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  nutritionSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 8,
    paddingTop: 24,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomNav: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 18,
    marginBottom: 4,
    opacity: 1,
  },
  navText: {
    fontSize: 12,
  },
  navTextActive: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  navTextInactive: {
    color: '#9CA3AF',
  },
});

export default DishRecognitionScreen;