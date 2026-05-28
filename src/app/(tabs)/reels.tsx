import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBlock } from '../../context/BlockContext';
import { router } from 'expo-router';

export default function ReelsScreen() {
  const { shortsReelsBlocked, strictMode } = useBlock();
  const [frictionEnabled, setFrictionEnabled] = useState(true);
  const [sessionLimit, setSessionLimit] = useState(15);

  if (shortsReelsBlocked) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.blockedContainer}>
          <View style={styles.lockIconBg}>
            <Ionicons name="lock-closed" size={32} color="#FF2D55" />
          </View>
          <Text style={styles.blockedTitle}>Dopamine Detox Active</Text>
          <Text style={styles.blockedSubtitle}>
            Short-form videos (Reels & YouTube Shorts) are currently blocked to protect your attention span and keep your mind clear.
          </Text>

          <View style={styles.blockedCard}>
            <View style={styles.blockedCardHeader}>
              <Ionicons name="shield-checkmark" size={20} color="#34C759" style={{ marginRight: 8 }} />
              <Text style={styles.blockedCardTitle}>Focus Guard Engaged</Text>
            </View>
            <Text style={styles.blockedCardDesc}>
              By blocking Reels and Shorts, you save an average of 45 minutes of screen time daily. Focus on what truly matters!
            </Text>
          </View>

          {strictMode ? (
            <View style={styles.strictModeBadge}>
              <Ionicons name="shield-half" size={16} color="#FF9500" style={{ marginRight: 6 }} />
              <Text style={styles.strictModeText}>Strict Mode is Active — No unblocking allowed</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.configureButton}
              onPress={() => router.push('/(tabs)/blocking')}
            >
              <Text style={styles.configureButtonText}>Configure Settings</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reels Friction</Text>
          <Text style={styles.subtitle}>Add minor friction to break dopamine loops</Text>
        </View>

        {/* Feature status card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="infinite-outline" size={24} color="#FF3B30" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Friction Delay</Text>
              <Text style={styles.cardDesc}>Adds a 5-second countdown before opening Instagram/YouTube Reels.</Text>
            </View>
            <Switch
              value={frictionEnabled}
              onValueChange={setFrictionEnabled}
              trackColor={{ false: '#2C2C2E', true: '#FF453A' }}
              thumbColor={frictionEnabled ? '#FFFFFF' : '#8E8E93'}
            />
          </View>
        </View>

        {/* Limits Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Session Limit</Text>
          <Text style={styles.sectionSubtitle}>Lock reels after reaching the limit</Text>
          <View style={styles.selector}>
            {[10, 15, 30, 45].map((mins) => (
              <TouchableOpacity
                key={mins}
                style={[
                  styles.optionButton,
                  sessionLimit === mins && styles.optionButtonActive,
                ]}
                onPress={() => setSessionLimit(mins)}
              >
                <Text
                  style={[
                    styles.optionText,
                    sessionLimit === mins && styles.optionTextActive,
                  ]}
                >
                  {mins}m
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reels stats */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Reels Activity</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Attempts intercepted</Text>
            <Text style={styles.statVal}>8 times</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Saves (closed on delay)</Text>
            <Text style={[styles.statVal, { color: '#34C759' }]}>5 times</Text>
          </View>
        </View>
      </View>
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
    flex: 1,
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 16,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  optionButtonActive: {
    backgroundColor: '#FF453A',
    borderColor: '#FF453A',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statVal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginVertical: 12,
  },
  blockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 100,
    backgroundColor: '#000000',
  },
  lockIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 45, 85, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 85, 0.2)',
  },
  blockedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  blockedSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  blockedCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    width: '100%',
    marginBottom: 32,
  },
  blockedCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockedCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  blockedCardDesc: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  configureButton: {
    backgroundColor: '#FF2D55',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: '100%',
  },
  configureButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  strictModeBadge: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 149, 0, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
  },
  strictModeText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '600',
  },
});
