import { Pressable, StyleSheet, Text, View } from 'react-native';
import type {StockCount, StockStatus} from '../../../shared/api/types';

type Props = {
    value: StockStatus | null;
    onChange: (status: StockStatus | null) => void;
    counts?: StockCount[];
};

type ChipProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

const OPTIONS: { label: string; value: StockStatus | null }[] = [
    { label: 'Tous', value: null },
    { label: 'En stock', value: 'NORMAL' },
    { label: 'faible', value: 'FAIBLE' },
    { label: 'Rupture', value: 'RUPTURE' },
];

export default function StatusFilter({ value, onChange, counts = [] }: Props) {

    function labelFor(option: { label: string; value: StockStatus | null }): string {
        if (option.value === null || counts.length === 0) return option.label;

        const count = counts.find((item) => item.status === option.value)?.count ?? 0;

        return `${option.label} (${count})`;
    }

    return (
        <View style={styles.container}>
            {OPTIONS.map((option) => (
                <FilterChip
                    key={option.label}
                    label={labelFor(option)}
                    selected={value === option.value}
                    onPress={() => onChange(option.value)}
                />
            ))}
        </View>
    );
}

function FilterChip({ label, selected, onPress }: ChipProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && styles.pressed,
            ]}
        >
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    chip: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    chipSelected: {
        borderColor: '#374151',
        backgroundColor: '#374151',
    },
    pressed: {
        opacity: 0.7,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280',
    },
    labelSelected: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});