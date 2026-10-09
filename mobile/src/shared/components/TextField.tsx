import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export default function TextField({ label, error, multiline, style, ...inputProps }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    error ? styles.inputError : null,
                    style,
                ]}
                placeholderTextColor="#9CA3AF"
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "center"}
                {...inputProps}
            />

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
    input: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        color: "#111827",
    },
    multiline: {
        minHeight: 100,
    },
    inputError: {
        borderColor: "#B91C1C",
    },
    error: {
        fontSize: 13,
        color: "#B91C1C",
    },
});