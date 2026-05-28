import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Alert, Platform, NativeModules } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBlock } from '../../context/BlockContext';

export default function BlockingScreen() {
  const {
    strictMode,
    setStrictMode,
    apps,
    toggleApp,
    shortsReelsBlocked,
    setShortsReelsBlocked,
  } = useBlock();

  const handleShortsReelsToggle = (value: boolean) => {
    if (strictMode && !value) {
      Alert.alert(
        'Strict Mode Active',
        'You cannot disable blocks while Strict Mode is enabled. Turn off Strict Mode first to make changes.',
        [{ text: 'OK' }]
      );
      return;
    }
    setShortsReelsBlocked(value);
  };

  const handleAppToggle = (id: string, currentBlocked: boolean) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    if (shortsReelsBlocked && (app.name === 'Instagram' || app.name === 'YouTube' || app.name === 'TikTok') && currentBlocked) {
      Alert.alert(
        'Shorts & Reels Blocker Active',
        `You cannot unblock ${app.name} because the Shorts & Reels Blocker is active. Turn it off first to manage individual apps.`,
        [{ text: 'OK' }]
      );
      return;
    }

    if (strictMode && currentBlocked) {
      Alert.alert(
        'Strict Mode Active',
        'You cannot disable blocks while Strict Mode is enabled. Turn off Strict Mode first to make changes.',
        [{ text: 'OK' }]
      );
      return;
    }
    toggleApp(id);
  };

  const handleStrictModeToggle = (value: boolean) => {
    setStrictMode(value);
  };

  const handleOpenAccessibilitySettings = () => {
    if (Platform.OS === 'android' && NativeModules.AppBlocker) {
      try {
        NativeModules.AppBlocker.openAccessibilitySettings();
      } catch (error) {
        Alert.alert('Error', 'Could not open accessibility settings. Please open Settings manually.');
      }
    } else {
      Alert.alert('Blocker Unavailable', 'The native blocking service is only available in custom Android development builds.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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
              onValueChange={handleStrictModeToggle}
              trackColor={{ false: '#2C2C2E', true: '#FF9500' }}
              thumbColor={strictMode ? '#FFFFFF' : '#8E8E93'}
            />
          </View>
        </View>

        {/* Shorts & Reels Blocker Card */}
        <View style={[styles.card, shortsReelsBlocked && styles.cardActiveReels]}>
          <View style={styles.row}>
            <View style={[styles.iconContainer, styles.iconContainerReels, shortsReelsBlocked && styles.iconActiveReels]}>
              <Ionicons name="videocam-off" size={24} color={shortsReelsBlocked ? '#FFFFFF' : '#FF2D55'} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Shorts & Reels Blocker</Text>
              <Text style={styles.cardDesc}>Hides and restricts access to short-form video sections (Reels, Shorts).</Text>
            </View>
            <Switch
              value={shortsReelsBlocked}
              onValueChange={handleShortsReelsToggle}
              trackColor={{ false: '#2C2C2E', true: '#FF2D55' }}
              thumbColor={shortsReelsBlocked ? '#FFFFFF' : '#8E8E93'}
            />
          </View>
          {Platform.OS === 'android' && shortsReelsBlocked && (
            <View style={styles.permissionSection}>
              <View style={styles.permissionDivider} />
              <Text style={styles.permissionText}>
                Android requires granting **Accessibility Service** permission so the blocker can detect and close Reels/Shorts on your device.
              </Text>
              <TouchableOpacity style={styles.permissionButton} onPress={handleOpenAccessibilitySettings}>
                <Ionicons name="settings-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.permissionButtonText}>Grant Accessibility Permission</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* App List Section */}
        <Text style={styles.sectionTitle}>Manage App Blocks</Text>
        <View style={styles.appListCard}>
          {apps.map((app, index) => {
            const lockedByReels = shortsReelsBlocked && (app.name === 'Instagram' || app.name === 'YouTube' || app.name === 'TikTok');
            return (
              <View key={app.id}>
                <View style={styles.appRow}>
                  <View style={[styles.appIconBg, { backgroundColor: app.color + '20' }]}>
                    <Ionicons name={app.icon as any} size={20} color={app.color === '#000000' ? '#FFFFFF' : app.color} />
                  </View>
                  <View style={styles.appDetails}>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={[styles.appStatus, lockedByReels && { color: '#FF2D55', fontWeight: '500' }]}>
                      {lockedByReels ? 'Locked (Reels Blocker)' : app.blocked ? 'Blocked' : 'Unblocked'}
                    </Text>
                  </View>
                  <Switch
                    value={app.blocked}
                    onValueChange={() => handleAppToggle(app.id, app.blocked)}
                    disabled={lockedByReels}
                    trackColor={{ false: '#2C2C2E', true: lockedByReels ? '#FF2D55' : '#FF453A' }}
                    thumbColor={app.blocked ? '#FFFFFF' : '#8E8E93'}
                  />
                </View>
                {index < apps.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
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
    paddingBottom: 100,
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
  cardActive: {
    borderColor: '#FF9500',
  },
  cardActiveReels: {
    borderColor: '#FF2D55',
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
  iconContainerReels: {
    backgroundColor: 'rgba(255, 45, 85, 0.1)',
  },
  iconActive: {
    backgroundColor: '#FF9500',
  },
  iconActiveReels: {
    backgroundColor: '#FF2D55',
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
    marginTop: 8,
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
  permissionSection: {
    marginTop: 12,
    paddingTop: 12,
  },
  permissionDivider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 12,
  },
  permissionButton: {
    backgroundColor: '#FF2D55',
    borderRadius: 8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
