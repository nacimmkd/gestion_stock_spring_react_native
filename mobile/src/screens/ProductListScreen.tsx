import {StyleSheet, FlatList, View, Text, Pressable, ActivityIndicator} from 'react-native';
import {ProductSummary, StockStatus} from '../api/types';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import StatusFilter from "../components/StatusFilter";
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch";
import { getProducts } from "../services/products.service";
import {useNavigation} from "@react-navigation/native";

export default function ProductListScreen () {

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<ProductSummary[]>([]);
    const [filter, setFilter] = useState<StockStatus | null>(null);
    const { data, loading, error } = useFetch(
        () => getProducts({ search: search || undefined, status: filter ?? undefined, page }),
        [search, filter, page]
    );
    const navigation = useNavigation();
    const hasMore = data ? !data.last : false;

    function handlePress(text: string): void {
        setFilter(null);
        setSearch(text.trim());
        setPage(0);
    }

    function handleFilterChange(status: StockStatus | null): void {
        setFilter(status);
        setPage(0);
    }

    useEffect(() => {
        if (!data) return;
        const content: ProductSummary[] = data.content ?? [];

        setProducts(previous => {
            if (data.number === 0) return content;
            const ids = new Set(previous.map(product => product.id));
            return [...previous, ...content.filter(product => !ids.has(product.id))];
        });
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    onPress={handlePress}
                />
                <StatusFilter
                    value={filter}
                    onChange={handleFilterChange}
                />
            </View>

            {loading && <Text>Chargement...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id ?? ''}
                renderItem={({ item }) =>
                    <ProductCard
                        product={item}
                        onPress={() => item.id && navigation.navigate('ProductDetails', { productId: item.id })}
                    />
                }
                contentContainerStyle={styles.products}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                   hasMore ? (
                        <Pressable
                            style={styles.loadMore}
                            onPress={() => setPage(page + 1)}
                            disabled={loading}
                        >
                            {loading
                                ? <ActivityIndicator color="#FFFFFF" />
                                : <Text style={styles.loadMoreText}>Charger plus</Text>}
                        </Pressable>
                   ) : null
                }

            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
        gap: 2,
        backgroundColor: '#F3F4F6',
    },

    products: {
        gap: 4
    },

    header: {
        gap: 10,
        paddingBottom: 10,
    },

    error: {
        color: 'red',
        fontSize: 20,
        width: '100%',
    },

    loadMore: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#374151',
    },
    loadMoreText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});