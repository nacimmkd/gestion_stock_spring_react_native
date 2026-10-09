import {Pressable, StyleSheet, Text} from "react-native";

type ChipProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

export default function FilterChip({ label, selected, onPress }: ChipProps) {
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