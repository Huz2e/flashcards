import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "@/app/screens/MainScreen";
import PracticeScreen from "@/app/screens/PracticeScreen";
import AddCardScreen from "@/app/screens/AddCardScreen";
import DeckSelector from "@/app/screens/SelectDeckScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 14,
        position: "absolute",
        top: 15,
      },
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
      tabBarStyle: {
        height: 50,
      },
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: () => null,
    }}
  >
    <Tab.Screen name="Main" component={MainScreen} />
    <Tab.Screen name="Practice" component={PracticeScreen} />
    <Tab.Screen name="Select Deck" component={DeckSelector} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Add Card" component={AddCardScreen} options={{ headerShown: false}} />
  </Stack.Navigator>
);

export default AppNavigator;