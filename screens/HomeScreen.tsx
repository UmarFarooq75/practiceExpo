import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface UserDataItem {
  id: number;
  username: string;
}

const UserData: UserDataItem[] = [
  {
    id: 1,
    username: "Umar",
  },
  {
    id:2,
    username:"Ali"
  },  {
    id:3,
    username:"Fahad"
  }
  ,{
    id:4,
    username:"Younas"
  }
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [username, setusername] = useState(UserData[0].username);
  const [id, setID] = useState(UserData[0].id);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <View key={id}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          Name : {username}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Map Data", {
            username:username, // Pass the username to the Details screen
            id:id,   // Pass the id to the Details screen
          });
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            width: "90%",
            borderRadius: 7,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Map Data</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate("FlatList Data", {
            username:UserData[1].username, // Pass the username to the Details screen
            id:UserData[1].id,   // Pass the id to the Details screen
          });
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            width: "90%",
            borderRadius: 7,
            alignSelf: "center",
            alignItems: "center",margin:10

          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Flat List Data</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate("Save Data", {
            username:UserData[2].username, // Pass the username to the Details screen
            id:UserData[2].id,   // Pass the id to the Details screen
          });
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            width: "90%",
            borderRadius: 7,
            alignSelf: "center",
            alignItems: "center",marginBottom:10

          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Save Data</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate("Show Data", {
            username:UserData[3].username, // Pass the username to the Details screen
            id:UserData[3].id,   // Pass the id to the Details screen
          });
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            width: "90%",
            borderRadius: 7,
            alignSelf: "center",
            alignItems: "center",marginBottom:10

          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Show Data</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

