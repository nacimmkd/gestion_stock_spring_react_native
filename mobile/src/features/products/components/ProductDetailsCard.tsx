import { StyleSheet, Text, View } from "react-native";
import type { ProductDetails } from "../../../shared/api/types";
import StatusBadge from "../../../shared/components/StatusBadge";

type Props = {
    product: ProductDetails;
};

export default function ProductDetailsCard({ product }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.meta}>
                    <Text style={styles.category} numberOfLines={1}>
                        {product.category?.name}
                    </Text>
                    <View style={styles.referenceTag}>
                        <Text style={styles.referenceText}>{product.reference}</Text>
                    </View>
                </View>
                <StatusBadge status={product.status} />
            </View>

            <Text style={styles.name}>{product.name}</Text>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
                {product.description || "Aucune description"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },
    reference: {
        fontWeight: "400",
        color: "#9CA3AF",
        textTransform: "none",
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
    },
    separator: {
        height: 5,
        backgroundColor: "#E5E7EB",
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: "#374151",
    },

    meta: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    category: {
        flexShrink: 1,
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    referenceTag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: "#F3F4F6",
    },
    referenceText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
    },
});