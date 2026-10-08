import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type Props = {
    data: { value: number; color: string; label: string }[];
    total?: number;
    centerLabel?: string;
    radius?: number;
    innerRadius?: number;
};

export default function CercleChart({
           data,
           total,
           centerLabel,
           radius = 70,
           innerRadius = 45,
}: Props) {
    return (
        <View style={styles.chart}>

            <View style={styles.pie}>
                <PieChart
                    data={data}
                    donut
                    radius={radius}
                    innerRadius={innerRadius}
                    centerLabelComponent={() => (
                        <View style={styles.chartCenter}>
                            <Text style={styles.chartTotal}>{total}</Text>
                            {centerLabel ? (
                                <Text style={styles.chartTotalLabel}>{centerLabel}</Text>
                            ) : null}
                        </View>
                    )}
                />
            </View>

            <View style={styles.legend}>
                {data.map((item) => (
                    <View key={item.label} style={styles.legendItem}>
                        <View style={[styles.dot, { backgroundColor: item.color }]} />
                        <Text style={styles.legendLabel} numberOfLines={1}>
                            {item.label}
                        </Text>
                        <Text style={styles.legendValue}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chart: {
        flexDirection: "column",
        gap: 20,
    },

    pie: {
        alignItems: "center",
    },

    chartCenter: {
        alignItems: "center",
    },
    chartTotal: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    chartTotalLabel: {
        fontSize: 12,
        color: "#6B7280",
    },
    legend: {
        flex: 1,
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