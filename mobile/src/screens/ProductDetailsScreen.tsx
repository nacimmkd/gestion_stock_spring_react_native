import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import type { ProductDetails, StockMovement } from "../api/types";
import { useFetch } from "../hooks/useFetch";
import { deleteProduct, getProduct, updateStock } from "../services/products.service";
import ProductDetailsCard from "../components/ProductDetailsCard";
import StatCard from "../components/StatCard";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";

type Props = StaticScreenProps<{ productId: string }>;

type Message = {
    title: string;
    text: string;
};

export default function ProductDetailsScreen({ route }: Props) {
    const { productId } = route.params;
    const navigation = useNavigation();

    const { data, loading, error } = useFetch(
        () => getProduct(productId),
        [productId]
    );

    const [updated, setUpdated] = useState<ProductDetails | null>(null);
    const [amount, setAmount] = useState("");
    const [saving, setSaving] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const product = updated ?? data;

    async function handleStock(type: StockMovement): Promise<void> {
        const quantity = Number.parseInt(amount, 10);
        if (!Number.isInteger(quantity) || quantity <= 0) {
            setMessage({
                title: "Quantité invalide",
                text: "Saisis un nombre entier supérieur à 0.",
            });
            return;
        }

        setSaving(true);
        try {
            setUpdated(await updateStock(productId, { type, quantity }));
            setAmount("");
        } catch (e: any) {
            setMessage({
                title: "Erreur",
                text: e?.response?.data?.message ?? "La mise à jour du stock a échoué.",
            });
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(): Promise<void> {
        setConfirmDelete(false);
        try {
            await deleteProduct(productId);
            navigation.goBack();
        } catch {
            setMessage({
                title: "Erreur",
                text: "La suppression a échoué.",
            });
        }
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{error ?? "Produit introuvable"}</Text>
            </View>
        );
    }

    const updatedAt = product.updatedAt
        ? new Date(product.updatedAt).toLocaleDateString("fr-FR")
        : "—";

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            <ProductDetailsCard product={product} />

            <View style={styles.row}>
                <StatCard value={product.quantity} label="Quantité" />
                <StatCard value={product.alertThreshold} label="Seuil d'alerte" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Mouvement de stock</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Quantité"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                />
                <View style={styles.row}>
                    <Button
                        label="+ Entrée"
                        variant="success"
                        onPress={() => handleStock("ENTREE")}
                        disabled={saving}
                        style={styles.flex}
                    />
                    <Button
                        label="− Sortie"
                        variant="warning"
                        onPress={() => handleStock("SORTIE")}
                        disabled={saving}
                        style={styles.flex}
                    />
                </View>
            </View>

            <Text style={styles.updatedAt}>Mis à jour le {updatedAt}</Text>

            {/* Actions sur le produit */}
            <View style={styles.row}>
                <Pressable style={[styles.button, styles.buttonPrimary]} onPress={() => {}}>
                    <Text style={styles.buttonPrimaryText}>Modifier</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonDanger]}
                    onPress={() => setConfirmDelete(true)}
                >
                    <Text style={styles.buttonDangerText}>Supprimer</Text>
                </Pressable>
            </View>

            {/* Confirmation de suppression */}
            <AlertDialog
                visible={confirmDelete}
                title="Supprimer le produit"
                message="Cette action est définitive."
                confirmLabel="Supprimer"
                destructive
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />

            {/* Messages d'erreur */}
            <AlertDialog
                visible={message !== null}
                title={message?.title ?? ""}
                message={message?.text}
                onConfirm={() => setMessage(null)}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    content: {
        padding: 16,
        gap: 12,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
    },
    error: {
        color: "#B91C1C",
        fontSize: 16,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },
    card: {
        padding: 16,
        gap: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    input: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        fontSize: 16,
        color: "#111827",
    },
    updatedAt: {
        fontSize: 12,
        color: "#9CA3AF",
        textAlign: "center",
    },

    button: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonIn: {
        backgroundColor: "#DCFCE7",
    },
    buttonInText: {
        color: "#15803D",
        fontWeight: "600",
    },
    buttonOut: {
        backgroundColor: "#FEF3C7",
    },
    buttonOutText: {
        color: "#B45309",
        fontWeight: "600",
    },
    buttonPrimary: {
        backgroundColor: "#374151",
    },
    buttonPrimaryText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    buttonDanger: {
        backgroundColor: "#FEE2E2",
    },
    buttonDangerText: {
        color: "#B91C1C",
        fontWeight: "600",
    },
    flex: {
        flex: 1,
    },
});