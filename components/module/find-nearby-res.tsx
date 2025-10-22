import { API_CONFIG, createUrl } from '@/constants/config';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Cache object to store search results
const searchCache: Record<string, any> = {};

const SkeletonPlaceCard = () => {
  const animatedValue = React.useMemo(() => new Animated.Value(0), []);
  const shimmerAnimatedValue = React.useMemo(() => new Animated.Value(-1), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Shimmer animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimatedValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimatedValue, {
          toValue: -1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue, shimmerAnimatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  // Tạo hiệu ứng shimmer
  const translateX = shimmerAnimatedValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-350, 350],
  });

  return (
    <View style={styles.restaurantCard}>
      <View style={styles.shimmerContainer}>
        <Animated.View 
          style={[
            styles.skeletonImage,
            styles.skeleton,
            { opacity }
          ]} 
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              transform: [{ translateX }]
            }
          ]}
        />
      </View>
      <View style={styles.restaurantInfo}>
        <View style={styles.shimmerContainer}>
          <Animated.View style={[styles.skeletonTitle, styles.skeleton, { opacity }]} />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: [{ translateX }]
              }
            ]}
          />
        </View>
        <View style={styles.shimmerContainer}>
          <Animated.View style={[styles.skeletonText, styles.skeleton, { opacity }]} />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: [{ translateX }]
              }
            ]}
          />
        </View>
        <View style={styles.shimmerContainer}>
          <Animated.View style={[styles.skeletonText, styles.skeleton, { opacity }]} />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: [{ translateX }]
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default function NearbyPlacesScreen() {
  const router = useRouter();
  const { initialSearch } = useLocalSearchParams<{ initialSearch: string }>();
  
  const [location, setLocation] = useState<any>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Set loading true by default
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  
  // Refs for managing API calls
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  // Debounced search handler
  const debouncedSearch = useCallback((text: string) => {
    setInputValue(text);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchText(text);
    }, 800); // Tăng delay lên 800ms để giảm số lần gọi API
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // ✅ Lấy vị trí hiện tại và tự động tìm địa điểm gần đó
  useEffect(() => {
    (async () => {
      setIsLoadingLocation(true);
      try {
        // Yêu cầu quyền truy cập vị trí
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        // Lấy vị trí hiện tại với độ chính xác cao
        const currentLoc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLoc.coords);

        // Use initial search if provided, otherwise use default search
        const searchQuery = initialSearch || 'quán ăn gần đây';
        setInputValue(searchQuery);
        setSearchText(searchQuery);
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    })();
  }, [initialSearch]);

  // ✅ Tự động gọi SerpAPI khi có vị trí
  useEffect(() => {
    if (!location || !searchText) return;

    let isActive = true; // Theo dõi component còn mounted không
    const controller = new AbortController();

    const fetchPlaces = async () => {
      // Check cache first
      const cacheKey = `${searchText}_${location.latitude}_${location.longitude}`;
      if (searchCache[cacheKey] && Date.now() - searchCache[cacheKey].timestamp < 5 * 60 * 1000) {
        if (isActive) {
          setPlaces(searchCache[cacheKey].data);
          setIsLoading(false);
        }
        return;
      }

      if (!isLoading && isActive) setIsLoading(true);
      
      try {
        // ⚡ Gọi qua proxy Express (chạy trên máy dev), thêm hl=vi để trả về tiếng Việt
        const url = createUrl(API_CONFIG.MAPS_API, {
          q: searchText,
          lat: location.latitude,
          lon: location.longitude,
          hl: 'vi'
        });

        const res = await fetch(url, {
          signal: controller.signal
        });
        const data = await res.json();
 
        if (!isActive) return; // Nếu component đã unmount thì không cập nhật state

        const results = data.local_results || [];
        if (results.length === 0) return;

        const mapped = results
          .filter((r: any) => r.gps_coordinates)
          .map((r: any, idx: number) => ({
            id: idx,
            name: r.title || '(Không tên)',
            address: r.address || '',
            lat: r.gps_coordinates.latitude,
            lng: r.gps_coordinates.longitude,
            rating: r.rating ? r.rating.toFixed(1) : '',
            reviews: r.reviews || 0,
            type: r.type || '',
            open_state: r.open_state || '',
            phone: r.phone || '',
            website: r.website || '',
            thumbnail: r.thumbnail || null,
            // fallback ảnh nếu không có thumbnail
            image: r.thumbnail ? { uri: r.thumbnail } : require('../../assets/images/restaurant1.png')
          }));

        // Cache kết quả với timestamp nếu request thành công
        if (isActive) {
          const cacheKey = `${searchText}_${location.latitude}_${location.longitude}`;
          searchCache[cacheKey] = {
            data: mapped.slice(0, 10),
            timestamp: Date.now()
          };
          setPlaces(mapped.slice(0, 10));
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          // Bỏ qua lỗi abort vì đây là hành động có chủ ý
          return;
        }
        console.error('SerpAPI fetch error:', err);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchPlaces();

    // Cleanup function
    return () => {
      isActive = false;
      controller.abort(); // Hủy request khi unmount hoặc deps thay đổi
    };
  }, [location, searchText, isLoading]);

  // Mở Google Maps khi click vào địa điểm
  const openInGoogleMaps = (place: any) => {
    const latLng = `${place.lat},${place.lng}`;
    const label = encodeURIComponent(place.name);

    if (Platform.OS === 'ios') {
      // Format cho Apple Maps
      Linking.openURL(`http://maps.apple.com/?q=${label}&ll=${latLng}`);
    } else {
      // Format cho Google Maps trên Android
      Linking.openURL(`geo:${latLng}?q=${latLng}(${label})`);
    }
  };

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
            placeholder="Search nearby (pho, coffee...)"
            placeholderTextColor="#999"
            value={inputValue}
            onChangeText={debouncedSearch}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
              }
              const trimmedText = inputValue.trim();
              setInputValue(trimmedText);
              setSearchText(trimmedText);
            }}
          />
          {inputValue ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }
                setInputValue('');
                setSearchText('');
                setPlaces([]);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Loading Location Overlay */}
      {isLoadingLocation && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <Ionicons name="location" size={24} color="#FF6B35" />
            <Text style={styles.loadingText}>Getting your location...</Text>
            <ActivityIndicator size="small" color="#FF6B35" style={{ marginLeft: 8 }} />
          </View>
        </View>
      )}

      {/* Places List */}
      <View style={styles.content}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantTitle}>Nearby Places</Text>
          <Text style={styles.restaurantCount}>{places.length} found</Text>
        </View>

        <ScrollView style={styles.restaurantList} showsVerticalScrollIndicator={false}>
          {(isLoading || isLoadingLocation) ? 
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonPlaceCard key={index} />
            ))
           : 
            places.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.restaurantCard}
              onPress={() => openInGoogleMaps(p)}
            >
              <View style={styles.restaurantImageContainer}>
                <Image source={p.image} style={styles.restaurantImage} />
                {p.rating && (
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{p.rating}</Text>
                  </View>
                )}
              </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{p.name}</Text>
                <Text style={styles.restaurantDetails}>{p.address}</Text>
                {p.open_state ? (
                  <Text style={{ color: '#388e3c', fontSize: 13 }}>{p.open_state}</Text>
                ) : null}
                {p.reviews ? (
                  <Text style={{ color: '#999', fontSize: 13 }}>{p.reviews} đánh giá</Text>
                ) : null}
                {p.type ? (
                  <Text style={{ color: '#666', fontSize: 13 }}>{p.type}</Text>
                ) : null}
                <TouchableOpacity 
                  style={styles.openInMapsButton}
                  onPress={() => openInGoogleMaps(p)}
                >
                  <Ionicons name="navigate" size={16} color="#fff" />
                  <Text style={styles.openInMapsText}>Navigate</Text>
                </TouchableOpacity>
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
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  restaurantList: {
    flex: 1,
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
    paddingRight: 32, // Để nút clear không đè lên text
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 4,
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
   customMarker: {
    backgroundColor: '#FF6B35',
    padding: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
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
  openInMapsButton: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  openInMapsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  skeleton: {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  skeletonTitle: {
    width: '80%',
    height: 24,
    marginBottom: 8,
  },
  skeletonText: {
    width: '60%',
    height: 16,
    marginBottom: 8,
  },
  shimmerContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  }
});