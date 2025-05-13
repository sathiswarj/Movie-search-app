import { View, Text, Image, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function Signup() {
   const [name,setName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter();

  const handleSignup = () => {
 
    if (name && phoneNumber && email && password) {
      router.replace('/(tabs)');
    } else {
      setError('All fields are required');
    }
  };

  return (
    <View className='flex-1 bg-primary justify-center px-6'>
      <Image
        source={icons.logo}
        resizeMode="contain"
        className="w-12 h-10 mt-20 mb-5 self-center"
      />

      <View className='bg-[#0F0D23] p-6 rounded-lg shadow-md z-10'>
      <Text className='text-lg font-bold mb-4 text-white'>Username</Text>
        <View className='flex-row items-center border border-gray-300 rounded px-3 mb-3'>
          <Ionicons name="mail-outline" size={20} className="mr-5" color='white' />
          <TextInput
            className="flex-1 py-2 outline-none text-white"
            placeholder='Enter your username'
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete={undefined}
          />
        </View>
        <Text className='text-red-500 text-right mb-3'> {error}</Text>

        <Text className='text-lg font-bold mb-4 text-white'>Email</Text>
        <View className='flex-row items-center border border-gray-300 rounded px-3 mb-3'>
          <Ionicons name="mail-outline" size={20} className="mr-5" color='white' />
          <TextInput
            className="flex-1 py-2 outline-none text-white"
            placeholder='Enter your email'
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete={undefined}
          />
        </View>
        <Text className='text-red-500 text-right mb-3'> {error}</Text>

        <Text className='text-lg font-bold mb-4 text-white'>Phone number</Text>
        <View className='flex-row items-center border border-gray-300 rounded px-3 mb-3'>
          <Ionicons name="mail-outline" size={20} className="mr-5" color='white' />
          <TextInput
            className="flex-1 py-2 outline-none text-white"
            placeholder='Enter your email'
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType='number-pad'
            autoCapitalize='none'
            autoComplete={undefined}
          />
        </View>
        <Text className='text-red-500 text-right mb-3'> {error}</Text>

        <Text className='text-lg font-bold mb-4 text-white'>Password</Text>

        <View className='flex-row items-center border border-gray-300 rounded px-3 mb-3'>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="white"
            style={{ marginRight: 20 }}
          />

          <TextInput
            className="flex-1 py-2 outline-none  text-white"
            placeholder='Enter your password'
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="white"
            />

          </TouchableOpacity>

        </View>
        <Text className='text-red-500 text-right mb-3'> {error}</Text>

        <TouchableOpacity onPress={handleSignup} disabled={loading}>
          {
            loading ? <ActivityIndicator color='#fff' /> : <Text className='p-4 bg-green-500 text-center text-white text-md rounded-lg'>Login</Text>
          }
        </TouchableOpacity>

      </View>
      <View className='flex-row justify-center mt-4'>
        <Text className='text-white'>Already have an account? </Text>
           <TouchableOpacity onPress={()=> router.back()}>
            <Text className='text-light-200'>Login</Text>
          </TouchableOpacity>
       </View>

    </View>
  );
}

