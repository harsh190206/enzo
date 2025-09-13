import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomePage() {
    const handleColdRoomPress = () => {
        router.push('/(tabs)');
    };

    const handleBlasterPress = () => {
        router.push('/(blast)');
    };

    const handleFreezerPress = () => {
        router.push('/(freezer)');
    };

    const CalculatorButton = ({
        title,
        onPress,
        icon,
        color,
    }: {
        title: string;
        onPress: () => void;
        icon: keyof typeof Ionicons.glyphMap;
        color: string;
    }) => (
        <TouchableOpacity
            style={[styles.button, { borderColor: color }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <Ionicons name={icon} size={28} color="#ffffff" />
            </View>
            <Text style={[styles.buttonText, { color }]}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color={color} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.content}>
                {/* Logo and App Title */}
                <View style={styles.titleContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.appTitle}>CoolCalc</Text>
                    <Text style={styles.subtitle}>Heat Load Calculator</Text>
                </View>

                {/* Calculator Buttons */}
                <View style={styles.buttonsContainer}>
                    <CalculatorButton
                        title="Cold Room Calculator"
                        onPress={handleColdRoomPress}
                        icon="cube-outline"
                        color="#059669"
                    />

                    <CalculatorButton
                        title="Blast Freezer Calculator"
                        onPress={handleBlasterPress}
                        icon="flash-outline"
                        color="#dc2626"
                    />

                    <CalculatorButton
                        title="Freezer Room Calculator"
                        onPress={handleFreezerPress}
                        icon="snow-outline"
                        color="#2563eb"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: height * 0.08,
        paddingHorizontal: 20,
    },
    logo: {
        width: width * 0.25,
        height: width * 0.25,
        marginBottom: 24,
    },
    appTitle: {
        fontSize: width > 400 ? 52 : 46,
        fontWeight: '800',
        color: '#1e293b',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: width > 400 ? 20 : 18,
        fontWeight: '500',
        color: '#64748b',
        letterSpacing: 0.5,
        textAlign: 'center',
        opacity: 0.8,
    },
    buttonsContainer: {
        gap: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    buttonText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});
