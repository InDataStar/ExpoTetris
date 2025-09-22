import { Text,   StyleSheet,StatusBar,View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Splash';  
import Game from './Game';  
import { useEffect } from 'react'; 

export default function App() {
  const Stack = createNativeStackNavigator();
 

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Game"
          screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="Splash" component={Splash}  />
          <Stack.Screen name="Game" component={Game}  />
        </Stack.Navigator>
      </NavigationContainer> 
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }, 
});
