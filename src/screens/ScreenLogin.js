import React, { useState } from 'react';
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

export default function ScreenLogin({navigation}) {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [of, setOf] = useState(0);
    const [sof, setSof] = useState(0);
    const [slc, setSlc] = useState(0);
    const [fuerza, setFuerza] = useState(0);
    
    const onChangeHandlerOf = (value) => {
      
      if (isNaN(value) || value=="") {
        const valorOf = 0
        const total = valorOf + parseInt(sof) + parseInt(slc)
        // console.log(total)
        setFuerza(total)
      } else {
        const valorOf = parseInt(value)
        const total = valorOf +  parseInt(sof) + parseInt(slc)
        // console.log(total)
        setFuerza(total)
      }
    };

    const onChangeHandlerSof = (value) => {
      
      if (isNaN(value) || value=="") {
        const valorSof = 0
        const total = parseInt(of) + valorSof + parseInt(slc)
        // console.log(total)
        setFuerza(total)
      } else {
        const valorSof = parseInt(value)
        const total = parseInt(of) + valorSof + parseInt(slc)
        // console.log(total)
        setFuerza(total)
      }
    };

    const onChangeHandlerSlc = (value) => {
      if (isNaN(value) || value=="") {
        const valorSlc = 0
        const total = parseInt(of) + parseInt(sof) + valorSlc
        // console.log(total)
        // console.log(name)
        // console.log(unit)
        setFuerza(total)
      } else {
        const valorSlc = parseInt(value)
        const total = parseInt(of) + parseInt(sof) + valorSlc
        // console.log(total)
        // console.log(name)
        // console.log(unit)
        setFuerza(total)
      }
    };


    const onPressHandler = () => {supabase.auth.signOut()}
    {
      // setSubmitted(!submitted);

    }
    const onPressHandler2 = () => {
      // navigation.navigate('Screen_Map');
      supabase.auth.onAuthStateChange((event, session) => {
          console.log(event, session)})

      console.log('Datos enviados:', [name,unit,of,sof,slc,fuerza])
      navigation.navigate('Screen_Map',
       {ItemName: name,
        ItemUnit: unit,
        ItemOf: of,
        ItemSof: sof,
        ItemSlc: slc,
        ItemFuerza: fuerza,
      });
    }
  
    return (
      <View style={styles.body}>
        <ImageBackground source={require('../../assets/logo-acapomil-sin-bordes.png')}>

        </ImageBackground>

        <Header/>
        {/* <Image
          style={styles.image}
          source={require('../../assets/logo-acapomil-sin-bordes.png')}
        /> */}
        <ImageBackground
          style={styles.image}
          source={require('../../assets/logo-acapomil-sin-bordes.png')}
        />
        <Text style={styles.text}>
          Ingrese su unidad
        </Text>
        <TextInput
          style={styles.input}
          placeholder='ej. 1ra Sección'
          placeholderTextColor= "#adb5bd"
          onChangeText={(value) => setUnit(value)}
          keyboardType='default'
          maxLength={30}
        />
        <Text style={styles.text}>
          Ingrese grado y nombre
        </Text>
        <TextInput
          style={styles.input}
          placeholder='ej. Cap. Zúñiga'
          placeholderTextColor= "#adb5bd"
          onChangeText={(value) => setName(value)}
          keyboardType='default'
          maxLength={30}
        />
        <View style={styles.casilla}>
          <View>
            <Text style={styles.textCasillas}>
              Ofles
            </Text>
            <TextInput
              style={styles.casillaInput}
              placeholder='0'
              placeholderTextColor= "#adb5bd"
              onChangeText={(value) => {setOf(value)
                                        onChangeHandlerOf(value)
                                        }}
              keyboardType='number-pad'
              maxLength={1}
            />
          </View>
          <View>
            <Text style={styles.textCasillas}>
              Sof
            </Text>
            <TextInput
              style={styles.casillaInput}
              placeholder='0'
              placeholderTextColor= "#adb5bd"
              onChangeText={(value) => {setSof(value)
                                          onChangeHandlerSof(value)
                                        }}
              keyboardType='number-pad'
              maxLength={2}
            />
          </View>
          <View style={styles.sltp}>
            <Text style={styles.textCasillas}>
              Sltp/Slc
            </Text>
            <TextInput
              style={styles.casillaInput}
              placeholder='0'
              placeholderTextColor= "#adb5bd"
              onChangeText={(value) => {setSlc(value)
                                        onChangeHandlerSlc(value)
                                      }}
              keyboardType='number-pad'
              maxLength={2}
            />
          </View>
          <View>
            <Text style={styles.textCasillas}>
              Fuerza
            </Text>
            <Text style={styles.fuerza}>
              {fuerza}
            </Text>
          </View>
        </View>

        <AppBoton
          onPressFunction={onPressHandler2}
          title={submitted ? 'Clear' : 'Ingresar'}
        />

        <Pressable
          onPress={onPressHandler}
          style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#D53015'})}
        >
          <Text style={styles.text}>
            Salir
          </Text>
        </Pressable>
  
        {/* {submitted ?
          <Text style={styles.text}>
            Su nombre es: {name}
          </Text>
          :
          null
        } */}
  
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