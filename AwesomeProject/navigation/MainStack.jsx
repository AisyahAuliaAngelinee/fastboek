import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

export default function MainStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={"Register"} component={RegisterScreen} />
			<Stack.Screen name={"Login"} component={LoginScreen} />
			<Stack.Screen name={"Home"} component={HomeScreen} />
		</Stack.Navigator>
	);
}
