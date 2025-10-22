import { useAuth } from '@/context/auth-context';
import { Redirect, Stack } from 'expo-router';


export default function AuthLayout() {
  const { user } = useAuth();

  // If user is logged in and tries to access auth screens, redirect to home
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}