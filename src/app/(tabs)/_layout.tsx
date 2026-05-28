import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useBlock } from '../../context/BlockContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { shortsReelsBlocked } = useBlock();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF453A', // Vibrant premium red/orange
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#1C1C1E', // Modern dark theme
          borderTopColor: '#2C2C2E',
          height: Platform.OS === 'ios' ? 88 : (60 + (insets.bottom > 0 ? insets.bottom - 10 : 0)),
          paddingBottom: Platform.OS === 'ios' ? 30 : (insets.bottom > 0 ? insets.bottom : 10),
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      {!shortsReelsBlocked && (
        <Tabs.Screen
          name="reels"
          options={{
            title: 'Reels',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'film' : 'film-outline'} size={size} color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="blocking"
        options={{
          title: 'Blocking',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'ban' : 'ban-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
