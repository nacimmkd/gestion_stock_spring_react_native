import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    visible: boolean;
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
};

export default function Dialog({
        visible,
        title,
        message,
        confirmLabel = "OK",
        cancelLabel = "Annuler",
        destructive = false,
        onConfirm,
        onCancel,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onCancel ?? onConfirm}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>{title}</Text>
                    {message ? <Text style={styles.message}>{message}</Text> : null}

                    <View style={styles.actions}>
                        {onCancel ? (
                            <Pressable style={[styles.button, styles.cancel]} onPress={onCancel}>
                                <Text style={styles.cancelText}>{cancelLabel}</Text>
                            </Pressable>
                        ) : null}
                        <Pressable
                            style={[styles.button, destructive ? styles.danger : styles.confirm]}
                            onPress={onConfirm}
                        >
                            <Text style={destructive ? styles.dangerText : styles.confirmText}>
                                {confirmLabel}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "rgba(17, 24, 39, 0.5)",
    },
    dialog: {
        width: "100%",
        maxWidth: 360,
        padding: 20,
        gap: 8,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    message: {
        fontSize: 15,
        lineHeight: 22,
        color: "#6B7280",
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
    },
    button: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 12,
    },
    cancel: {
        backgroundColor: "#F3F4F6",
    },
    cancelText: {
        color: "#374151",
        fontWeight: "600",
    },
    confirm: {
        backgroundColor: "#374151",
    },
    confirmText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    danger: {
        backgroundColor: "#FEE2E2",
    },
    dangerText: {
        color: "#B91C1C",
        fontWeight: "600",
    },
});