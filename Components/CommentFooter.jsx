import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    SafeAreaView,
    Image,
    ScrollView,
    ScrollViewComponent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CommentFooter() {
    return (
        <TouchableOpacity>
            <View style={{ backgroundColor: "#F1F9FB", height: 1 }}></View>
            <View style={styles.commentContainer}>
                <TextInput
                    placeholder="Write your thoughts here..."
                    placeholderTextColor={"gray"}
                    style={styles.commentInput}
                />
                <Pressable style={styles.sendBtn}>
                    <Ionicons
                        name="send-outline"
                        size={28}
                        style={{ color: "gray" }}
                        onPress={() => {
                            console.log("not sure what goes here");
                        }}
                    />
                </Pressable>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    commentContainer: {
        height: 47,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    commentInput: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        height: "80%",
        fontFamily: "AvenirNext-DemiBold",
        fontSize: 17,
        backgroundColor: "#E7E9E9",
        borderRadius: 20,
        paddingLeft: 20,
    },
    sendBtn: {
        marginTop: 5,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        borderRadius: 20,
    },
});
