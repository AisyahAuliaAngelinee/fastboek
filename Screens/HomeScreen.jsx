import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Image, ScrollView, ScrollViewComponent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCard from "../Components/PostCard";
import FooterStatusBar from "../Components/Footer";

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.logo}>facebook</Text>
					<View style={styles.iconPosition}>
						<View style={styles.icon}>
							<Ionicons name="search" size={22} style={{ color: "#000059" }} />
						</View>
						<View style={styles.icon}>
							<Ionicons name="create" size={22} style={{ color: "#000059" }} />
						</View>
					</View>

					<View style={styles.headingContainer}>
						<Image
							style={styles.imageProfile}
							source={{
								url: "https://ik.imagekit.io/hohoho/IMG_0658.JPG?updatedAt=1704527777515",
							}}
						/>
						<TextInput placeholder="What's on your mind?" placeholderTextColor={"gray"} style={styles.writePost} />
					</View>
					<View style={styles.separator}></View>

					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
				</View>
			</ScrollView>
			<FooterStatusBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	logo: {
		position: "absolute",
		left: 14,
		top: 14,
		fontFamily: "AvenirNext-DemiBold",
		fontSize: 34,
		fontWeight: "bold",
		color: "#3b5998",
	},
	icon: {
		left: 320,
		top: 14,
		width: 36,
		height: 36,
		borderRadius: "50",
		borderWidth: 2,
		borderColor: "lightgray",
		backgroundColor: "lightgray",
		alignItems: "center",
		justifyContent: "center",
		margin: 8,
	},

	iconPosition: {
		flexDirection: "row",
	},
	headingContainer: {
		marginTop: 21,
		padding: 10,
		top: 3,
		flexDirection: "row",
		gap: 21,
		alignItems: "center",
		marginLeft: 10,
	},
	PostCardUser: {
		top: 3,
		flexDirection: "row",
		gap: 21,
		alignItems: "center",
		marginLeft: 10,
	},

	writePost: {
		fontFamily: "AvenirNext-DemiBold",
		fontSize: 17,
	},
	imageProfile: {
		width: 43,
		height: 43,
		borderRadius: 50,
	},
	separator: {
		height: 8,
		marginVertical: 12,
		backgroundColor: "lightgray",
	},
	secondarySeperator: {
		height: 1,
		backgroundColor: "lightgray",
	},
	postSeperator: {
		height: 9,
		backgroundColor: "lightgray",
		marginBottom: 13,
	},

	imagePostHeader: {
		width: 43,
		height: 43,
		borderRadius: 20,
		position: "absolute",
		left: 20,
	},
	postContainer: {
		backgroundColor: "gray",
	},
	postHeader: {
		backgroundColor: "blue",
		padding: 10,
		marginBottom: 10,
		fontFamily: "AvenirNext-DemiBold",
		justifyContent: "center",
	},
	usernamePostHeader: {
		marginLeft: 200,
	},
});
