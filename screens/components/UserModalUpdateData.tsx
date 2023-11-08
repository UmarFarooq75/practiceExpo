import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
interface DataInterface {
  name: String;
  age: String;
  email: String;
  id: Number;
}
const UserModalUpdateData = (props: any) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [emailAlreadyRegister, setEmailAlreadyRegister] = useState(false);

  useEffect(() => {
    if (props.selectedUser) {
      setName(props.selectedUser.name);
      setAge(props.selectedUser.age);
      setEmail(props.selectedUser.email);
    }
  }, [props.selectedUser]);

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
    if (
      !email ||
      !emailRegex.test(email) ||
      !name ||
      !age ||
      isNaN(parseFloat(age))
    ) {
      return false;
    }
  };

  const updateUserData = async () => {

    setFocusedInput(null);
    const validationresult = validation();
    if (validationresult === false) {
      return false;
    }

    try {

      const id = props.selectedUser.id;
      const url = "http://192.168.1.10:3000/users";
      let response = await fetch(`${url}/${id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, email }),
      });

      if (response.ok) {
        response= await response.json();
        props.getApiData();
        props.setModal(false)
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
    <View style={styles.modalView}>
      <View style={styles.subModalView}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            marginBottom: 20,
            fontSize: 29,
            fontWeight: "bold",
          }}
        >
          Update Data Here
        </Text>

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
              setName(text);
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
              setAge(text);
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
              setEmail(text);
            }}
          />
        </TouchableOpacity>
        {emailError ? (
          <Text style={styles.errorstyle}>*Enter Valid Email</Text>
        ) : null}

        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 10 }}
          onPress={() => updateUserData()}
        >
          <Text style={styles.button}>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 10 }}
          onPress={() => props.setModal(false)}
        >
          <Text style={styles.button}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    top: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subModalView: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 400,
    width: "90%",
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
  },
  button: {
    borderRadius: 2,
    textAlign: "center",
    backgroundColor: "#24a0ed",
    color: "white",
    padding: 6,
    width: 300,
    fontSize: 16,
  },
  container: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 300,
    margin: 8,
    marginBottom: 3,
  },
  focusedContainer: {
    borderColor: "#24a0ed", // Change border color when focused
    shadowColor:"black",
    width:302,
    shadowOpacity:10,
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
  errorstyle: {
    color: "red",
    fontSize: 10,
    bottom: 4,
    left: 10,
  },
});

export default UserModalUpdateData;
