import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import LoadingState from "../../../shared/components/LoadingState";
import Error from "../../../shared/components/Error";
import { useFetch } from "../../../shared/hooks/useFetch";
import ProductForm from "../components/ProductFrom";
import { getProduct, updateProduct } from "../api";
import { productUpdateSchema } from "../schema";
import {
    EMPTY_PRODUCT_FORM,
    toFormErrors,
    toFormValues,
    type ProductFormErrors,
    type ProductFormValues,
} from "../form";

type Props = StaticScreenProps<{ productId: string }>;

export default function ProductUpdateScreen({ route }: Props) {
    const { productId } = route.params;
    const navigation = useNavigation();

    const product = useFetch(() => getProduct(productId), [productId]);

    const [values, setValues] = useState(EMPTY_PRODUCT_FORM);
    const [errors, setErrors] = useState<ProductFormErrors>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        if (product.data) setValues(toFormValues(product.data));
    }, [product.data]);

    function handleChange<K extends keyof ProductFormValues>(
        field: K,
        value: ProductFormValues[K],
    ): void {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
    }

    async function handleSubmit(): Promise<void> {
        const result = productUpdateSchema.safeParse(values);

        if (!result.success) {
            setErrors(toFormErrors(result.error));
            return;
        }

        setErrors({});
        setSaving(true);
        try {
            await updateProduct(productId, result.data);
            navigation.goBack();
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setSaving(false);
        }
    }

    if (product.loading && !product.data) return <LoadingState />;
    if (!product.data) return <Error error={product.error ?? "Produit introuvable"} />;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <ProductForm
                values={values}
                errors={errors}
                onChange={handleChange}
                withQuantity={false}
            />

            <Button label="Enregistrer" onPress={handleSubmit} loading={saving} />

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
        padding: 16,
        gap: 12,
    },
});