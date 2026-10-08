import { StyleSheet, Text, View } from "react-native";
import type { StockStatus } from "../api/types";

type Props = {
    status?: StockStatus;
};

const STATUS_COLORS: Record<StockStatus, { text: string; background: string }> = {
    NORMAL: { text: "#FFFFFF", background: "#374151" },
    FAIBLE: { text: "#B45309", background: "#FEF3C7" },
    RUPTURE: { text: "#B91C1C", background: "#FEE2E2" },
};

export default function StatusBadge({ status = "NORMAL" }: Props) {
    const color = STATUS_COLORS[status];

    return (
        <View style={[styles.badge, { backgroundColor: color.background }]}>
            <Text style={[styles.text, { color: color.text }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    text: {
        fontSize: 12,
        fontWeight: "600",
    },
});