import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import TextField from "../components/TextField";
import OptionPicker from "../components/OptionPicker";
import Button from "../components/Button";
import AlertDialog from "../components/AlertDialog";
import { useFetch } from "../hooks/useFetch";
import type { Category, ProductDetails } from "../api/types";
import { getCategory } from "../services/CategoryService";
import { getProduct, updateProduct } from "../services/ProductsService";
import { productUpdateSchema } from "../validation/productSchema";

type Props = StaticScreenProps<{ productId: string }>;

type FormValues = {
    name: string;
    reference: string;
    categoryId: string | null;
    alertThreshold: string;
    description: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
    name: "",
    reference: "",
    categoryId: null,
    alertThreshold: "",
    description: "",
};


function toFormValues(product: ProductDetails): FormValues {
    return {
        name: product.name ?? "",
        reference: product.reference ?? "",
        categoryId: product.category?.id ?? null,
        alertThreshold: String(product.alertThreshold ?? ""),
        description: product.description ?? "",
    };
}

export default function ProductUpdateScreen({ route }: Props) {
    const { productId } = route.params;
    const navigation = useNavigation();

    const product = useFetch<ProductDetails>(() => getProduct(productId), [productId]);
    const categories = useFetch<Category[]>(() => getCategory(), []);

    const [values, setValues] = useState<FormValues>(EMPTY_FORM);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        if (product.data) setValues(toFormValues(product.data));
    }, [product.data]);

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
        const result = productUpdateSchema.safeParse(values);

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
            await updateProduct(productId, result.data);
            navigation.goBack();
        } catch (error: any) {
            setMessage(error?.response?.data?.message ?? "L'enregistrement a échoué.");
        } finally {
            setSaving(false);
        }
    }

    if (product.loading && !product.data) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator />
            </View>
        );
    }

    if (product.error || !product.data) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{product.error ?? "Produit introuvable"}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
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
                <TextField
                    label="Seuil d'alerte"
                    value={values.alertThreshold}
                    onChangeText={(text) => setField("alertThreshold", text)}
                    placeholder="0"
                    keyboardType="number-pad"
                    error={errors.alertThreshold}
                />
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
    card: {
        padding: 16,
        gap: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
});