import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CaptureScreen = () => {
  const router = useRouter();

  const handleCapture = () => {
    // Navigate to dish recognition screen
    router.push('/capture/dish-recognition');
  };

  const handleGalleryPick = () => {
    // Navigate to dish recognition screen
    router.push('/capture/dish-recognition');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🍴</Text>
          </View>
          <Text style={styles.logoText}>EatoScan</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
 
      {/* Camera Frame Area */}
      <View style={styles.cameraSection}>
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.gradientBackground}
        >
          <TouchableOpacity style={styles.cameraFrame} onPress={handleCapture} activeOpacity={0.9}>
            {/* Corner frames */}
            <View style={styles.cornerFrames}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
            </View>
            
            {/* Pizza/Food Image */}
            <View style={styles.foodImageContainer}>
              <TouchableOpacity onPress={handleCapture} activeOpacity={0.8}>
                <Image
                  source={{
                    uri: '@/assets/images/background_cap2.png'
                  }}
                  style={styles.foodImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              
              {/* Dotted overlay frame */}
              <View style={styles.dottedFrame} />
              
              {/* Center capture indicator */}
              <View style={styles.captureIndicator}>
                <View style={styles.captureIcon} />
                <Text style={styles.captureText}>Position dish in frame</Text>
              </View>
            </View>
            
            {/* Bottom corner frames */}
            <View style={styles.cornerFrames}>
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </TouchableOpacity>
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
          {/* Gallery button */}
          <TouchableOpacity style={styles.sideButton} onPress={handleGalleryPick}>
            <View style={styles.sideButtonContent}>
              <View style={styles.galleryIconBg}>
                <Text style={styles.simpleIcon}>🖼️</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Main capture button */}
          <TouchableOpacity style={styles.mainCaptureButton} onPress={handleCapture}>
            <View style={styles.captureButtonInner}>
              <View style={styles.cameraIconContainer}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Flash button */}
          <TouchableOpacity style={styles.sideButton}>
            <View style={styles.sideButtonContent}>
              <View style={styles.flashIconBg}>
                <Text style={styles.simpleIcon}>⚡</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Browse Gallery */}
        <TouchableOpacity style={styles.galleryOption} onPress={handleGalleryPick}>
          <Text style={styles.galleryIcon}>📁</Text>
          <Text style={styles.galleryText}>Browse Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  settingsButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 12,
  },
  settingsIcon: {
    fontSize: 16,
  },
  cameraSection: {
    flex: 1,
    marginVertical: 0,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cameraFrame: {
    width: '85%',
    aspectRatio: 1,
    position: 'relative',
  },
  cornerFrames: {
    position: 'absolute',
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  corner: {
    width: 30,
    height: 30,
    borderColor: '#ffffff99',
    borderWidth: 4,
  },
  topLeft: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
    top: 0,
  },
  topRight: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    top: 0,
  },
  bottomLeft: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    bottom: 0,
    position: 'absolute',
    left: 0,
  },
  bottomRight: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
  foodImageContainer: {
    flex: 1,
    margin: 15,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  dottedFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#ffffff80',
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  captureIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -20 }],
    alignItems: 'center',
  },
  captureIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    marginBottom: 8,
  },
  captureText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  titleSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
  },
  controlsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sideButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 35,
    padding: 20,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sideButtonIcon: {
    fontSize: 20,
  },
  mainCaptureButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 40,
    padding: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  captureButtonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonIcon: {
    fontSize: 24,
  },
  galleryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  galleryIcon: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.7,
  },
  galleryText: {
    fontSize: 14,
    color: '#6B7280',
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
  sideButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 22,
    height: 22,
    tintColor: '#6B7280',
  },
  cameraIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLens: {
    width: 12,
    height: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  folderIconContainer: {
    marginRight: 8,
  },
  folderIcon: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
  },
  logoIconImage: {
    width: 16,
    height: 16,
    tintColor: '#ffffff',
  },
  settingsIconImage: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
  },
  galleryIconBg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashIconBg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  cameraIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
});

export default CaptureScreen;
