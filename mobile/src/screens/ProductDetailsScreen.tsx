import {Text, View} from "react-native";
import type { StaticScreenProps } from '@react-navigation/native';

type Props = StaticScreenProps<{ productId: string }>;

export default function ProductDetailsScreen({route}: Props) {
    return (
        <View>
            <Text>details de {route.params.productId}</Text>
        </View>
    )
}