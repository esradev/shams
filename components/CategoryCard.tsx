import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Category {
  id: any;
  name: string;
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <View style={styles.card}>
      <Link href={`/category/${category.id}`}>
        <Text style={styles.text}>{category.name}</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  text: {
    fontSize: 16,
    color: "#333"
  }
});

export default CategoryCard;
