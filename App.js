import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import HomeScreen from "./app/screens/HomeScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import Profile from "./app/screens/ProfileScreen";
import SettingScreen from "./app/screens/SettingScreen";
import CartScreen from "./app/screens/CartScreen";
import AboutUsScreen from "./app/screens/AboutUsScreen";
import ContactUsScreen from "./app/screens/ContactUsScreen";
import PrivacyScreen from "./app/screens/PrivacyScreen";
import SubServiceListScreen from "./app/screens/SubServiceListScreen";
import ServiceDetailsScreen from "./app/screens/ServiceDetailsScreen";
// import ServiceListScreen from "./app/screens/ServiceListScreen";
import ServiceListScreen from "./app/screens/MyServices";
import MyServicesDetail from "./app/screens/MyServicesDetail";
import ChangePasswordScreen from "./app/screens/ChangePasswordScreen";
import CheckoutScreen from "./app/screens/CheckoutScreen";
// import OtpVerificationScreen from "./app/screens/OtpVerificationScreen";
import { Provider } from "react-redux";

//Redux implementation
import { store } from "./app/redux/Store";
import SelectAreaScreen from "./app/screens/SelectAreaScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart";
            } else if (route.name === "Services") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#F5ac30",
          tabBarInactiveTintColor: "#007fb2",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          options={{ title: "My Services" }}
          name="Services"
          component={ServiceListScreen}
        />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          {/* <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} /> */}
          <Stack.Screen name="SelectArea" component={SelectAreaScreen} />
          <Stack.Screen name="HomeTab" component={HomeTabs} />
          <Stack.Screen
            name="SubServiceList"
            component={SubServiceListScreen}
          />
          <Stack.Screen
            name="ServiceDetails"
            component={ServiceDetailsScreen}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyServicesDetail" component={MyServicesDetail} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="AboutUS" component={AboutUsScreen} />
          <Stack.Screen name="ContactUS" component={ContactUsScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
