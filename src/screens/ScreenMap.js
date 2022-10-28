import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { getLocations, createLocation, enviarSupabase } from '../../api';
import AppBoton from '../utils/CustomButton';
import { supabase } from '../db/database';
const sldImage = require('../../assets/icono-soldado-con-fondo-removebg-preview.png');// import { getCurrentPosition, requestLocationPermission } from '../../components/GeoItems';

export default function ScreenMap({navigation, route}){

    const {ItemName, ItemUnit, ItemOf, ItemSof, ItemSlc, ItemFuerza} = route.params;
    // const obtenerPosicion = getCurrentPosition;

    const activarLocation = () => {
      getCurrentPosition();
      enviarLocation();
    }

    const onPressHandler = () => {
      navigation.navigate('Screen_Login')
    }
    const [submitted, setSubmitted] = useState('');
    const [submitted2, setSubmitted2] = useState('');

    // const [latitud, setLatitud] = useState(0);
    // const [longitud, setLongitud] = useState(0);

    const datos = {
      unidad: '',
      oficial: '',
      lat: -33.444598,
      long: -70.536471,
      fecha: '',
      of: 0,
      sof: 0,
      slc: 0,
      fuerza: 0
    }

    const [localizacion, setLocalizacion] = useState(datos);

    const mostrarEstado = () => {
      const user = supabase.auth.user();
      return console.log(user);
    }

    const enviarLocation = () => {
      enviarSupabase(localizacion);
      // createLocation(localizacion);
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.setRNConfiguration({
          authorizationLevel: 'whenInUse'
        })
  
        Geolocation.requestAuthorization()
        // IOS permission request does not offer a callback :/
        //Android/App/src/main AndroidManifest.xml
        return null
      } else if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
          } else {
            return false
          }
        } catch (err) {
          console.warn(err.message)
          return false
        }
      }
    }
  
  const getCurrentPosition = async () => {
    const hasLocationPermission = await requestLocationPermission()
  
    if (hasLocationPermission === false) {
      console.log('Can not obtain location permission')
      return
    }
  
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
  
        const latitud = position.coords.latitude
        const longitud = position.coords.longitude
        const time = position.timestamp
        const time_date = new Date(time)

        
        const time_format = (
          time_date.getFullYear()+
          "-"+(time_date.getUTCMonth()+1)+
          "-"+time_date.getDate()+
          " "+time_date.getHours()+
          ":"+time_date.getMinutes()+
          ":"+time_date.getSeconds());

          const time_string = time_date.toISOString();
          const [beforeT, afterT] = time_string.split('T');
          const [afterAfterT] = afterT.split('Z');
          const timeFormated = (beforeT + ' ' + afterAfterT);
        
        // console.log(time_format.toString())
        // console.log(time_date.getTimezoneOffset());
        console.log(beforeT);
        console.log(afterAfterT);
        console.log(timeFormated);

        console.log(time_date);

        setLocalizacion({
          unidad: ItemUnit,
          oficial: ItemName,
          lat: latitud,
          long: longitud,
          fecha: timeFormated,
          of: parseInt(ItemOf),
          sof: parseInt(ItemSof),
          slc: parseInt(ItemSlc),
          fuerza: parseInt(ItemFuerza)
        });

        console.log([ItemUnit])
        console.log(ItemUnit)
        console.log(localizacion)
  
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }
  
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor="#222f3e"/>
        <Text style={styles.text}>
          Geolocalización de Unidad
        </Text>

        {/* <Pressable
          onPress={onPressHandler}
          style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#D53015'})}
        >
          <Text style={styles.text}>
            Volver a Login
          </Text>
        </Pressable> */}

        <AppBoton
          onPressFunction={onPressHandler}
          title={submitted ? 'Clear' : 'Volver'}
        />

        <View style={styles.unidad}>
          <Text style={styles.text}>{ItemUnit}</Text>
          <Text style={styles.text}>{ItemName}</Text>
          <Text style={styles.text}>Fuerza: {ItemFuerza}</Text>
        </View>
        
        <MapView

          style={styles.map}
          initialRegion={{
            latitude: localizacion.lat,
            longitude: localizacion.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{latitude: localizacion.lat, longitude: localizacion.long}}
            title="Patrulla"
            description='Patrulla'
            image={sldImage}
          >
            <Callout>
              <Text>Acapomil</Text>
            </Callout>
          </Marker>
        </MapView>

        <View style={{ position: 'absolute', bottom: 10, padding: 10}}>
          <Pressable
          onPress={getCurrentPosition}
          // onPress={activarLocation}
          style={({pressed}) => [{backgroundColor: pressed ? '#ddd' : '#D53015'}, styles.button]}
          >
          <Text style={styles.text2}>
            Obtener geolocalización
          </Text>
          </Pressable>


          <Pressable
            onPress={mostrarEstado}
            style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#D53015'})}
            >
            <Text style={styles.text2}>
              Mostrar estado
            </Text>
          </Pressable>

          <Pressable
          onPress={enviarLocation}
          style={({pressed}) => [{backgroundColor: pressed ? '#ddd' : '#D53015'}, styles.button]}
          >
          <Text style={styles.text2}>
            Activar envío de datos
          </Text>
          </Pressable>
        </View>
        
      </View>
    )
  }


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#05050B',
        alignItems: 'center'
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
    },
    text2: {
      color: '#ffffff',
      fontSize: 20,
      fontStyle: 'italic',
      margin: 10,
    },
    unidad: {
      flexDirection: "row"
    },
    input: {
        width: 200,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
      width: 250,
      height: 50,
      alignItems: 'center',
      borderRadius: 10,
      margin: 10
    },
    map: {
      width: '100%',
      height: '100%'
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
        resizeMode:'stretch'
    },
    boton: {
      margin: 10
    }
})