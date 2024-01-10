import { Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Image, ScrollView, ScrollViewComponent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FooterStatusBar() {
	return (
		<TouchableOpacity>
			<View style={styles.footerContainer}>
				<View style={{ alignItems: "center" }}>
					<Ionicons
						name="home"
						size={28}
						style={{ color: "gray" }}
						onPress={() => {
							console.log("home button");
						}}
					/>
					<Text style={styles.footerSubTitle}>Home</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<Ionicons
						name="people"
						size={28}
						style={{ color: "gray" }}
						onPress={() => {
							console.log("friends button");
						}}
					/>
					<Text style={styles.footerSubTitle}>Friends</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<Ionicons
						name="menu"
						size={28}
						style={{ color: "gray" }}
						onPress={() => {
							console.log("not sure what goes here");
						}}
					/>
					<Text style={styles.footerSubTitle}>Profile</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	footerContainer: {
		paddingTop: 9,
		height: 47,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	footerSubTitle: {
		fontSize: 10,
	},
});
