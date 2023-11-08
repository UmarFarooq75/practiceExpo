import { View, FlatList, Text, StyleSheet, Button, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import UserModalUpdateData from "./components/UserModalUpdateData";

interface DataInterface {
  name: String;
  age: String;
  email: String;
  id:Number
}

const ShowData = (props: any) => {
  
  const { username, id } = props.route.params;
  const [data, setData] = useState<DataInterface[]>([]);
  const [modal,setModal]=useState(false)
  const [selectedUser,setselectedUser]=useState(undefined);
  const getApiData = async () => {
    try {
      const response = await fetch("http://192.168.1.10:3000/users");
      if (response.ok) {
        const DataGoted: DataInterface[] = await response.json();
        setData(DataGoted);
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

  const deleteUser=async(id:Number)=>{
    try {
      const url="http://192.168.1.10:3000/users"
      const response = await fetch(`${url}/${id}`,{method:"delete"});
      if (response.ok) {
        console.warn("Deleted");
        getApiData();
        
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const updateData=async(data:any)=>{
    setModal(true);
    setselectedUser(data);
    // try {
    //   const url="http://192.168.1.10:3000/users"
    //   const response = await fetch(`${url}/${id}`,{method:"delete"});
    //   if (response.ok) {
    //     console.warn("Deleted");
    //     getApiData();
        
    //   } else {
    //     console.error("API request failed");
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 10}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Name : {username}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>
        ID : {id}
      </Text>
      <View style={{width:"100%",backgroundColor:"white",padding:5}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "orange",
          margin: 2,
          padding: 5,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Name</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Email</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.heading}>Operations</Text>
        </View>
      </View>
      {data.length ? (
        <FlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <Text style={{color:"white"}}>{item.name}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{color:"white"}}>{item.email}</Text>
              </View>
              <View style={{ flex: 1.3,flexDirection:"row",justifyContent:"space-between" }}>
                <Button title="Delete" onPress={()=>deleteUser(item.id)} />
                <Button title="Update" onPress={()=>updateData(item)} />
              </View>
            </View>
          )}
        />
      ) : null}
      </View>
      <Modal visible={modal} transparent={true}>
          <UserModalUpdateData setModal={setModal} selectedUser={selectedUser} getApiData={getApiData}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "orange",
    margin: 2,
    padding: 2,
    alignItems: "center"
  },
  heading:{
    fontSize:16,
    fontWeight:"bold",
    color:"white"
  }
});

export default ShowData;
