import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import ScreenLogin from './src/screens/ScreenLogin';
import ScreenMap from './src/screens/ScreenMap';
import ScreenAuth from './src/screens/ScreenAuth';
import { useEffect } from 'react';
import { supabase } from './src/db/database';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Screen_Authentication"
          component={ScreenAuth}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Screen_Login"
          component={ScreenLogin}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Screen_Map"
          component={ScreenMap}
          options={{
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;