import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    type StyleProp,
    type ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "success" | "warning" | "danger";

type Props = {
    label: string;
    onPress: () => void;
    variant?: Variant;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
};

const VARIANTS: Record<Variant, { background: string; text: string }> = {
    primary: { background: "#374151", text: "#FFFFFF" },
    secondary: { background: "#F3F4F6", text: "#374151" },
    success: { background: "#DCFCE7", text: "#15803D" },
    warning: { background: "#FEF3C7", text: "#B45309" },
    danger: { background: "#FEE2E2", text: "#B91C1C" },
};

export default function Button({
            label,
            onPress,
            variant = "primary",
            disabled = false,
            loading = false,
            style,
}: Props) {
    const colors = VARIANTS[variant];
    const inactive = disabled || loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={inactive}
            accessibilityRole="button"
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.background },
                inactive && styles.inactive,
                pressed && styles.pressed,
                style,
            ]}
        >
            {loading
                ? <ActivityIndicator color={colors.text} />
                : <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    inactive: {
        opacity: 0.5,
    },
    pressed: {
        opacity: 0.7,
    },
    label: {
        fontWeight: "600",
    },
});