import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function NearbyPlacesScreen() {
  const router = useRouter();
  const webViewRef = useRef<any>(null);

  const [location, setLocation] = useState<any>("fpt da nang");
  const [places, setPlaces] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  // Lấy vị trí hiện tại
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc.coords);
    })();
  }, []);

  // Gọi Photon API khi có search
  useEffect(() => {
    if (!location || !searchText) return;

    const fetchPlaces = async () => {
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          searchText
        )}&lat=${location.latitude}&lon=${location.longitude}&limit=10`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.features) return;

        const mapped = data.features.map((f: any, idx: number) => {
          const [lon, lat] = f.geometry.coordinates;
          return {
            id: idx,
            name: f.properties.name || "(No name)",
            city: f.properties.city || f.properties.country || "",
            lat,
            lng: lon,
            rating: (Math.random() * 1 + 4).toFixed(1), // fake rating
            image: require('@/assets/images/restaurant1.png'),
          };
        });

        setPlaces(mapped);

        // gửi danh sách marker xuống webview
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({ type: "markers", data: mapped }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlaces();
  }, [location, searchText]);

  // Gửi sự kiện focus vào marker
  const focusMarker = (place: any) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({ type: "focus", data: place }));
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
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {location && (
         <WebView
  ref={webViewRef}
  originWhitelist={['*']}
  javaScriptEnabled={true}
  injectedJavaScript={`
    (function() {
      let map = L.map('map', { zoomControl: true })
        .setView([${location.latitude}, ${location.longitude}], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      let you = L.marker([${location.latitude}, ${location.longitude}])
        .addTo(map).bindPopup("You are here").openPopup();

      let markers = {};

      // Nhận message từ React Native
      window.document.addEventListener('message', function(e) {
        let msg = JSON.parse(e.data);
        if (msg.type === "markers") {
          // clear markers cũ
          Object.values(markers).forEach(m => map.removeLayer(m));
          markers = {};
          msg.data.forEach(p => {
            let m = L.marker([p.lat, p.lng]).addTo(map).bindPopup(p.name);
            markers[p.id] = m;
          });
        }
        if (msg.type === "focus") {
          let p = msg.data;
          if (markers[p.id]) {
            map.flyTo([p.lat, p.lng], 20, { animate: true, duration: 1.5 });
            markers[p.id].openPopup();
          }
        }
      });
    })();
    true;
  `}
  source={{
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <style>
          html, body, #map {height:100%; margin:0; padding:0}
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      </body>
      </html>
    `,
  }}
  style={{ flex: 1 }}
/>

        )}
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantTitle}>Nearby Places</Text>
          <Text style={styles.restaurantCount}>{places.length} found</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {places.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.restaurantCard}
              onPress={() => focusMarker(p)}
            >
              <View style={styles.restaurantImageContainer}>
                <Image source={p.image} style={styles.restaurantImage} />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{p.rating}</Text>
                </View>
              </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{p.name}</Text>
                <Text style={styles.restaurantDetails}>{p.city}</Text>
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