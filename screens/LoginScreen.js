import React from 'react'
import { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation()
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with", user.email)
            navigation.navigate("Home")

        }) 
        .catch(error => alert(error.message))
    }
      
    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with:", user.email)
            navigation.navigate("Home")

        }) 
        .catch(error => alert(error.message))
    }
    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >   
        <View>
            <Text style= {styles.title}>To-Do List</Text>
        </View>
        <View style = {styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={ text=> setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={ text=> setPassword(text)}
                style={styles.input}
                secureTextEntry
            />  
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogIn}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}> Register</Text>
            </TouchableOpacity>
            
        </View>

    </KeyboardAvoidingView>
    );
}

export {auth};
export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius:10,
        marginTop:5
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#078259",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#078259",
        borderWidth: 2
    },
    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16

    },
    buttonOutlineText:{
        color: "#078259",
        fontWeight: '700',
        fontSize: 16
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: "#FF69B4",
        padding: 30
    }
})
