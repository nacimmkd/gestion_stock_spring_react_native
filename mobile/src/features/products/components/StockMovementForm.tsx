import { useState } from "react";
import { StyleSheet, View } from "react-native";
import TextField from "../../../shared/components/TextField";
import Button from "../../../shared/components/Button";
import type { StockMovement } from "../../../shared/api/types";

type Props = {
    onSubmit: (type: StockMovement, quantity: number) => Promise<boolean>;
};

export default function StockMovementForm({ onSubmit }: Props) {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string>();
    const [saving, setSaving] = useState(false);

    function handleChange(text: string): void {
        setAmount(text);
        setError(undefined);
    }

    async function submit(type: StockMovement): Promise<void> {
        const quantity = Number(amount);

        if (!/^\d+$/.test(amount) || quantity === 0) {
            setError("Saisis un nombre entier supérieur à 0.");
            return;
        }

        setSaving(true);
        const success = await onSubmit(type, quantity);
        setSaving(false);

        if (success) setAmount("");
    }

    return (
        <View style={styles.card}>
            <TextField
                label="Mouvement de stock"
                value={amount}
                onChangeText={handleChange}
                placeholder="Quantité"
                keyboardType="number-pad"
                error={error}
            />
            <View style={styles.row}>
                <Button
                    label="+ Entrée"
                    onPress={() => submit("ENTREE")}
                    disabled={saving}
                    style={styles.flex}
                />
                <Button
                    label="− Sortie"
                    variant="danger"
                    onPress={() => submit("SORTIE")}
                    disabled={saving}
                    style={styles.flex}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        gap: 10,
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