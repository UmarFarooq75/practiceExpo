import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView, // Import ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  url: string;
}

const DetailScreen: React.FC = (props:any) => {
  const [data, setData] = useState<Post[]>([]);
  const navigation = useNavigation();
  const { username, id } = props.route.params;

  const getApiData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums/1/photos"
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Map Data Screen</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>Name: {username}</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>ID: {id}</Text>
      <ScrollView
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center" ,width:"100%" }}>
          {data.map((items) => (
            <View style={[styles.card, styles.elevation]} key={items.id}>
              <Text style={styles.heading}>{items.id}</Text>
              <Image
                source={{ uri: items.url }}
                style={{
                  width: "100%",
                  height: 100,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" ,bottom:40,color:"#fff",left:5}}>
                {items.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
    textAlign:"center",

  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: 250, // Adjust card width
    height:200,
    marginHorizontal: 10, // Add margin between cards
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
export default DetailScreen;
