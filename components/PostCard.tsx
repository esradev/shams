import { Text, TouchableOpacity, View } from "react-native";
import { Link, Href } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

interface PostCardProps {
  href: Href;
  title: string;
  desc?: string;
}

const PostCard: React.FC<PostCardProps> = ({ href, title, desc }) => {
  return (
    <TouchableOpacity className="flex flex-row-reverse align-middle items-center truncate rounded-xl bg-white p-4 mb-4" onPress={() => {}}>
      <View className="flex-1 gap-1">
        <Link href={href} className="items-center content-center align-middle">
          <Text className="flex font-bold text-right text-2xl text-gray-900 hover:text-gray-600">{title}</Text>
        </Link>
        {desc && <Text className="text-base text-right text-gray-500">{desc}</Text>}
      </View>
      <TouchableOpacity onPress={() => {}} className="flex-shrink-0 rounded-full items-center justify-center p-2 bg-gray-200">
        <Link href={href} className="items-center content-center align-middle">
          <MaterialIcons name="chevron-left" size={24} color="black" />
        </Link>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PostCard;
