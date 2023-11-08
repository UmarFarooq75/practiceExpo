import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Data: React.FC = (props:any) => {
  const [data, setData] = useState<Post[]>([]);
  const { username, id } = props.route.params;

  const getApiData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1/comments"
      );
      if (response.ok) {
        const json: Post[] = await response.json();
        setData(json);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
      <Text>FlatList Data</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>Name: {username}</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>ID: {id}</Text>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer]}>
            <View style={[styles.elevation, styles.card]}>
              <Text style={styles.heading}>{item.id}</Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}> Name: </Text>
                {item.name}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}> Email: </Text>
                {item.email}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}> Body: </Text>
                {item.body}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
    textAlign: "center",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: "90%", // Adjust card width
    height: "auto",
    marginBottom: 10, // Add margin between cards
  },
  elevation: {
    elevation: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default Data;
