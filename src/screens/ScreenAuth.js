import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import AppBoton from '../utils/CustomButton';
import Header from '../utils/Header';
import { supabase } from '../db/database';

export default function ScreenAuth({navigation}) {
    
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
          if (!session) {
            console.log(session);
            navigation.navigate('Screen_Authentication')
          } else {
            navigation.navigate('Screen_Login')
          }
        })
      }, [])
    
    const [email_, setEmail_] = useState("");
    const [password_, setPassword_] = useState("");

    const handleSubmit = async () => {
        // console.log('%s & %s', email_, password_);
        // e.preventDefault();

        try {
            const data = await supabase.auth.signInWithPassword(
                {
                email: email_,
                password: password_,
                // 10 minute email
                });
            console.log(data);
            } catch (err) {
            console.error(err);
            }
    };
    
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email_,
          password: password_,
        })
        console.log(data);
      }
    
    const handleSubmit2 = () => {

        supabase.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
          })

        // navigation.navigate('Screen_Map');
        navigation.navigate('Screen_Login');
      }

    return (
      <View style={styles.body}>
        <ImageBackground source={require('../../assets/logo-acapomil-sin-bordes.png')}>

        </ImageBackground>

        <Header/>

        <ImageBackground
          style={styles.image}
          source={require('../../assets/logo-acapomil-sin-bordes.png')}
        />

        <Text style={styles.text}>
          Ingrese su email
        </Text>
        <TextInput
          style={styles.input}
          placeholder='ejemplo@ejemplo.com'
          placeholderTextColor= "#adb5bd"
          onChangeText={(value) => setEmail_(value)}
          keyboardType='email'
          maxLength={35}
        />

        <Text style={styles.text}>
          Ingrese clave
        </Text>
        <TextInput
          style={styles.input}
          placeholder='ejemplo@ejemplo.com'
          placeholderTextColor= "#adb5bd"
          onChangeText={(value) => setPassword_(value)}
          keyboardType='default'
          maxLength={12}
        />

        <Pressable
          onPress={handleSubmit}
          style={({pressed}) => [{backgroundColor: pressed ? '#ddd' : '#D53015'}, styles.button]}
          >
          <Text>
            Ingresar datos
          </Text>
          </Pressable>
         <Pressable
          onPress={handleSubmit2}
          style={({pressed}) => [{backgroundColor: pressed ? '#ddd' : '#D53015'}, styles.button]}
          >
          <Text>
            Ir a Registro
          </Text>
          </Pressable>
  
      </View>
    );
  };

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#05050B',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontStyle: 'italic',
        margin: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        backgroundColor: '#01567A',
        width: 200,

    },
    textCasillas: {
      color: '#fff',
      fontSize: 20,
      fontStyle: 'italic',
      margin: 5,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 5,
      backgroundColor: '#01567A',
      height: 40,
      textAlignVertical: 'center'
  },

    input: {
        width: 200,
        borderWidth: 1,
        borderColor: '#D53015',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 5,
        color: '#fff',
        backgroundColor: '#6A9290'
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
    },
    image: {
        marginTop: 10,
        width: 100,
        height: 100,
        margin: 5,
        resizeMode:'stretch'
    },
    casilla: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // alignItems: 'center',
    },
    sltp:{
      alignItems: 'center',
    },
    casillaInput: {
      width: 50,
      borderWidth: 1,
      borderColor: '#D53015',
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 20,
      margin: 5,
      color: '#fff',
      backgroundColor: '#6A9290',
      justifyContent: 'space-evenly'
    },
    fuerza: {
      width: 50,
      borderWidth: 1,
      borderColor: '#D53015',
      borderRadius: 5,
      color: '#fff',
      fontSize: 20,
      fontStyle: 'italic',
      margin: 5,
      textAlign: 'center',
      textAlignVertical: 'center',
      height: 50,
      backgroundColor: '#6A9290'
    }
})