import { ScrollView, StyleSheet, Text, View } from "react-native";
import StatCard from "../../../shared/components/StatCard";
import CercleChart from "../../../shared/components/CercleChart";
import LoadingState from "../../../shared/components/LoadingState";
import Error from "../../../shared/components/Error";
import { useFetch } from "../../../shared/hooks/useFetch";
import type { CategoryCount } from "../../../shared/api/types";
import { getDashboard } from "../api";


export default function DashboardScreen() {
    const { data, loading, error } = useFetch(getDashboard);

    if (loading && !data) return <LoadingState />;
    if (!data) return <Error error={error ?? "Données indisponibles"} />;

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
                    data={toChartData(data.productsByCategory)}
                    total={data.totalProducts}
                    centerLabel="produits"
                />
            </View>
        </ScrollView>
    );
}



const CHART_COLORS = ["#374151", "#FCD34D", "#FCA5A5", "#86EFAC", "#93C5FD", "#C4B5FD"];

function toChartData(categories: CategoryCount[] = []) {
    return categories.map((item, index) => ({
        label: item.category ?? "",
        value: item.count ?? 0,
        color: CHART_COLORS[index % CHART_COLORS.length],
    }));
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