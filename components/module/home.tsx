import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

export default function HomeScreen() {
    const recommendedDishes = [
        {
            id: 1,
            name: 'Creamy Pasta Carbonara',
            restaurant: 'Italian Bistro',
            distance: '0.8 km',
            price: '$12.99',
            rating: '4.8',
            image: require('@/assets/images/dish_home.png'),
        },
        {
            id: 2,
            name: 'Salmon Roll',
            restaurant: 'Sushi House',
            distance: '1.2 km',
            price: '$15.50',
            rating: '4.6',
            image: require('@/assets/images/dish_home.png'),
        },
    ];

    const popularDishes = [
        {
            id: 1,
            name: 'Classic Burger',
            restaurant: 'Burger Joint',
            price: '$8.99',
            image: require('@/assets/images/burger.png'),
        },
        {
            id: 2,
            name: 'Margherita Pizza',
            restaurant: 'Pizza Corner',
            price: '$14.50',
            image: require('@/assets/images/pizza.png'),
        },
        {
            id: 3,
            name: 'Caesar Salad',
            restaurant: 'Green Garden',
            price: '$9.99',
            image: require('@/assets/images/dish_home.png'),
        },
    ];

    const handleSearchPress = () => {
        router.push('/search');
    };

    const handleDishPress = (dishId: number) => {
        // Navigate to dish detail or scan page
        router.push('/capture/dish-recognition');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="restaurant" size={20} color="#fff" />
                        </View>
                        <Text style={styles.appName}>EatoScan</Text>
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
                        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search dishes, restaurants..."
                            placeholderTextColor="#999"
                        />
                    </TouchableOpacity>
                </View>

                {/* Greeting Section */}
                <View style={styles.greetingSection}>
                    <View style={styles.greetingLeft}>
                        <Text style={styles.greetingTitle}>Good Morning!</Text>
                        <Text style={styles.greetingSubtitle}>What would you like to eat today?</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('@/assets/images/dish_home.png')}
                            style={styles.avatar}
                        />
                    </View>
                </View>

                {/* Recommended Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended for You</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {recommendedDishes.map((dish) => (
                            <TouchableOpacity
                                key={dish.id}
                                style={styles.recommendedCard}
                                onPress={() => handleDishPress(dish.id)}
                            >
                                <View style={styles.cardImageContainer}>
                                    <Image source={dish.image} style={styles.cardImage} />
                                    <View style={styles.ratingBadge}>
                                        <Text style={styles.ratingText}>{dish.rating}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.addButton}>
                                        <Ionicons name="add" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.cardContent}>
                                    <Text style={styles.dishName}>{dish.name}</Text>
                                    <Text style={styles.restaurantInfo}>{dish.restaurant} • {dish.distance}</Text>
                                    <Text style={styles.price}>{dish.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Nearby Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Nearby</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {popularDishes.map((dish) => (
                            <TouchableOpacity
                                key={dish.id}
                                style={styles.popularCard}
                                onPress={() => handleDishPress(dish.id)}
                            >
                                <Image source={dish.image} style={styles.popularCardImage} />
                                <View style={styles.popularCardContent}>
                                    <Text style={styles.popularDishName}>{dish.name}</Text>
                                    <Text style={styles.popularRestaurant}>{dish.restaurant}</Text>
                                    <Text style={styles.popularPrice}>{dish.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
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
    scrollContainer: {
        paddingBottom: 100, // Space for tab bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        width: 32,
        height: 32,
        backgroundColor: '#FF6B35',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    appName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    filterButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 48,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    greetingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    greetingLeft: {
        flex: 1,
    },
    greetingTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    greetingSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    avatarContainer: {
        marginLeft: 15,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    seeAllText: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '500',
    },
    horizontalScroll: {
        paddingLeft: 20,
    },
    recommendedCard: {
        width: 200,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    addButton: {
        position: 'absolute',
        bottom: -12,
        right: 12,
        width: 24,
        height: 24,
        backgroundColor: '#FF6B35',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        padding: 15,
    },
    dishName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    restaurantInfo: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B35',
    },
    popularCard: {
        width: 140,
        marginRight: 15,
    },
    popularCardImage: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },
    popularCardContent: {
        paddingHorizontal: 4,
    },
    popularDishName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    popularRestaurant: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    popularPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF6B35',
    },
});