import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export type Option<T> = {
    label: string;
    value: T;
};

type Props<T> = {
    label?: string;
    placeholder?: string;
    options: Option<T>[];
    value: T | null;
    onChange: (value: T) => void;
    error?: string;
};

export default function OptionPicker<T extends string | number>({
               label,
               placeholder = "Sélectionner",
               options,
               value,
               onChange,
               error,
}: Props<T>) {

    const [open, setOpen] = useState(false);
    const selected = options.find((option) => option.value === value);

    function handleSelect(option: Option<T>): void {
        onChange(option.value);
        setOpen(false);
    }

    return (
        <View style={styles.container}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <Pressable
                onPress={() => setOpen(!open)}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
                style={[
                    styles.field,
                    open && styles.fieldOpen,
                    error ? styles.fieldError : null,
                ]}
            >
                <Text style={selected ? styles.fieldText : styles.placeholder} numberOfLines={1}>
                    {selected ? selected.label : placeholder}
                </Text>
                <Feather name={open ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
            </Pressable>

            {open ? (
                <View style={styles.list}>
                    {options.map((option, index) => {
                        const isSelected = option.value === value;

                        return (
                            <Pressable
                                key={option.value}
                                onPress={() => handleSelect(option)}
                                style={({ pressed }) => [
                                    styles.option,
                                    index > 0 && styles.optionBorder,
                                    pressed && styles.optionPressed,
                                ]}
                            >
                                <Text
                                    style={[styles.optionText, isSelected && styles.optionTextSelected]}
                                    numberOfLines={1}
                                >
                                    {option.label}
                                </Text>
                                {isSelected ? <Feather name="check" size={18} color="#111827" /> : null}
                            </Pressable>
                        );
                    })}
                </View>
            ) : null}

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },

    field: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    fieldOpen: {
        borderColor: "#374151",
    },
    fieldError: {
        borderColor: "#B91C1C",
    },
    fieldText: {
        flex: 1,
        fontSize: 16,
        color: "#111827",
    },
    placeholder: {
        flex: 1,
        fontSize: 16,
        color: "#9CA3AF",
    },

    list: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    optionBorder: {
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
    optionPressed: {
        backgroundColor: "#F3F4F6",
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: "#374151",
    },
    optionTextSelected: {
        fontWeight: "600",
        color: "#111827",
    },

    error: {
        fontSize: 13,
        color: "#B91C1C",
    },
});