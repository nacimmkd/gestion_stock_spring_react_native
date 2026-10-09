import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingState() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#374151" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
    },
});