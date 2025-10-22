import { useAuth } from '@/context/auth-context';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/layout/haptic-tab';

export default function TabLayout() {
  const { user } = useAuth();

  // If no user is logged in, redirect to welcome screen
  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#9CA3AF',
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="capture/index"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name="camera" 
                size={22} 
                color={color}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
       <Tabs.Screen
        name="capture/dish-recognition"
        options={{
          href: null, // Ẩn khỏi tab bar
        }}
      />
      <Tabs.Screen
        name="capture/find-nearby-res"
        options={{
          href: null, // Ẩn khỏi tab bar
        }}
      />
      <Tabs.Screen
        name="restaurant-detail"
        options={{
          href: null, // Ẩn khỏi tab bar
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null, // Ẩn khỏi tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  activeTabIcon: {
    backgroundColor: '#FF6B35',
    width: 44,
    height: 36,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});