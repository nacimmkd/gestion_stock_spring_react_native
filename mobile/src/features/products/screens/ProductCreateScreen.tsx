import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextField from "../../../shared/components/TextField";
import OptionPicker from "../../../shared/components/OptionPicker";
import Button from "../../../shared/components/Button";
import AlertDialog from "../../../shared/components/AlertDialog";
import { useFetch } from "../../../shared/hooks/useFetch";
import type { Category } from "../../../shared/api/types";
import { getCategory } from "../../categories/api";
import { createProduct } from "../api";
import { schema } from "../schema";

type FormValues = {
    name: string;
    reference: string;
    categoryId: string | null;
    quantity: string;
    alertThreshold: string;
    description: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
    name: "",
    reference: "",
    categoryId: null,
    quantity: "",
    alertThreshold: "",
    description: "",
};

export default function ProductCreateScreen() {
    const navigation = useNavigation();

    const categories = useFetch<Category[]>(() => getCategory(), []);

    const [values, setValues] = useState<FormValues>(EMPTY_FORM);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const categoryOptions = (categories.data ?? [])
        .filter((category) => category.id)
        .map((category) => ({
            label: category.name ?? "",
            value: category.id as string,
        }));

    function setField<K extends keyof FormValues>(field: K, value: FormValues[K]): void {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
    }

    async function handleSubmit(): Promise<void> {
        const result = schema.safeParse(values);

        if (!result.success) {
            const found: FieldErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof FormValues;
                found[field] ??= issue.message;
            }
            setErrors(found);
            return;
        }

        setErrors({});
        setSaving(true);
        try {
            const product = await createProduct(result.data);

            setValues(EMPTY_FORM);
            if (product.id) {
                navigation.navigate("ProductDetails", { productId: product.id });
            }
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setSaving(false);
        }
    }



    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Nouveau produit</Text>

            <View style={styles.card}>
                <TextField
                    label="Nom"
                    value={values.name}
                    onChangeText={(text) => setField("name", text)}
                    placeholder="iPhone 15"
                    error={errors.name}
                />

                <TextField
                    label="Référence"
                    value={values.reference}
                    onChangeText={(text) => setField("reference", text)}
                    placeholder="TEL-001"
                    autoCapitalize="characters"
                    error={errors.reference}
                />

                <OptionPicker
                    label="Catégorie"
                    placeholder={categories.loading ? "Chargement..." : "Choisir une catégorie"}
                    options={categoryOptions}
                    value={values.categoryId}
                    onChange={(id) => setField("categoryId", id)}
                    error={errors.categoryId}
                />
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.flex}>
                        <TextField
                            label="Quantité"
                            value={values.quantity}
                            onChangeText={(text) => setField("quantity", text)}
                            placeholder="0"
                            keyboardType="number-pad"
                            error={errors.quantity}
                        />
                    </View>
                    <View style={styles.flex}>
                        <TextField
                            label="Seuil d'alerte"
                            value={values.alertThreshold}
                            onChangeText={(text) => setField("alertThreshold", text)}
                            placeholder="0"
                            keyboardType="number-pad"
                            error={errors.alertThreshold}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <TextField
                    label="Description (optionnelle)"
                    value={values.description}
                    onChangeText={(text) => setField("description", text)}
                    placeholder="Quelques mots sur le produit"
                    multiline
                    error={errors.description}
                />
            </View>

            <Button label="Enregistrer" onPress={handleSubmit} loading={saving} />

            <AlertDialog
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
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    card: {
        padding: 16,
        gap: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    flex: {
        flex: 1,
    },
});