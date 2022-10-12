import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import HomeScreen from "./app/screens/HomeScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SettingScreen from "./app/screens/SettingScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "home-sharp"
                : "home";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-sharp" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomeTab" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
