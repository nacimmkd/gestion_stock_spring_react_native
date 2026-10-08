import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductListScreen from "./src/screens/ProductListScreen";

export default function App() {
  return (
      <SafeAreaProvider>
        <ProductListScreen/>
      </SafeAreaProvider>
  );
}