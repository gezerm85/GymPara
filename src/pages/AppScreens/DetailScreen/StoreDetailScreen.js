import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { purchaseReward } from '../../../redux/rewardsSlice'
import { API_IMAGE_BASE_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../utils/Colors/Color';

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const StoreDetailScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { item } = useRoute().params
    const { points } = useSelector((state) => state.points);
    const currentPoints = points || 0;

    // Örnek veri (item objesi bu alanları içermeli)
    const mockItem = {
        id: item.id || '1',
        title: item.title || 'SONY Premium Wireless Headphones',
        description: item.description || 'The technology with two noise sensors and two microphones on each ear cup detects ambient noise and sends the data to the HD noise minimization processor QN1. Using a new algorithm, the QN1 then processes and minimizes noise for different acoustic environments in real time. Together with a new Bluetooth Audio SoC',
        price: item.price || 400,
        img: item.img, // Bu zaten geliyor
    };

    // Backend'den gelen resim URL'ini oluştur
    const imageUrl = `${IMAGE_BASE_URL}${mockItem.img}`;
    
    // Kullanıcının puanı yeterli mi kontrol et
    const hasEnoughPoints = currentPoints >= mockItem.price;

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => {
                        navigation.navigate('StoreScreen');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'StoreScreen' }],
                            });
                   
                    }}
                >
                    <Icon name="arrow-left" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ürün Detayı</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Icon name="share" size={18} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Image Container */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.mainImage} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>{mockItem.title}</Text>
                    <Text style={styles.descriptionText}>{mockItem.description}</Text>
                </View>
            </ScrollView>

            {/* Bottom Purchase Bar - Figma Design */}
            <View style={styles.purchaseContainer}>
                <Text style={styles.priceText}>{mockItem.price} GP</Text>
                <TouchableOpacity
                    style={[
                        styles.purchaseButton,
                        !hasEnoughPoints && styles.purchaseButtonDisabled
                    ]}
                    disabled={!hasEnoughPoints}
                    onPress={async () => {
                        if (hasEnoughPoints) {
                            try {
                                await dispatch(purchaseReward(mockItem.id));
                                Alert.alert(
                                    'Başarılı!',
                                    `${mockItem.title} başarıyla satın alındı!`,
                                    [{ text: 'Tamam' }]
                                );
                            } catch (error) {
                                Alert.alert(
                                    'Hata!',
                                    'Hediye alınırken bir hata oluştu.',
                                    [{ text: 'Tamam' }]
                                );
                            }
                        }
                    }}
                >
                    <Text style={[
                        styles.purchaseButtonText,
                        !hasEnoughPoints && styles.purchaseButtonTextDisabled
                    ]}>
                        {hasEnoughPoints ? 'Hediyeyi Al' : 'Puanınız Yetersiz'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StoreDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    // Custom Header Styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16, // Status bar için
        paddingBottom: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 3,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    shareButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        letterSpacing: 0.5,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 350, // Resim alanını biraz daha büyüttük
        backgroundColor: '#f8f8f8',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // 'cover' yerine 'contain' daha iyi sonuç verebilir
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 120, // Alt barın içeriği ezmemesi için boşluk
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 12,
        // fontFamily: 'Your-Bold-Font', // Projenizdeki fontu ekleyin
    },
    descriptionText: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 22,
        // fontFamily: 'Your-Regular-Font', // Projenizdeki fontu ekleyin
    },
    // --- New Bottom Bar Styles (Figma-like) ---
    purchaseContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.containerBackground,
        borderRadius: 50, // Tam yuvarlak kenarlar için yüksek değer
        paddingHorizontal: 25,
        paddingVertical: 12,
        height: 70, // Sabit yükseklik
        // iOS için gölge
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        // Android için gölge
        elevation: 5,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.priceColor,
        // fontFamily: 'Your-Bold-Font',
    },
    purchaseButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Pürüzsüz hap şeklinde buton
        backgroundColor: '#007AFF', // Örnek aktif renk (Figma'da belirtilmemiş)
    },
    purchaseButtonDisabled: {
        backgroundColor: colors.buttonDisabledBackground,
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        // fontFamily: 'Your-Semibold-Font',
    },
    purchaseButtonTextDisabled: {
        color: colors.buttonDisabledText,
    },
})