import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import CustomHeader from '../../../components/CustomHeader/CustomHeader'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '../../../utils/Colors/Color'
import { useSelector, useDispatch } from 'react-redux'
import { purchaseReward } from '../../../redux/rewardsSlice'
import { API_IMAGE_BASE_URL } from '@env';

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

// Figma tasarımındaki renkleri doğrudan kullanalım
const figmaColors = {
    background: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    priceColor: '#3A00E5', // GP rengi için parlak mavi
    buttonDisabledBackground: '#E0E0E0',
    buttonDisabledText: 'rgba(0, 0, 0, 0.87)',
    containerBackground: '#F5F5F5', // Alt bar arka planı
};


const StoreDetailScreen = () => {
    const dispatch = useDispatch();
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
        backgroundColor: figmaColors.background,
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
        color: figmaColors.textPrimary,
        marginBottom: 12,
        // fontFamily: 'Your-Bold-Font', // Projenizdeki fontu ekleyin
    },
    descriptionText: {
        fontSize: 15,
        color: figmaColors.textSecondary,
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
        backgroundColor: figmaColors.containerBackground,
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
        color: figmaColors.priceColor,
        // fontFamily: 'Your-Bold-Font',
    },
    purchaseButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Pürüzsüz hap şeklinde buton
        backgroundColor: '#007AFF', // Örnek aktif renk (Figma'da belirtilmemiş)
    },
    purchaseButtonDisabled: {
        backgroundColor: figmaColors.buttonDisabledBackground,
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        // fontFamily: 'Your-Semibold-Font',
    },
    purchaseButtonTextDisabled: {
        color: figmaColors.buttonDisabledText,
    },
})