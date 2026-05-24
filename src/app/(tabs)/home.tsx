import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey Harshit,</Text>
            <Text style={styles.subtitle}>Let's keep your brain fresh today 🧠</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={36} color="#FF453A" />
          </TouchableOpacity>
        </View>

        {/* Brain Fry Level Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Brain Fry Level</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '35%' }]} />
            </View>
            <Text style={styles.progressText}>35% Fried</Text>
          </View>
          <Text style={styles.heroStatus}>Status: Mildly Roasted ☕</Text>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <Ionicons name="time-outline" size={24} color="#FF9500" />
            <Text style={styles.cardValue}>1h 45m</Text>
            <Text style={styles.cardLabel}>Screen Time</Text>
          </View>
          <View style={styles.gridCard}>
            <Ionicons name="ban-outline" size={24} color="#FF3B30" />
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardLabel}>Blocks Triggered</Text>
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#34C759" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Brain Saver Tip</Text>
            <Text style={styles.tipDescription}>
              You spent 45 minutes on Reels this morning. Try taking a 5-minute screen-free walk.
            </Text>
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  heroCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#2C2C2E',
    borderRadius: 6,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF453A',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF453A',
  },
  heroStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  tipContent: {
    marginLeft: 12,
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
});
