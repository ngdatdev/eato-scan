import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {

  const userStats = [
    { id: 1, count: '24', label: 'Reviews', color: '#6366F1' },
    { id: 2, count: '18', label: 'Favorites', color: '#10B981' },
    { id: 3, count: '42', label: 'Orders', color: '#F59E0B' },
  ];

  const activityItems = [
    {
      id: 1,
      title: 'My Reviews',
      subtitle: '24 reviews written',
      icon: 'star',
      iconBg: '#E0E7FF',
      iconColor: '#6366F1',
    },
    {
      id: 2,
      title: 'Favorites',
      subtitle: '18 saved items',
      icon: 'heart',
      iconBg: '#DCFCE7',
      iconColor: '#EF4444',
    },
    {
      id: 3,
      title: 'Order History',
      subtitle: '42 completed orders',
      icon: 'refresh',
      iconBg: '#D1FAE5',
      iconColor: '#10B981',
    },
  ];

  const settingsItems = [
    { id: 1, title: 'Account Settings', icon: 'person-outline' },
    { id: 2, title: 'Notifications', icon: 'notifications-outline' },
    { id: 3, title: 'Privacy Policy', icon: 'shield-outline' },
    { id: 4, title: 'Help & Support', icon: 'help-circle-outline' },
    { id: 5, title: 'About', icon: 'information-circle-outline' },
    { id: 6, title: 'Sign Out', icon: 'log-out-outline', isSignOut: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          
          <Text style={styles.headerTitle}>Profile</Text>
          
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
          </View>
          
          <Text style={styles.userName}>Sarah Johnson</Text>
          <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
          <Text style={styles.memberSince}>Member since 2022</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {userStats.map((stat) => (
            <View key={stat.id} style={styles.statItem}>
              <Text style={[styles.statCount, { color: stat.color }]}>{stat.count}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* My Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Activity</Text>
          
          {activityItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
              </View>
              
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {settingsItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.settingsItem, item.isSignOut && styles.signOutItem]}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={item.isSignOut ? '#EF4444' : '#6B7280'} 
              />
              
              <Text style={[
                styles.settingsTitle, 
                item.isSignOut && styles.signOutText
              ]}>
                {item.title}
              </Text>
              
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={item.isSignOut ? '#EF4444' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    backgroundColor: '#FF6B35',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: -30,
    paddingBottom: 30,
    backgroundColor: '#FF6B35',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutItem: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  settingsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 16,
  },
  signOutText: {
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 100,
  },
  headerSpacer: {
    width: 40,
  },
});