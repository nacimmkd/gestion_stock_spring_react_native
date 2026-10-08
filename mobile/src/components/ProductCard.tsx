import { Pressable, View, Text, StyleSheet } from 'react-native';
import { type ProductSummary } from '../api/types';

type Props = {
    product: ProductSummary;
    onPress: () => void;
};

const STATUS_COLORS = {
    NORMAL: { text: '#FFFFFF', background: '#374151' },
    FAIBLE: { text: '#B45309', background: '#FEF3C7' },
    RUPTURE: { text: '#B91C1C', background: '#FEE2E2' },
};

export default function ProductCard({ product, onPress }: Props) {
    const statusColor = STATUS_COLORS[product.status ?? 'NORMAL'];

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.row}>
                <Text style={styles.category}>{product.category?.name}</Text>
                <View style={[styles.badge, { backgroundColor: statusColor.background }]}>
                    <Text style={[styles.badgeText, { color: statusColor.text }]}>{product.status}</Text>
                </View>
            </View>

            <Text style={styles.name} numberOfLines={1}>
                {product.name}
            </Text>

            <View style={styles.row}>
                <Text style={styles.textSecondary}>
                    Quantité : <Text style={styles.value}>{product.quantity}</Text>
                </Text>
                <Text style={styles.textSecondary}>
                    Seuil : <Text style={styles.value}>{product.alertThreshold}</Text>
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 10,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    pressed: {
        opacity: 0.7,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111827',
    },
    textSecondary: {
        fontSize: 14,
        color: '#6B7280',
    },
    value: {
        fontWeight: '600',
        color: '#111827',
    },
});