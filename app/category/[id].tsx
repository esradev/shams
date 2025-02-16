import React, { useEffect, useState } from "react";
import { Text, StatusBar, ScrollView, View, FlatList } from "react-native";
import { Href, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import PostCardLoading from "@/components/PostCardLoading";
import PostCard from "@/components/PostCard";

interface ErrorType {
  message: string;
}

interface CategoryType {
  name: string;
  description: string;
}

interface PostType {
  id: number;
  title: { rendered: string };
  meta: { "date-of-the-lesson"?: string };
}

const CategoryPosts = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Fetch category details
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://shams-almaarif.com/wp-json/wp/v2/categories/${id}`);
        setCategory(response.data);
        navigation.setOptions({ title: response.data.name });
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Fetch posts and set the total number of pages
  const fetchPosts = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`https://shams-almaarif.com/wp-json/wp/v2/posts?categories=${id}&page=${page}&per_page=20&orderby=date&order=asc`);
      setPosts(response.data);
      setTotalPages(Number(response.headers["x-wp-totalpages"])); // Capture total pages
    } catch (err) {
      setError(err as any);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id, page]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <LoadingSpinner />
        <StatusBar barStyle="dark-content" backgroundColor="#16a34a" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 text-lg font-bold text-center mb-4 w-full">Error: {error?.message}</Text>
        <StatusBar barStyle="dark-content" backgroundColor="#16a34a" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-amber-50 mb-12">
      <ScrollView className="p-4">
        <View>{isFetching ? <PostCardLoading count={[1, 2, 3, 4, 5, 6, 7, 8, 9]} /> : posts.map(post => <PostCard key={post.id} href={`/post/${post.id}` as Href} title={post.title.rendered} desc={post.meta["date-of-the-lesson"]} />)}</View>
      </ScrollView>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <StatusBar barStyle="dark-content" backgroundColor="#16a34a" />
    </SafeAreaView>
  );
};

export default CategoryPosts;
