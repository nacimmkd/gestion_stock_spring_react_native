import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import StatCard from "../../../shared/components/StatCard";
import CercleChart from "../../../shared/components/CercleChart";
import {useFetch} from "../../../shared/hooks/useFetch";
import {Dashboard} from "../../../shared/api/types";
import {getDashboard} from "../api";
import {useEffect, useState} from "react";
import AlertDialog from "../../../shared/components/AlertDialog";


const COLORS = ["#374151", "#FCD34D", "#FCA5A5", "#86EFAC", "#93C5FD", "#C4B5FD"];


export default function DashboardScreen() {

    const { data, loading, error } = useFetch<Dashboard>(
        () => getDashboard(), []
    );
    const [message, setMessage] = useState<string | null>(null);

    const pieData = (data?.productsByCategory ?? []).map((item, index) => ({
        value: item.count ?? 0,
        color: COLORS[index % COLORS.length],
        label: item.category ?? "",
    }));

    useEffect(() => {
        if (error) setMessage(error);
    }, [error]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error || !data) {
        return (
            <AlertDialog
                visible={message !== null}
                title="Erreur"
                message={message ?? ""}
                onConfirm={() => setMessage(null)}
            />
        );
    }


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Tableau de bord</Text>

            <View style={styles.row}>
                <StatCard value={data.totalProducts} label="Produits" />
                <StatCard value={data.totalQuantity} label="Unités en stock" />
            </View>
            <View style={styles.row}>
                <StatCard value={data.outOfStock} label="En rupture" />
                <StatCard value={data.lowStock} label="Stock faible" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Produits par catégorie</Text>
                <CercleChart
                    data={pieData}
                    total={data.totalProducts}
                    centerLabel="produits"
                />
            </View>
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
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    card: {
        padding: 16,
        gap: 14,
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
});