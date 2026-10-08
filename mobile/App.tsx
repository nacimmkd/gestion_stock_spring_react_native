import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { type ProductSummary } from './src/api/types';
import ProductListScreen from "./src/screens/ProductListScreen";

const product: ProductSummary = {
  id: '1',
  name: 'iPhone 12 Pro Max',
  quantity: 20,
  alertThreshold: 5,
  status: 'FAIBLE',
  Category: {
    id: '1',
    name: 'Téléphone',
  },
};

export default function App() {
  return (
      <SafeAreaProvider>
        <ProductListScreen/>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingRight: 10,
    paddingLeft: 10,
    gap: 12,
    backgroundColor: '#F3F4F6',
  },
});