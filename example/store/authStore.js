import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'web' ? 'http://localhost:8050' : 'http://192.168.29.174:8050';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  addUser: async (userName, email, phoneNumber, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, phoneNumber, password }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (!data.user) {
        throw new Error('Invalid API response: user missing');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user });

      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        set({ token: data.token });
      }


      return { success: true };
    } catch (error) {
      console.error("Signup error:", error.message);
      return { success: false, error: error.message };
    }
  },

  loginUser: async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (!data.token || !data.user) {
      throw new Error('Invalid API response: token or user missing');
    }

    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    await AsyncStorage.setItem('token', data.token);

    set({ user: data.user, token: data.token });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, error: error.message };
  }
}

}));
