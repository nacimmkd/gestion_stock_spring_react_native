import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Screen = 'dashboard' | 'products' | 'add';

type MenuProps = {
    current: Screen;
    onSelect: (screen: Screen) => void;
};

type MenuItemProps = {
    label: string;
    icon: keyof typeof Feather.glyphMap;
    active?: boolean;
    onPress: () => void;
};

const COLOR_ACTIVE = '#111827';
const COLOR_INACTIVE = '#9CA3AF';

export default function Menu({ current, onSelect }: MenuProps) {
    return (
        <View style={styles.menu}>
            <MenuItem
                label="Produits"
                icon="box"
                active={current === 'products'}
                onPress={() => onSelect('products')}
            />
            <MenuItem
                label="Ajouter"
                icon="plus-square"
                active={current === 'add'}
                onPress={() => onSelect('add')}
            />
            <MenuItem
                label="Tableau de bord"
                icon="grid"
                active={current === 'dashboard'}
                onPress={() => onSelect('dashboard')}
            />
        </View>
    );
}

function MenuItem({ label, icon, active = false, onPress }: MenuItemProps) {
    const color = active ? COLOR_ACTIVE : COLOR_INACTIVE;

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
            <Feather name={icon} size={22} color={color} />
            <Text style={[styles.label, { color }, active && styles.labelActive]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
        paddingVertical: 10,
    },
    pressed: {
        opacity: 0.6,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
    },
    labelActive: {
        fontWeight: '900',
    },
});