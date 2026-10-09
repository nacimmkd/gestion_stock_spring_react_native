import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    color?: string;
    background?: string;
};

export default function Badge({ label, color = "#374151", background = "#F3F4F6" }: Props) {
    return (
        <View style={[styles.badge, { backgroundColor: background }]}>
            <Text style={[styles.text, { color }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    text: {
        fontSize: 12,
        fontWeight: "600",
    },
});