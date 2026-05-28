import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BlockProvider } from '../context/BlockContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BlockProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BlockProvider>
    </SafeAreaProvider>
  );
}
