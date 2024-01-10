import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";

export default function LoginRegister() {
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<View style={styles.center}>
					<View>
						<Text style={styles.facebookLogo}>Facebook</Text>
					</View>
					<View style={{ gap: 4 }}>
						<TextInput placeholder="Full-name" placeholderTextColor={"gray"} style={styles.input} />
						<TextInput placeholder="Username" placeholderTextColor={"gray"} style={styles.input} />
						<TextInput placeholder="Email" placeholderTextColor={"gray"} keyboardType="email-address" style={styles.input} />
						<TextInput placeholder="Password" placeholderTextColor={"gray"} secureTextEntry style={styles.input} />

						<View style={styles.center}>
							<Pressable style={styles.btnLoginRegis}>
								<Text
									style={{
										color: "white",
										fontWeight: "bold",
									}}
								>
									Register
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			<View style={styles.LoginPosition}>
				<Text>Already have an account?</Text>
				<TouchableOpacity>
					<Text style={{ color: "#3b5998", fontWeight: "bold" }}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	facebookLogo: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#3b5998",
		paddingBottom: 20,
	},
	btnLoginRegis: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 15,
		height: 40,
		width: 200,
		borderRadius: 20,
		backgroundColor: "#3b5998",
		borderWidth: 2,
		borderColor: "#3b5998",
	},
	input: {
		paddingLeft: 12,
		fontWeight: "300",
		borderWidth: 2,
		borderColor: "#3b5998",
		width: 260,
		height: 45,
		margin: 4,
		borderRadius: 20,
	},
	LoginPosition: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
	},
});
