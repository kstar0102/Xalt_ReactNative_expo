import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src';
import LoginScreen from './src/containers/Login';
import SignUpScree from './src/containers/SignUp';
import Main from './src/containers/Main';
import Detail from './src/containers/Main/Detail';
import Step1 from './src/containers/SignUp/Step1';
import Step2 from './src/containers/SignUp/Step2';
import Step3 from './src/containers/SignUp/Step3';
import Step4 from './src/containers/SignUp/Step4';
import Step5 from './src/containers/SignUp/Step5';
import Step6 from './src/containers/SignUp/Step6';
import Step7 from './src/containers/SignUp/Step7';
import Step8 from './src/containers/SignUp/Step8';
import Step11 from './src/containers/SignUp/Step11';
import Step12 from './src/containers/SignUp/Step12';
import Step13 from './src/containers/SignUp/Step13';
import ListDetail from './src/containers/Main/listDetail';
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScree} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="step1" component={Step1} />
        <Stack.Screen name="step2" component={Step2} />
        <Stack.Screen name="step3" component={Step3} />
        <Stack.Screen name="step4" component={Step4} />
        <Stack.Screen name="step5" component={Step5} />
        <Stack.Screen name="step6" component={Step6} />
        <Stack.Screen name="step7" component={Step7} />
        <Stack.Screen name="step8" component={Step8} />
        <Stack.Screen name="step11" component={Step11} />
        <Stack.Screen name="step12" component={Step12} />
        <Stack.Screen name="step13" component={Step13} />
        <Stack.Screen name='lstdetail' component={ListDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;