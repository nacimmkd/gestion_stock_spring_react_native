import { StyleSheet, Text, View } from "react-native";

type Props = {
    value?: number;
    label: string;
};

export default function StatCard({ value, label }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.value}>{value ?? "—"}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        gap: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    value: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
    },
});