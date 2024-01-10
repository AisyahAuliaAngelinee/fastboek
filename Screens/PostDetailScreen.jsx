import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Image, ScrollView, ScrollViewComponent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CommentFooter from "../Components/CommentFooter";

export default function PostDetailScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text>Username of Post Here</Text>
				<Text>Post Content Here</Text>
				<Text>Image</Text>
				<Text>Like Button</Text>
				<Text>Comment button</Text>
				<Text>50 Like</Text>
				<Text>List of all Comment here</Text>
				<Text>Input Comment Section Here</Text>
			</ScrollView>
			<CommentFooter />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	PostCardUser: {
		top: 3,
		flexDirection: "row",
		gap: 21,
		alignItems: "center",
		marginLeft: 10,
	},
});
