import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "../../../shared/components/Button";
import { countOutOfStock } from "../api";

export default function OutOfStockAlert() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        countOutOfStock()
            .then(setCount)
            .catch(() => {});
    }, []);

    const close = () => setCount(0);

    return (
        <Modal
            visible={count > 0}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={close}
        >
            <View style={styles.screen}>
                <View style={styles.content}>
                    <View style={styles.icon}>
                        <Feather name="alert-triangle" size={36} color="#B91C1C" />
                    </View>

                    <Text style={styles.count}>{count}</Text>
                    <Text style={styles.title}>
                        {count === 1 ? "produit en rupture" : "produits en rupture"}
                    </Text>
                    <Text style={styles.message}>
                        Pensez à réapprovisionner le stock. Vous pouvez retrouver
                        ces produits avec le filtre « Rupture » de la liste.
                    </Text>
                </View>

                <Button label="Continuer" onPress={close} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: "#FEE2E2",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    count: {
        fontSize: 72,
        fontWeight: "700",
        color: "#B91C1C",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
        marginTop: 4,
    },
    message: {
        fontSize: 15,
        lineHeight: 22,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 16,
    },
});