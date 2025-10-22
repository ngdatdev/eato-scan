import { AuthProvider, useAuth } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

function RootLayoutNav() {
  const { isLoading, user } = useAuth();
  const colorScheme = useColorScheme();

  if (isLoading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth screens
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          // Protected screens
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="dish-recognition" options={{ headerShown: false }} />
            <Stack.Screen name="nearby-restaurants" options={{ headerShown: false }} />
            <Stack.Screen name="restaurant-detail" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
