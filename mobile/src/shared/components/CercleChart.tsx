import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export type ChartSlice = {
    label: string;
    value: number;
    color: string;
};

type Props = {
    data: ChartSlice[];
    total?: number;
    centerLabel?: string;
};

const RADIUS = 70;
const INNER_RADIUS = 45;

export default function DonutChart({ data, total, centerLabel }: Props) {
    const sum = total ?? data.reduce((acc, slice) => acc + slice.value, 0);

    return (
        <View style={styles.container}>
            <View style={styles.pie}>
                <PieChart
                    data={data}
                    donut
                    radius={RADIUS}
                    innerRadius={INNER_RADIUS}
                    centerLabelComponent={() => (
                        <View style={styles.center}>
                            <Text style={styles.total}>{sum}</Text>
                            {centerLabel ? <Text style={styles.totalLabel}>{centerLabel}</Text> : null}
                        </View>
                    )}
                />
            </View>

            <View style={styles.legend}>
                {data.map((slice) => (
                    <View key={slice.label} style={styles.legendItem}>
                        <View style={[styles.dot, { backgroundColor: slice.color }]} />
                        <Text style={styles.legendLabel} numberOfLines={1}>{slice.label}</Text>
                        <Text style={styles.legendValue}>{slice.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    pie: {
        alignItems: "center",
    },
    center: {
        alignItems: "center",
    },
    total: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    totalLabel: {
        fontSize: 12,
        color: "#6B7280",
    },
    legend: {
        gap: 10,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendLabel: {
        flex: 1,
        fontSize: 14,
        color: "#374151",
    },
    legendValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
});