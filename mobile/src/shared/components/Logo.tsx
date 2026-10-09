import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Logo() {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Feather name="package" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.name}>Stocki</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374151',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#111827',
    },
});