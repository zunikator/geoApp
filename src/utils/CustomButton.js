import React from "react";
import {
    Pressable,
    Text,
    StyleSheet
} from 'react-native';

const AppBoton = (props) => {
    return (
        <Pressable
        onPress={props.onPressFunction}
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#dddddd' : '#D53015' },
        styles.button
        ]}
        android_ripple={{ color: '#DD591B' }}
        >
        <Text style={styles.text}>
          {props.title}
        </Text>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
      color: '#ffffff',
      fontSize: 20,
      fontStyle: 'italic',
      margin: 10,
      fontWeight: 'bold',
    },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
      borderRadius: 10,
      margin: 20
    },
  })

  export default AppBoton;