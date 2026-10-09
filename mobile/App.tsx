import { Navigation } from './src/navigation';
import OutOfStockAlert from "./src/features/products/components/OutOfStockAlert";

export default function App() {
  return (
      <>
        <Navigation />
        <OutOfStockAlert/>
      </>
  );
}