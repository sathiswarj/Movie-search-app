import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import useFetch from '@/services/useFetch'
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { data: movie, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        resizeMode="cover"
        className="absolute w-full h-full z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, minHeight: "100%" }}
      >
        <Image
          source={icons.logo}
          resizeMode="contain"
          className="w-12 h-10 mt-20 mb-5 self-center"
        />
        {moviesLoading ?
          <ActivityIndicator
            size='large'
            color="#0000ff"
            className="mt-10 self-enter"

          /> : moviesError ? (
            <Text className="text-white text-center mt-5">{moviesError?.message}</Text>
          ) : (


            <View className="flex-1 mt-5">
              <SearchBar
                  placeholder="Search here..."
                  onPress={() => router.push("/search")}  />
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
                <FlatList 
                data={movie} 
                renderItem={({ item }) => (
                  <MovieCard 
                  {...item}
                  />
                 )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent:'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                />
              </>
            </View>
          )

        }

      </ScrollView>
    </View>
  );
}
