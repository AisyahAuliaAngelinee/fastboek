import { Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Image, ScrollView, ScrollViewComponent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostCard() {
	return (
		<View>
			<View style={styles.PostCardUser}>
				<Image
					style={styles.imageProfile}
					source={{
						url: "https://ik.imagekit.io/hohoho/ABF7AB7A-4FC0-4EAB-8E70-34049B2A7292.JPG?updatedAt=1704531937283",
					}}
				/>
				<View>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>Shellin Winata</Text>
					<Text style={{ fontWeight: "light", fontSize: 12 }}>5 December 2021</Text>
				</View>
			</View>

			<View style={{ marginVertical: 7, marginLeft: 12 }}>
				<Text>Mixed Media Painting, Orient Fluer Magnolia. Dimension 120*150. SOLD, thanks to Mr.Gabrielle for purchasing upon exhibition. Sold @ $2100. Thank you everyone for the enthusiasm.</Text>
			</View>
			<View>
				<Image
					style={{
						width: "100%",
						height: 800,
					}}
					source={{
						url: "https://ik.imagekit.io/hohoho/IMG_0658.JPG?updatedAt=1704527777515",
					}}
				/>
			</View>

			<View style={styles.secondarySeperator}></View>
			<View
				style={{
					flexDirection: "row",
					alignSelf: "flex-end",
					alignItems: "center",
					height: 34,
				}}
			>
				<View style={{ marginHorizontal: 12 }}>
					<Text style={{ fontSize: 14, color: "black" }}>60 Likes</Text>
				</View>
				<View style={{ marginHorizontal: 12 }}>
					<Text style={{ fontSize: 14, color: "black" }}>12 Comments</Text>
				</View>
			</View>

			<View style={styles.secondarySeperator}></View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					alignItems: "center",
					height: 34,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						columnGap: 4,
					}}
				>
					<Ionicons name="heart-outline" size={22} style={{ color: "#000059" }} />
					<Text>Like</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						columnGap: 4,
					}}
				>
					<Ionicons name="chatbubble-outline" size={22} style={{ color: "#000059" }} />
					<Text>Comment</Text>
				</View>
			</View>
			<View style={styles.postSeperator}></View>
		</View>
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
});
