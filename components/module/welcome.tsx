import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navigate to main app (tabs)
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    // Navigate to login screen (you can create later)
    console.log('Navigate to Login');
    // For now, just go to main app
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Help Button */}
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="restaurant" size={48} color="#fff" />
          </View>
          <Text style={styles.appTitle}>EatoScan</Text>
        </View>

        {/* Phone Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneScreen}>
              {/* Food Icons */}
              <View style={styles.foodGrid}>
                <View style={[styles.foodIcon, { backgroundColor: '#FFD700', top: 20, left: 30 }]}>
                  <Text style={styles.emoji}>🍕</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#FF6B6B', top: 15, right: 25 }]}>
                  <Text style={styles.emoji}>🍓</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#4ECDC4', top: 60, left: 20 }]}>
                  <Text style={styles.emoji}>🥗</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#45B7D1', top: 80, right: 30 }]}>
                  <Text style={styles.emoji}>🍔</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#96CEB4', bottom: 80, left: 35 }]}>
                  <Text style={styles.emoji}>🥑</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#FFEAA7', bottom: 70, right: 20 }]}>
                  <Text style={styles.emoji}>🌮</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#DDA0DD', bottom: 40, left: 25 }]}>
                  <Text style={styles.emoji}>🍇</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#98D8C8', bottom: 35, right: 35 }]}>
                  <Text style={styles.emoji}>🥒</Text>
                </View>
                <View style={[styles.foodIcon, { backgroundColor: '#F7DC6F', bottom: 20, left: 50 }]}>
                  <Text style={styles.emoji}>😊</Text>
                </View>
              </View>
              
              {/* Scan Button */}
              <View style={styles.scanButton}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Discover food{'\n'}around you with AI</Text>
          <Text style={styles.subtitle}>
            Scan, explore, and find amazing{'\n'}
            dishes with the power of artificial{'\n'}
            intelligence
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Ionicons name="rocket-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Ionicons name="person-outline" size={20} color="#FF6B35" style={styles.buttonIcon} />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms &{'\n'}Privacy</Text>
          </Text>
        </View>
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
    paddingHorizontal: 24,
  },
  helpButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 8,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B4513',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  phoneFrame: {
    width: 200,
    height: 300,
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFA726',
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  foodGrid: {
    flex: 1,
    position: 'relative',
  },
  foodIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emoji: {
    fontSize: 16,
  },
  scanButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 40,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonSection: {
    gap: 16,
    marginBottom: 24,
  },
  getStartedButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  termsSection: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  termsLink: {
    color: '#FF6B35',
    fontWeight: '500',
  },
});