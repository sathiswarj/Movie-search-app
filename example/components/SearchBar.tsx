import { View, TextInput, Image } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string; // Placeholder text for the input field
  value?: string;
  onPress?: () => void; // Optional prop for handling press events 
  onChangeText?: (text: string) => void; 
}

const SearchBar = ({ placeholder,  onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
