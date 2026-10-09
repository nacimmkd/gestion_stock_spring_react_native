import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Error from "../../../shared/components/Error";
import type { ProductSummary } from "../../../shared/api/types";
import ProductCard from "../components/ProductCard";
import StatusFilter from "../components/StatusFilter";
import { useProductList } from "../hooks/useProductList";
import {countsByStatus} from "../api";
import {useFetch} from "../../../shared/hooks/useFetch";

export default function ProductListScreen() {
    const navigation = useNavigation();
    const list = useProductList();
    const statusCounts = useFetch(countsByStatus, []);

    function openProduct(product: ProductSummary): void {
        if (product.id) navigation.navigate("ProductDetails", { productId: product.id });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar onPress={list.searchFor} />
                <StatusFilter
                    value={list.status}
                    onChange={list.filterBy}
                    counts={statusCounts.data ?? []}
                />
            </View>

            <FlatList
                data={list.products}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => openProduct(item)} />
                )}
                contentContainerStyle={styles.products}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    list.loading
                        ? <ActivityIndicator color="#374151" />
                        : <Text style={styles.empty}>Aucun produit trouvé</Text>
                }
                ListFooterComponent={
                    list.hasMore
                        ? <Button label="Charger plus" onPress={list.loadMore} loading={list.loading} />
                        : null
                }
            />

            <Error error={list.error} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
        gap: 2,
        backgroundColor: "#F3F4F6",
    },
    header: {
        gap: 10,
        paddingBottom: 10,
    },
    products: {
        gap: 4,
    },
    empty: {
        paddingVertical: 24,
        textAlign: "center",
        color: "#6B7280",
    },
});