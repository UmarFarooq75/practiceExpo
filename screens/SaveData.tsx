import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import Congrats from "../assets/party-popper.png"

const SaveData = (props: any) => {
  const [name, setuserName] = useState("");
  const [age, setUserAge] = useState("");
  const [email, setUserEmail] = useState("");
  const { username, id } = props.route.params;
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [emailAlreadyRegister,setEmailAlreadyRegister]=useState(false)
  
  const handleFocus = (inputName: any) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const validation = () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!age || isNaN(parseFloat(age))) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!email || !emailRegex.test(email) || !name || !age || isNaN(parseFloat(age))) {
      return false;
    }
  };

  const saveToJSOn = async () => {
    setFocusedInput(null);
    const validationresult = validation();
    if (validationresult === false) {
      return false;
    }
  
    // Assuming you have fetched the data from the JSON Server earlier
    const allUsers = await fetch("http://192.168.1.10:3000/users").then((response) =>
      response.json()
    );
  
    const emailExists = allUsers.some((user:any) => user.email === email);
  
    if (emailExists) {
      setEmailAlreadyRegister(true);
      alert("Email Already Exist")
      // Email already exists, show an error message or handle it as needed
      //console.error("Email is already registered.");
      // Optionally, show an error message or return.
      return;
    }
  
    // If the email is not registered, proceed with saving the data
    try {
      const url = "http://192.168.1.10:3000/users";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, email }),
      });
  
      if (response.status === 201) {
        // HTTP status code 201 indicates a successful creation (resource created)
        console.log("Data saved successfully.");
        setShowModal(true);
        // Clear the form fields after successful save
        setuserName("");
        setUserAge("");
        setUserEmail("");
      } else {
        console.error("Error saving data. Status code: " + response.status);
        // Handle the error as needed, e.g., show an error message.
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error as needed, e.g., show an error message.
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
      <Text>Map Data Screen</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>Name: {username}</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>ID: {id}</Text>

      <TouchableOpacity
        activeOpacity={1} // Prevent the default opacity change on press
        style={[
          styles.container,
          focusedInput === "input1"
            ? styles.focusedContainer
            : styles.unfocusedContainer,
          nameError ? { borderColor: "red" } : null,
        ]}
      >
        <TextInput
          style={styles.textInput}
          onFocus={() => handleFocus("input1")}
          onBlur={handleBlur}
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => {
            setuserName(text);
          }}
        />
      </TouchableOpacity>
      {nameError ? (
        <Text style={styles.errorstyle}>*Enter Valid Name</Text>
      ) : null}
      <TouchableOpacity
        activeOpacity={1} // Prevent the default opacity change on press
        style={[
          styles.container,
          focusedInput === "input2"
            ? styles.focusedContainer
            : styles.unfocusedContainer,
          ageError ? { borderColor: "red" } : null,
        ]}
      >
        <TextInput
          style={styles.textInput}
          onFocus={() => handleFocus("input2")}
          onBlur={handleBlur}
          placeholder="Enter Age"
          value={age}
          onChangeText={(text: any) => {
            setUserAge(text);
          }}
        />
      </TouchableOpacity>
      {ageError ? (
        <Text style={styles.errorstyle}>*Enter Valid Age</Text>
      ) : null}
      <TouchableOpacity
        activeOpacity={1} // Prevent the default opacity change on press
        style={[
          styles.container,
          focusedInput === "input3"
            ? styles.focusedContainer
            : styles.unfocusedContainer,
          emailError ? { borderColor: "red" } : null,
        ]}
      >
        <TextInput
          style={styles.textInput}
          onFocus={() => handleFocus("input3")}
          onBlur={handleBlur}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => {
            setUserEmail(text);
          }}
        />
      </TouchableOpacity>
      {emailError ? (
        <Text style={styles.errorstyle}>*Enter Valid Email</Text>
      ) : null}
      <TouchableOpacity
        onPress={saveToJSOn}
        style={{ backgroundColor: "#007BFF", borderRadius: 10, margin: 5 }}
      >
        <Text style={styles.button}>Save Data</Text>
      </TouchableOpacity>
      {showmodal ? (
        <Modal transparent={true} visible={true} animationType="none">
          <View
            style={{
              backgroundColor: "#000000aa",
              flex: 1,
              justifyContent: "center",
              alignItems:"center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height:170,
                borderRadius: 5,
                width:"88%",
                justifyContent: "center",
                alignItems:"center"
              }}
            >
              <Text style={{ paddingBottom: 10 }}>
                Thanks For Giving Your Info
              </Text>
              <Image style={{width:50,height:50}} source={Congrats}/>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 5,
                  marginTop:15,
                  right:-120,
                  bottom:-10,
                  alignItems: "flex-end",
                }}
                onPress={() => setShowModal(false)}
              > 
                <Text style={{ color: "black" }}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 230,
    margin: 8,
    marginBottom: 3,
  },
  focusedContainer: {
    borderColor: "#24a0ed", // Change border color when focused
    shadowColor:"#24a0ed",
    width:235,
    shadowOpacity:1,
    backgroundColor:"white",
    borderWidth:1,
    elevation:5,
    borderRadius: 5,

  },
  unfocusedContainer: {
    borderColor: "gray", // Default border color when not focused
  },
  textInput: {
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 230,
    margin: 5,
    fontSize: 17,
    textAlign: "center",
    color:"white"
  },
  errorstyle: {
    color: "red",
    fontSize: 10,
    bottom: 4,
    left: -68,
  },
});

export default SaveData;
