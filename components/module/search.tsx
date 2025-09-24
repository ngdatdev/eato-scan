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

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    const searchResults = [
        {
            id: 1,
            name: 'Margherita Pizza',
            restaurant: 'Pizzeria Bella',
            price: '$16.99',
            rating: 4.9,
            reviews: 267,
            distance: '0.3 km',
            image: require('@/assets/images/pizza.png'),
        },
        {
            id: 2,
            name: 'Salmon Avocado Roll',
            restaurant: 'Sakura Sushi Bar',
            price: '$15.50',
            rating: 4.6,
            reviews: 89,
            distance: '1.2 km',
            image: require('@/assets/images/dish_home.png'),
        },
        {
            id: 3,
            name: 'Classic Beef Burger',
            restaurant: 'Burger House',
            price: '$9.99',
            rating: 4.5,
            reviews: 203,
            distance: '0.5 km',
            image: require('@/assets/images/burger.png'),
        },
        {
            id: 4,
            name: 'Salmon Poke Bowl',
            restaurant: 'Fresh Bowl Co.',
            price: '$13.75',
            rating: 4.7,
            reviews: 156,
            distance: '0.9 km',
            image: require('@/assets/images/dish_home.png'),
        },
        {
            id: 5,
            name: 'Chicken Tacos (3pc)',
            restaurant: 'El Mariachi',
            price: '$8.50',
            rating: 4.4,
            reviews: 78,
            distance: '1.5 km',
            image: require('@/assets/images/dish_home.png'),
        },
        {
            id: 6,
            name: 'Spaghetti Carbonara',
            restaurant: "Mario's Italian Kitchen",
            price: '$12.99',
            rating: 4.8,
            reviews: 124,
            distance: '0.8 km',
            image: require('@/assets/images/dish_home.png'),
        },
    ];

    const handleDishPress = (dishId: number) => {
        router.push('/capture/dish-recognition');
    };

    const handleLoadMore = () => {
        // Handle load more results
        console.log('Load more results');
    };

    return (
        <SafeAreaView style={styles.container}>


            {/* Filter and Sort */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={16} color="#666" />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sortButton}>
                    <Ionicons name="swap-vertical" size={16} color="#666" />
                    <Text style={styles.sortText}>Sort</Text>
                </TouchableOpacity>

                <Text style={styles.resultsCount}>128 results</Text>
            </View>

            {/* Search Results */}
            <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
                {searchResults.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.resultCard}
                        onPress={() => handleDishPress(item.id)}
                    >
                        <Image source={item.image} style={styles.resultImage} />

                        <View style={styles.resultContent}>
                            <View style={styles.resultHeader}>
                                <Text style={styles.resultName}>{item.name}</Text>
                                <Text style={styles.resultPrice}>{item.price}</Text>
                            </View>

                            <Text style={styles.resultRestaurant}>{item.restaurant}</Text>

                            <View style={styles.resultFooter}>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{item.rating}</Text>
                                    <Text style={styles.reviewsText}>({item.reviews})</Text>
                                </View>

                                <View style={styles.distanceContainer}>
                                    <Ionicons name="location-outline" size={14} color="#666" />
                                    <Text style={styles.distanceText}>{item.distance}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Load More Button */}
                <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                    <Text style={styles.loadMoreText}>Load more results</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    backButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
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
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        gap: 12,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    filterText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    sortText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    resultsCount: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: '#999',
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        margin: 12,
    },
    resultContent: {
        flex: 1,
        padding: 12,
        paddingLeft: 0,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    resultName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    resultPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B35',
    },
    resultRestaurant: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    resultFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    reviewsText: {
        fontSize: 12,
        color: '#666',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        fontSize: 12,
        color: '#666',
    },
    loadMoreButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#FF6B35',
        borderRadius: 25,
        paddingVertical: 16,
        marginVertical: 20,
        marginBottom: 100, // Space for tab bar
    },
    loadMoreText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B35',
    },
});