import {StyleSheet, FlatList, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { StockStatus } from '../api/types';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import StatusFilter from "../components/StatusFilter";
import Logo from "../components/Logo";
import {useState} from "react";
import {useFetch} from "../hooks/useFetch";
import { getProducts } from "../services/products";

export default function ProductListScreen () {

    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<StockStatus | null>(null);

    const { data, loading, error } = useFetch(
        () => getProducts({ search: search || undefined, status: filter ?? undefined }),
        [search, filter]
    );

    function handlePress(text: string): void {
        setFilter(null);
        setSearch(text.trim());
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Logo/>
                <SearchBar
                    onPress={handlePress}
                />
                <StatusFilter
                    value={filter}
                    onChange={status => setFilter(status)}
                />
            </View>

            {loading && <Text>Chargement...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={data?.content}
                keyExtractor={(item) => item.id ?? ''}
                renderItem={({ item }) => <ProductCard product={item} onPress={() => {}} />}
                contentContainerStyle={styles.products}
                showsVerticalScrollIndicator={false}
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
    }
});