import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from "../features/products/screens/ProductListScreen";
import ProductDetailsScreen from "../features/products/screens/ProductDetailsScreen";
import {createStaticNavigation, type StaticParamList} from "@react-navigation/native";
import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import ProductCreateScreen from "../features/products/screens/ProductCreateScreen";
import {Feather} from "@expo/vector-icons";
import Logo from "../shared/components/Logo";
import ProductUpdateScreen from "../features/products/screens/ProductUpdateScreen";

const Tabs = createBottomTabNavigator({
    screenOptions: {
        headerShown: true,
        headerTitle: () => (<Logo/>),
        headerStyle: {
            backgroundColor: '#F3F4F6',
        },
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            minHeight: 60,
            borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
        },
    },
    screens: {
        Products: {
            screen: ProductListScreen,
            options: {
                title: 'Produits',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="box" size={size} color={color} />
                ),
            }
        },
        Create: {
            screen: ProductCreateScreen,
            options: {
                title: 'Creer',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="plus-square" size={size} color={color} />
                ),
            }
        },
        Dashboard: {
            screen: DashboardScreen,
            options: {
                title: 'Tableau de bord',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="grid" size={size} color={color} />
                ),
            },
        },
    },
});

const Stack = createNativeStackNavigator({
    screens: {
        Tabs: {
            screen: Tabs,
            options: { headerShown: false },
        },
        ProductDetails: {
            screen: ProductDetailsScreen,
            options: { title: 'Produit' },
        },
        ProductUpdate: {
            screen: ProductUpdateScreen,
            options: { title: "Modifier le produit" },
        },
    },
});

export const Navigation = createStaticNavigation(Stack);

type RootStackParamList = StaticParamList<typeof Stack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}