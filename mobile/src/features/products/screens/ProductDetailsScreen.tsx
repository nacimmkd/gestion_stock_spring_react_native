import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import StatCard from "../../../shared/components/StatCard";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import LoadingState from "../../../shared/components/LoadingState";
import Error from "../../../shared/components/Error";
import { useFetch } from "../../../shared/hooks/useFetch";
import type { ProductDetails, StockMovement } from "../../../shared/api/types";
import ProductDetailsCard from "../components/ProductDetailsCard";
import StockMovementForm from "../components/StockMovementForm";
import { deleteProduct, getProduct, updateStock } from "../api";

type Props = StaticScreenProps<{ productId: string }>;

function formatDate(date?: string): string {
    return date ? new Date(date).toLocaleDateString("fr-FR") : "—";
}

export default function ProductDetailsScreen({ route }: Props) {
    const { productId } = route.params;
    const navigation = useNavigation();

    const { data, loading, error } = useFetch(() => getProduct(productId), [productId]);

    const [updated, setUpdated] = useState<ProductDetails | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        setUpdated(null);
    }, [data]);

    const product = updated ?? data;

    async function handleStock(type: StockMovement, quantity: number): Promise<boolean> {
        try {
            setUpdated(await updateStock(productId, { type, quantity }));
            return true;
        } catch (e: any) {
            setMessage(e.message);
            return false;
        }
    }

    async function handleDelete(): Promise<void> {
        setConfirmDelete(false);
        try {
            await deleteProduct(productId);
            navigation.goBack();
        } catch (e: any) {
            setMessage(e.message);
        }
    }

    if (loading && !product) return <LoadingState />;
    if (!product) return <Error error={error ?? "Produit introuvable"} />;

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

            <StockMovementForm onSubmit={handleStock} />

            <Text style={styles.updatedAt}>Mis à jour le {formatDate(product.updatedAt)}</Text>

            <View style={styles.actions}>
                <Button
                    label="Modifier"
                    onPress={() => navigation.navigate("ProductUpdate", { productId })}
                />
                <Button
                    label="Supprimer"
                    variant="danger"
                    onPress={() => setConfirmDelete(true)}
                />
            </View>

            <Dialog
                visible={confirmDelete}
                title="Supprimer le produit"
                message="Cette action est définitive."
                confirmLabel="Supprimer"
                destructive
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />

            <Dialog
                visible={message !== null}
                title="Erreur"
                message={message ?? ""}
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
        flexGrow: 1,
        padding: 16,
        gap: 12,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    updatedAt: {
        fontSize: 12,
        color: "#9CA3AF",
        textAlign: "center",
    },
    actions: {
        marginTop: "auto",
        gap: 10,
        paddingBottom: 12,
    },
});