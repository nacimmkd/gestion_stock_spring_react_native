import { Pressable, View, Text, StyleSheet } from 'react-native';
import { type ProductSummary } from '../../../shared/api/types';
import StatusBadge from "../../../shared/components/StatusBadge";

type Props = {
    product: ProductSummary;
    onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.row}>
                <Text style={styles.category}>{product.category?.name}</Text>
                <StatusBadge status={product.status} />
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