import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAuthStore = create((set) =>({
 user: null,
 token: null,

   addUser: async (userName, email, phoneNumber, password) => {
     try {
       const response = await fetch("http://localhost:8050/api/auth/register", {
         method: 'POST',
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           userName,
           email,
           phoneNumber,
           password,
         }),
       });
       
       const data = await response.json();
       await AsyncStorage.setItem('user',JSON.stringify(data));
       await AsyncStorage.setItem('token', data.token)
       set({token:data.token, user: data.user})
       return {success: true}

     } catch (error) {
       return {success: false, error: error.message};
     }
   },
 
}))