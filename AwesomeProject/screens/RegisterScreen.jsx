import { StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function RegisterScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.header}>fastboek</Text>
			<TextInput placeholder="Full-name" placeholderTextColor={"#000"} style={styles.input} />
			<TextInput placeholder="Username" placeholderTextColor={"#000"} style={styles.input} />
			<TextInput placeholder="Email" placeholderTextColor={"#000"} keyboardType="email-address" style={styles.input} />
			<TextInput placeholder="Password" placeholderTextColor={"#000"} secureTextEntry style={styles.input} />
			<TouchableOpacity style={styles.registerBtn}>
				<Text style={styles.registerText} onPress={() => navigation.navigate("Login")}>
					Register
				</Text>
			</TouchableOpacity>
			<Text style={{ marginTop: 10 }}>
				Already have an Account?
				<Text style={{ fontWeight: "bold", color: "blue", fontFamily: "AvenirNext-DemiBold" }} onPress={() => navigation.navigate("Login")}>
					{" "}
					Login
				</Text>
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		fontFamily: "AvenirNext-DemiBold",
		fontSize: 50,
		fontWeight: "bold",
		color: "blue",
		paddingTop: 50,
	},
	input: {
		fontWeight: "300",
		borderWidth: 1,
		borderColor: "blue",
		width: 260,
		height: 30,
		margin: 4,
		borderRadius: 10,
		fontFamily: "AvenirNext-DemiBold",
	},
	registerBtn: {
		marginTop: 10,
		backgroundColor: "blue",
		fontWeight: "bold",
		borderRadius: 20,
		width: 180,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	registerText: {
		color: "white",
		fontWeight: "bold",
	},
});
