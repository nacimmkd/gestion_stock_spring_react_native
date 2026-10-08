import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useState} from "react";

type Props = {
    onPress: (text: string) => void;
    placeholder?: string;
};

export default function SearchBar({
          onPress,
          placeholder = 'Rechercher par nom ou catégorie',
}: Props) {

    const [searchInput, setSearchInput] = useState<string>("");

    function handleInputChange(text: string): void {
        setSearchInput(text);
    }

    function handlePress(): void {
        onPress(searchInput);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchInput}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handlePress}
            />
            <Pressable
                onPress={handlePress}
                accessibilityLabel="Effacer la recherche"
            >
                <Ionicons name="search" size={20} color="#6B7280" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#111827',
    },
});