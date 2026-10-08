import {StyleSheet, FlatList, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { type ProductSummary } from '../api/types';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import StatusFilter from "../components/StatusFilter";
import Logo from "../components/Logo";


const products: ProductSummary[] = [
    { id: '1', name: 'iPhone 12 Pro Max', quantity: 20, alertThreshold: 5, status: 'NORMAL', Category: { id: '1', name: 'Téléphone' } },
    { id: '2', name: 'Samsung Galaxy S24', quantity: 3, alertThreshold: 5, status: 'FAIBLE', Category: { id: '1', name: 'Téléphone' } },
    { id: '3', name: 'Google Pixel 8', quantity: 0, alertThreshold: 4, status: 'RUPTURE', Category: { id: '1', name: 'Téléphone' } },
    { id: '4', name: 'MacBook Air M3', quantity: 12, alertThreshold: 3, status: 'NORMAL', Category: { id: '2', name: 'Ordinateurs' } },
    { id: '5', name: 'Dell XPS 13', quantity: 2, alertThreshold: 3, status: 'FAIBLE', Category: { id: '2', name: 'Ordinateurs' } },
];

export default function ProductListScreen () {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Logo/>
                <SearchBar
                    value={""}
                    onChangeText={(value: string) => {}}
                />
                <StatusFilter
                    value={null}
                    onChange={status => {}}
                />
            </View>


            <FlatList
                data={products}
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
    }
});