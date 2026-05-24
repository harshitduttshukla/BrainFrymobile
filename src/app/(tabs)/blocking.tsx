import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BlockingScreen() {
  const [strictMode, setStrictMode] = useState(false);
  const [apps, setApps] = useState([
    { id: '1', name: 'Instagram', icon: 'logo-instagram', color: '#E1306C', blocked: true },
    { id: '2', name: 'YouTube', icon: 'logo-youtube', color: '#FF0000', blocked: true },
    { id: '3', name: 'TikTok', icon: 'logo-tiktok', color: '#000000', blocked: false },
    { id: '4', name: 'Twitter / X', icon: 'logo-twitter', color: '#1DA1F2', blocked: false },
  ]);

  const toggleApp = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, blocked: !app.blocked } : app));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>App Blocker</Text>
          <Text style={styles.subtitle}>Block distracting applications in real-time</Text>
        </View>

        {/* Strict Mode Card */}
        <View style={[styles.card, strictMode && styles.cardActive]}>
          <View style={styles.row}>
            <View style={[styles.iconContainer, strictMode && styles.iconActive]}>
              <Ionicons name="shield-half" size={24} color={strictMode ? '#FFFFFF' : '#FF9500'} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Strict Mode</Text>
              <Text style={styles.cardDesc}>Prevents disabling blocks during active time limits.</Text>
            </View>
            <Switch
              value={strictMode}
              onValueChange={setStrictMode}
              trackColor={{ false: '#2C2C2E', true: '#FF9500' }}
              thumbColor={strictMode ? '#FFFFFF' : '#8E8E93'}
            />
          </View>
        </View>

        {/* App List Section */}
        <Text style={styles.sectionTitle}>Manage App Blocks</Text>
        <View style={styles.appListCard}>
          {apps.map((app, index) => (
            <View key={app.id}>
              <View style={styles.appRow}>
                <View style={[styles.appIconBg, { backgroundColor: app.color + '20' }]}>
                  {/* Fallback to simple icon since logo icons exist in Ionicons */}
                  <Ionicons name={app.icon as any} size={20} color={app.color === '#000000' ? '#FFFFFF' : app.color} />
                </View>
                <View style={styles.appDetails}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <Text style={styles.appStatus}>
                    {app.blocked ? 'Blocked' : 'Unblocked'}
                  </Text>
                </View>
                <Switch
                  value={app.blocked}
                  onValueChange={() => toggleApp(app.id)}
                  trackColor={{ false: '#2C2C2E', true: '#FF453A' }}
                  thumbColor={app.blocked ? '#FFFFFF' : '#8E8E93'}
                />
              </View>
              {index < apps.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Add Block Button */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.addButtonText}>Add custom app to block</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  cardActive: {
    borderColor: '#FF9500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconActive: {
    backgroundColor: '#FF9500',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  appListCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    marginBottom: 20,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  appIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  appStatus: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
  },
  addButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#3A3A3C',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
