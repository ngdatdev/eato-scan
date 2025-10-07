"use client"

import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

// eslint-disable-next-line import/no-unresolved
import * as ExpoCamera from "expo-camera"
import * as ImagePicker from "expo-image-picker"

const CaptureScreen = () => {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const cameraRef = useRef<any>(null)
  const [cameraType, setCameraType] = useState<"back" | "front">("back")
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { status } = await ExpoCamera.Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted")
      } catch (err) {
        console.warn(err)
        setHasPermission(false)
      }
    })()
  }, [])

  const resolveCameraComponent = () => {
    let AnyCamera: any = (ExpoCamera as any).CameraView ?? (ExpoCamera as any).default ?? (ExpoCamera as any).Camera
    if (!AnyCamera) {
      try {
        // Try requiring the built CameraView as a fallback
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mod = require("expo-camera/build/CameraView")
        AnyCamera = mod && (mod.default ?? mod.CameraView ?? mod.Camera)
      } catch (e) {
        // ignore
      }
    }
    return AnyCamera
  }

  const handleCapture = async () => {
    if (isCapturing || capturedPhotoUri) return
    if (cameraRef.current && cameraRef.current.takePictureAsync) {
      setIsCapturing(true)
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7, base64: false })
        setCapturedPhotoUri(photo.uri)
        return
      } catch (err) {
        console.warn("takePictureAsync error", err)
        Alert.alert("Error", "Failed to take picture")
      } finally {
        setIsCapturing(false)
      }
    }

    // fallback navigation if API missing
    router.push("/capture/dish-recognition")
  }

  const handleRetake = () => {
    setCapturedPhotoUri(null)
  }

  const handleUsePhoto = () => {
    if (capturedPhotoUri) {
      router.push({ pathname: "/capture/dish-recognition", params: { photoUri: capturedPhotoUri } })
    } else {
      router.push("/capture/dish-recognition")
    }
  }

  const handleGalleryPick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission required", "Gallery access is required to choose a photo.")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // expo-image-picker v14+ returns assets array
        const uri = (result as any).assets ? (result as any).assets[0].uri : (result as any).uri
        if (uri) setCapturedPhotoUri(uri)
      }
    } catch (err) {
      console.warn("gallery pick error", err)
      Alert.alert("Error", "Could not open gallery")
    }
  }

  const AnyCamera = resolveCameraComponent()
  const cameraIsRenderable = AnyCamera && (typeof AnyCamera === "function" || Boolean((AnyCamera as any).$$typeof))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Camera Frame Area */}
      <View style={styles.cameraSection}>
        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}>
          <View style={styles.cameraFrame}>
            <View style={styles.cornerFrames}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
            </View>

            <Text style={styles.cameraInstruction}>Align the dish inside the frame</Text>

            <View style={styles.foodImageContainer}>
              {hasPermission === null ? (
                <View style={[styles.foodImage, { justifyContent: "center", alignItems: "center" }]}>
                  <Text style={{ color: "#fff" }}>Requesting camera permission...</Text>
                </View>
              ) : hasPermission === false ? (
                <TouchableOpacity
                  onPress={() => Alert.alert("Camera permission", "Please enable camera permission from settings")}
                  activeOpacity={0.8}
                >
                  <View style={[styles.foodImage, { justifyContent: "center", alignItems: "center" }]}>
                    <Text style={{ color: "#fff" }}>Camera access denied</Text>
                  </View>
                </TouchableOpacity>
              ) : cameraIsRenderable ? (
                capturedPhotoUri ? (
                  <Image source={{ uri: capturedPhotoUri }} style={styles.foodImage} resizeMode="cover" />
                ) : (
                  <AnyCamera
                    style={styles.foodImage}
                    facing={cameraType}
                    ref={(ref: any) => {
                      cameraRef.current = ref
                    }}
                  />
                )
              ) : (
                <View style={[styles.foodImage, { justifyContent: "center", alignItems: "center" }]}>
                  <Text style={{ color: "#fff" }}>Camera component not available</Text>
                </View>
              )}

              <View style={styles.dottedFrame} />
            </View>

            <View style={styles.cornerFrames}>
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Scan Your Dish</Text>
        <Text style={styles.subtitle}>
          Point your camera at any dish or upload a photo to get instant nutrition information
        </Text>
      </View>

      {/* Camera Controls */}
      <View style={styles.controlsSection}>
        <View style={styles.cameraControls}>
          {/* 📁 Chọn ảnh từ thư viện */}
          <TouchableOpacity style={styles.sideButton} onPress={handleGalleryPick}>
            <View style={styles.sideButtonContent}>
              <View style={styles.galleryIconBg}>
                <Text style={styles.simpleIcon}>🖼️</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 📸 Nút chụp ảnh */}
          <TouchableOpacity
            style={[styles.mainCaptureButton, capturedPhotoUri ? { opacity: 0.7 } : {}]}
            onPress={handleCapture}
            disabled={isCapturing || Boolean(capturedPhotoUri)}
          >
            <View style={styles.captureButtonInner}>
              <View style={styles.cameraIconContainer}>
                <Text style={styles.cameraIcon}>{isCapturing ? "⏳" : "📷"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 🔁 Đổi camera trước/sau */}
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setCameraType((t) => (t === "back" ? "front" : "back"))}
          >
            <View style={styles.sideButtonContent}>
              <View style={styles.flashIconBg}>
                <Text style={styles.simpleIcon}>🔁</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 📸 Hành động sau khi đã chụp ảnh */}
        {capturedPhotoUri && (
          <View style={styles.previewActionsInline}>
            <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.useButton} onPress={handleUsePhoto}>
              <Text style={styles.useText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 16,
    color: "#ffffff",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
  },
  settingsButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    padding: 12,
  },
  settingsIcon: {
    fontSize: 16,
  },
  cameraSection: {
    flex: 1,
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraFrame: {
    width: "100%",
    maxWidth: 380,
    aspectRatio: 0.95,
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  cornerFrames: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
    padding: 16,
  },
  corner: {
    width: 32,
    height: 32,
    borderColor: "#FF6B35",
    borderWidth: 3,
  },
  topLeft: {
    position: "absolute",
    top: 16,
    left: 16,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
  },
  topRight: {
    position: "absolute",
    top: 16,
    right: 16,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 16,
    left: 16,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 4,
  },
  bottomRight: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 4,
  },
  cameraInstruction: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 4,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  foodImageContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  dottedFrame: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "rgba(255,107,53,0.3)",
    borderStyle: "dashed",
    borderRadius: 16,
  },
  titleSection: {
    backgroundColor: "#ffffff",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 8,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  controlsSection: {
    backgroundColor: "#ffffff",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  cameraControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sideButton: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 12,
    marginHorizontal: 14,
    elevation: 6,
    shadowColor: "rgba(0,0,0,0.12)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  sideButtonIcon: {
    fontSize: 20,
  },
  mainCaptureButton: {
    backgroundColor: "#ffffff",
    borderRadius: 44,
    padding: 8,
    elevation: 8,
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  captureButtonInner: {
    backgroundColor: "#FF6B35",
    borderRadius: 32,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  captureButtonIcon: {
    fontSize: 20,
    color: "#fff",
  },
  galleryOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  galleryIcon: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.7,
  },
  galleryText: {
    fontSize: 14,
    color: "#6B7280",
  },
  bottomNav: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
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
    color: "#FF6B35",
    fontWeight: "500",
  },
  navTextInactive: {
    color: "#9CA3AF",
  },
  sideButtonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 22,
    height: 22,
    tintColor: "#6B7280",
  },
  cameraIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cameraLens: {
    width: 12,
    height: 12,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  folderIconContainer: {
    marginRight: 8,
  },
  folderIcon: {
    width: 16,
    height: 16,
    tintColor: "#6B7280",
  },
  logoIconImage: {
    width: 16,
    height: 16,
    tintColor: "#ffffff",
  },
  settingsIconImage: {
    width: 16,
    height: 16,
    tintColor: "#6B7280",
  },
  galleryIconBg: {
    alignItems: "center",
    justifyContent: "center",
  },
  flashIconBg: {
    alignItems: "center",
    justifyContent: "center",
  },
  simpleIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  cameraIcon: {
    fontSize: 20,
    color: "#FF6B35",
  },
  previewActionsInline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingHorizontal: 20,
    gap: 12,
  },
  retakeButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "rgba(0,0,0,0.12)",
  },
  useButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "rgba(0,0,0,0.18)",
  },
  retakeText: {
    color: "#111827",
    fontWeight: "600",
  },
  useText: {
    color: "#fff",
    fontWeight: "600",
  },
})

export default CaptureScreen
