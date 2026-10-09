import { StyleSheet, View } from "react-native";
import TextField from "../../../shared/components/TextField";
import OptionPicker from "../../../shared/components/OptionPicker";
import { useFetch } from "../../../shared/hooks/useFetch";
import { getCategory } from "../../categories/api";
import type { ProductFormErrors, ProductFormValues } from "../form";

type Props = {
    values: ProductFormValues;
    errors: ProductFormErrors;
    onChange: <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => void;
    withQuantity?: boolean;
};

export default function ProductForm({ values, errors, onChange, withQuantity = true }: Props) {
    const categories = useFetch(getCategory);

    const categoryOptions = (categories.data ?? [])
        .filter((category) => category.id)
        .map((category) => ({
            label: category.name ?? "",
            value: category.id as string,
        }));

    return (
        <>
            <View style={styles.card}>
                <TextField
                    label="Nom"
                    value={values.name}
                    onChangeText={(text) => onChange("name", text)}
                    placeholder="iPhone 15"
                    error={errors.name}
                />
                <TextField
                    label="Référence"
                    value={values.reference}
                    onChangeText={(text) => onChange("reference", text)}
                    placeholder="TEL-001"
                    autoCapitalize="characters"
                    error={errors.reference}
                />
                <OptionPicker
                    label="Catégorie"
                    placeholder={categories.loading ? "Chargement..." : "Choisir une catégorie"}
                    options={categoryOptions}
                    value={values.categoryId}
                    onChange={(id) => onChange("categoryId", id)}
                    error={errors.categoryId}
                />
            </View>

            <View style={[styles.card, styles.row]}>
                {withQuantity ? (
                    <View style={styles.flex}>
                        <TextField
                            label="Quantité"
                            value={values.quantity}
                            onChangeText={(text) => onChange("quantity", text)}
                            placeholder="0"
                            keyboardType="number-pad"
                            error={errors.quantity}
                        />
                    </View>
                ) : null}
                <View style={styles.flex}>
                    <TextField
                        label="Seuil d'alerte"
                        value={values.alertThreshold}
                        onChangeText={(text) => onChange("alertThreshold", text)}
                        placeholder="0"
                        keyboardType="number-pad"
                        error={errors.alertThreshold}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <TextField
                    label="Description (optionnelle)"
                    value={values.description}
                    onChangeText={(text) => onChange("description", text)}
                    placeholder="Quelques mots sur le produit"
                    multiline
                    error={errors.description}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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