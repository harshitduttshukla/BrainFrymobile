import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBlock } from '../../context/BlockContext';

export default function HomeScreen() {
  const { shortsReelsBlocked, strictMode, apps } = useBlock();

  // Dynamic statistics based on whether Reels blocker is active
  const screenTime = shortsReelsBlocked ? '1h 00m' : '1h 45m';
  const blocksTriggered = shortsReelsBlocked ? '19' : '12';
  const brainFryPercentage = shortsReelsBlocked ? '20%' : '35%';
  const brainFryText = shortsReelsBlocked ? '20% Fried' : '35% Fried';
  const brainFryStatus = shortsReelsBlocked ? 'Status: Cool and Collected 🧊' : 'Status: Mildly Roasted ☕';

  const activeApps = apps.filter(app => app.blocked);
  const totalActiveBlockers = (shortsReelsBlocked ? 1 : 0) + (strictMode ? 1 : 0) + activeApps.length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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
              <View style={[styles.progressBarFill, { width: brainFryPercentage }]} />
            </View>
            <Text style={styles.progressText}>{brainFryText}</Text>
          </View>
          <Text style={styles.heroStatus}>{brainFryStatus}</Text>
        </View>

        {/* Focus Guards (Active Blockers Status) */}
        <View style={styles.activeBlockersCard}>
          <Text style={styles.activeBlockersTitle}>Active Focus Guards</Text>
          <View style={styles.badgeRow}>
            {shortsReelsBlocked && (
              <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 45, 85, 0.15)' }]}>
                <Ionicons name="videocam-off" size={14} color="#FF2D55" style={{ marginRight: 4 }} />
                <Text style={[styles.statusBadgeText, { color: '#FF2D55' }]}>Reels/Shorts Blocked</Text>
              </View>
            )}
            {strictMode && (
              <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 149, 0, 0.15)' }]}>
                <Ionicons name="shield-half" size={14} color="#FF9500" style={{ marginRight: 4 }} />
                <Text style={[styles.statusBadgeText, { color: '#FF9500' }]}>Strict Mode Active</Text>
              </View>
            )}
            {activeApps.map(app => (
              <View key={app.id} style={[styles.statusBadge, { backgroundColor: app.color + '20' }]}>
                <Ionicons name={app.icon as any} size={14} color={app.color === '#000000' ? '#FFFFFF' : app.color} style={{ marginRight: 4 }} />
                <Text style={[styles.statusBadgeText, { color: app.color === '#000000' ? '#FFFFFF' : app.color }]}>{app.name}</Text>
              </View>
            ))}
            {totalActiveBlockers === 0 && (
              <Text style={styles.noBlockersText}>No active focus guards. Your attention is vulnerable!</Text>
            )}
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <Ionicons name="time-outline" size={24} color="#FF9500" />
            <Text style={styles.cardValue}>{screenTime}</Text>
            <Text style={styles.cardLabel}>Screen Time</Text>
          </View>
          <View style={styles.gridCard}>
            <Ionicons name="ban-outline" size={24} color="#FF3B30" />
            <Text style={styles.cardValue}>{blocksTriggered}</Text>
            <Text style={styles.cardLabel}>Blocks Triggered</Text>
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#34C759" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Brain Saver Tip</Text>
            {shortsReelsBlocked ? (
              <Text style={styles.tipDescription}>
                Shorts & Reels Blocker is active! Excellent choice. Your focus has been protected from high-dopamine loops today.
              </Text>
            ) : (
              <Text style={styles.tipDescription}>
                You spent 45 minutes on Reels this morning. Try enabling the Reels & Shorts Blocker in the Blocking tab to protect your focus.
              </Text>
            )}
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
    paddingBottom: 100,
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
  activeBlockersCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    marginBottom: 20,
  },
  activeBlockersTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noBlockersText: {
    fontSize: 13,
    color: '#8E8E93',
    fontStyle: 'italic',
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
