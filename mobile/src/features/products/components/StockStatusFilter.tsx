import { StyleSheet, View } from 'react-native';
import type {StockCount, StockStatus} from '../../../shared/api/types';
import FilterChip from "../../../shared/components/FilterChip";


type Props = {
    value: StockStatus | null;
    onChange: (status: StockStatus | null) => void;
    counts?: StockCount[];
};


const OPTIONS: { label: string; value: StockStatus | null }[] = [
    { label: 'Tous', value: null },
    { label: 'En stock', value: 'NORMAL' },
    { label: 'faible', value: 'FAIBLE' },
    { label: 'Rupture', value: 'RUPTURE' },
];

export default function StockStatusFilter({ value, onChange, counts = [] }: Props) {

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


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
});