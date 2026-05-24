import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  const weeklyData = [
    { day: 'Mon', hours: 4.5, percentage: 65, color: '#FF3B30' },
    { day: 'Tue', hours: 3.2, percentage: 46, color: '#FF9500' },
    { day: 'Wed', hours: 5.1, percentage: 73, color: '#FF3B30' },
    { day: 'Thu', hours: 2.0, percentage: 28, color: '#34C759' },
    { day: 'Fri', hours: 1.8, percentage: 25, color: '#34C759' },
    { day: 'Sat', hours: 6.0, percentage: 86, color: '#FF3B30' },
    { day: 'Sun', hours: 3.5, percentage: 50, color: '#FF9500' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Analyze your focus and screen addiction</Text>
        </View>

        {/* Focus Score Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Average Brain Health Score</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreNumber}>72%</Text>
            <View style={styles.badge}>
              <Ionicons name="trending-up" size={14} color="#34C759" style={{ marginRight: 4 }} />
              <Text style={styles.badgeText}>+8% this week</Text>
            </View>
          </View>
          <Text style={styles.scoreDesc}>
            Your brain was 8% less fried compared to last week. Good job keeping away from Reels!
          </Text>
        </View>

        {/* Custom Weekly Bar Chart */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Screentime (Hours)</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((data, index) => (
              <View key={index} style={styles.chartCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${data.percentage}%`, backgroundColor: data.color }]} />
                </View>
                <Text style={styles.chartHours}>{data.hours}h</Text>
                <Text style={styles.chartDay}>{data.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dopamine Source Breakdown</Text>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLabelContainer}>
              <View style={[styles.bullet, { backgroundColor: '#FF3B30' }]} />
              <Text style={styles.breakdownLabel}>Short-form Videos (Reels/Shorts)</Text>
            </View>
            <Text style={styles.breakdownValue}>58%</Text>
          </View>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLabelContainer}>
              <View style={[styles.bullet, { backgroundColor: '#FF9500' }]} />
              <Text style={styles.breakdownLabel}>Social Feeds (Infinite Scroll)</Text>
            </View>
            <Text style={styles.breakdownValue}>27%</Text>
          </View>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLabelContainer}>
              <View style={[styles.bullet, { backgroundColor: '#34C759' }]} />
              <Text style={styles.breakdownLabel}>Productive Work & Study</Text>
            </View>
            <Text style={styles.breakdownValue}>15%</Text>
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
  cardTitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  badgeText: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreDesc: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 10,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    width: 14,
    height: 120,
    backgroundColor: '#2C2C2E',
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  chartHours: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  chartDay: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  breakdownLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
