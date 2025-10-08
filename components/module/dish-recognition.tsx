"use client"

import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function DishRecognitionScreen() {
  const router = useRouter()
  const { photoUri, name, description } = useLocalSearchParams<{
    photoUri?: string
    name?: string
    description?: string
  }>()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <LinearGradient colors={["#fff", "#f8f8f8"]} style={styles.header}>
        <Text style={styles.headerTitle}>Dish Recognition</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Ảnh món ăn */}
        {photoUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photoUri }} style={styles.dishImage} resizeMode="cover" />
          </View>
        )}

        {/* Thông tin món ăn */}
        <View style={styles.resultContainer}>
          <Text style={styles.dishName}>{name || "Unknown Dish"}</Text>
          <Text style={styles.dishDescription}>
            {description || "We couldn't retrieve the description for this dish."}
          </Text>
        </View>

        {/* Nút hành động */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.retakeButton} onPress={() => router.back()}>
            <Text style={styles.retakeText}>🔁 Scan Another Dish</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.doneButton} 
            onPress={() => {
              const searchQuery = `quán ${name || ''} ${description || ''}`.trim();
              router.push({
                pathname: "/(tabs)/capture/find-nearby-res",
                params: { initialSearch: searchQuery }
              });
            }}
          >
            <Text style={styles.doneText}>Find near restaurant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 12,
    textAlign: "center",
  },
  dishDescription: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 22,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    gap: 14,
  },
  retakeButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  retakeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  doneButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
