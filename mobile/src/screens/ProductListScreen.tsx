import {StyleSheet, FlatList, View, Text, Pressable, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import {ProductSummary, StockStatus} from '../api/types';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import StatusFilter from "../components/StatusFilter";
import Logo from "../components/Logo";
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch";
import { getProducts } from "../services/products";

export default function ProductListScreen () {

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<ProductSummary[]>([]);
    const [filter, setFilter] = useState<StockStatus | null>(null);
    const { data, loading, error } = useFetch(
        () => getProducts({ search: search || undefined, status: filter ?? undefined, page }),
        [search, filter, page]
    );
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Logo/>
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
                renderItem={({ item }) => <ProductCard product={item} onPress={() => {}} />}
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

            <Menu
                current={"products"}
                onSelect={screen => {}}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingRight: 10,
        paddingLeft: 10,
        gap: 8,
        backgroundColor: '#F3F4F6',
    },

    products: {
        gap: 4
    },

    header: {
        gap: 12,
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