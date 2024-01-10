import { StyleSheet, TextInput, View, Image, ScrollView } from "react-native";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FooterBarNavigation from "../component/FooterBarNavigation";

export default function HomeScreen() {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.logo}>fastboek</Text>
				<Ionicons name="add-circle" size={32} style={styles.icon} />
				<View style={styles.headingContainer}>
					<Image style={styles.imageProfile} source={{ url: "https://media.discordapp.net/attachments/427408408329846786/1184907953971675227/74334686_p0_master1200.png?ex=65a95e06&is=6596e906&hm=4cf75ab3dfff185b56edc7ce8f48c86c6b0f79031fd1feed8a1d9037b6ef7663&=&format=webp&quality=lossless&width=1446&height=1366" }} />
					<TextInput placeholder="Search" placeholderTextColor={"#000"} style={styles.search} />
				</View>
				<ScrollView>
					<View style={styles.postContainer}>
						<View style={styles.postHeader}>
							<Image style={styles.imagePostHeader} source={{ url: "https://media.discordapp.net/attachments/427408408329846786/1184907953971675227/74334686_p0_master1200.png?ex=65a95e06&is=6596e906&hm=4cf75ab3dfff185b56edc7ce8f48c86c6b0f79031fd1feed8a1d9037b6ef7663&=&format=webp&quality=lossless&width=1446&height=1366" }} />
							<Text style={styles.usernamePostHeader}>Aisyah Aulia Angelinee</Text>
						</View>
						<View style={styles.postContent}>
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
							></View>

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
						</View>
					</View>
					<View style={styles.postContainer}>
						<View style={styles.postHeader}>
							<Image style={styles.imagePostHeader} source={{ url: "https://media.discordapp.net/attachments/427408408329846786/1184907953971675227/74334686_p0_master1200.png?ex=65a95e06&is=6596e906&hm=4cf75ab3dfff185b56edc7ce8f48c86c6b0f79031fd1feed8a1d9037b6ef7663&=&format=webp&quality=lossless&width=1446&height=1366" }} />
							<Text style={styles.usernamePostHeader}>Aisyah Aulia Angelinee</Text>
						</View>
						<View style={styles.postContent}>
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
							></View>

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
						</View>
					</View>
				</ScrollView>
			</View>
			<FooterBarNavigation />
		</>
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
		fontSize: 27,
		fontWeight: "bold",
		color: "blue",
	},
	icon: {
		left: 320,
		top: 14,
		zIndex: 1,
		color: "grey",
	},
	headingContainer: {
		margin: 15,
		padding: 10,
		top: 3,
		flexDirection: "row",
		gap: 21,
		alignItems: "center",
		marginLeft: 10,
	},
	search: {
		backgroundColor: "ghostwhite",
		borderRadius: 20,
		fontFamily: "AvenirNext-DemiBold",
		width: 270,
		height: 40,
	},
	imageProfile: {
		width: 43,
		height: 43,
		borderRadius: 20,
	},
	imagePostHeader: {
		width: 43,
		height: 43,
		borderRadius: 20,
		position: "absolute",
		left: 20,
	},
	postContainer: {
		marginTop: 3,
	},
	postHeader: {
		padding: 10,
		marginBottom: 10,
		fontFamily: "AvenirNext-DemiBold",
		justifyContent: "center",
	},
	usernamePostHeader: {
		marginLeft: 190,
		fontWeight: "bold",
	},
	postContent: {
		padding: 10,
	},
	secondarySeperator: {
		height: 1,
		backgroundColor: "lightgray",
	},
});
