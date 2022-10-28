import React from "react";
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

const Header = () => {
    return (
      <View
        style={styles.view}
      >
        <Text
          style={styles.text}
        >
          GEOMIL
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      height: 50,
      width: '100%',
      backgroundColor: '#4E4346',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 25,
    },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
      borderRadius: 10,
    },
  })

  export default Header;