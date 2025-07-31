import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import CustomHeader from '../../../components/CustomHeader/CustomHeader'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '../../../utils/Colors/Color'
import { useSelector } from 'react-redux'

const { width } = Dimensions.get('window');

const StoreDetailScreen = () => {
    const { item } = useRoute().params
    const [selectedImage, setSelectedImage] = useState(0)
    const { currentPoints } = useSelector((state) => state.points);
    
    // Örnek resim galerisi (gerçek uygulamada item'dan gelecek)
    const images = [item.img, item.img, item.img, item.img]
    
    // Kullanıcının puanı yeterli mi kontrol et
    const hasEnoughPoints = currentPoints >= item.price;
    
    return (
        <View style={styles.container}>
    
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Image Slider */}
                <View style={styles.imageContainer}>
                    <Image source={item.img} style={styles.mainImage} />
                    
                    {/* Image Indicators */}
                    <View style={styles.indicatorsContainer}>
                        {images.map((_, index) => (
                            <View 
                                key={index} 
                                style={[
                                    styles.indicator, 
                                    selectedImage === index && styles.activeIndicator
                                ]} 
                            />
                        ))}
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Title and Price */}
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.currency}> GP</Text>
                        </View>
                    </View>

                    {/* Model Info */}
                    <View style={styles.modelSection}>
                        <Text style={styles.modelLabel}>Model:</Text>
                        <Text style={styles.modelText}>{item.model}</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.descriptionTitle}>Açıklama</Text>
                        <Text style={styles.descriptionText}>{item.desc}</Text>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresSection}>
                        <Text style={styles.featuresTitle}>Özellikler</Text>
                        <View style={styles.featureItem}>
                            <Icon name="check-circle" size={16} color={colors.MainColor} />
                            <Text style={styles.featureText}>Yüksek kaliteli ses</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Icon name="check-circle" size={16} color={colors.MainColor} />
                            <Text style={styles.featureText}>Gürültü önleme teknolojisi</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Icon name="check-circle" size={16} color={colors.MainColor} />
                            <Text style={styles.featureText}>Uzun pil ömrü</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Icon name="check-circle" size={16} color={colors.MainColor} />
                            <Text style={styles.featureText}>Kablosuz bağlantı</Text>
                        </View>
                    </View>


                                        <View style={styles.bottomBar}>
                        <View style={styles.priceDisplay}>
                            <Text style={styles.priceText}>{item.price} GP</Text>
                        </View>
                        <TouchableOpacity 
                            style={[
                                styles.statusButton,
                                hasEnoughPoints ? styles.statusButtonActive : styles.statusButtonDisabled
                            ]}
                            disabled={!hasEnoughPoints}
                            onPress={() => {
                                if (hasEnoughPoints) {
                                    // Hediye alma işlemi burada yapılacak
                                    console.log('Hediye alınıyor:', item.title);
                                }
                            }}
                        >
                            <Text style={[
                                styles.statusButtonText,
                                hasEnoughPoints ? styles.statusButtonTextActive : styles.statusButtonTextDisabled
                            ]}>
                                {hasEnoughPoints ? 'Hediyeyi Al' : 'Puanınız Yetersiz'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
 
            </ScrollView>


        </View>
    )
}

export default StoreDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 300,
        backgroundColor: '#f8f8f8',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    indicatorsContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeIndicator: {
        backgroundColor: colors.MainColor,
        width: 24,
    },
    content: {
        padding: 20,
    },
    headerSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        fontFamily: 'Medium',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.MainColor,
        fontFamily: 'ExtraBold',
    },
    currency: {
        fontSize: 18,
        color: colors.textColor,
        marginLeft: 4,
        fontFamily: 'Medium',
    },
    modelSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    modelLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
        fontFamily: 'Medium',
    },
    modelText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Regular',
    },
    descriptionSection: {
        marginBottom: 24,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        fontFamily: 'Medium',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        fontFamily: 'Regular',
    },
    featuresSection: {
        marginBottom: 24,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        fontFamily: 'Medium',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 12,
        fontFamily: 'Regular',
    },

    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#EDEDED',
        gap: 12,
        height: 70,
        marginBottom: 106,
        borderRadius: 50,
  

    },
    priceDisplay: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.MainColor,
        fontFamily: 'Bold',
    },
    statusButton: {
        flex: 2,
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusButtonActive: {
        backgroundColor: colors.MainColor,
        height: '100%', 
    },
    statusButtonDisabled: {
        backgroundColor: '#D8D8D8',
        height: '100%', 
    },
    statusButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Medium',
    },
    statusButtonTextActive: {
        color: '#fff',
    },
    statusButtonTextDisabled: {
        color: '#666',
    },
})