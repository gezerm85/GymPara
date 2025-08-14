import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { colors } from "../../utils/Colors/Color";

// === ÖLÇÜLER ===
const H_PADDING = 16;   // liste yatay padding
const ITEM_GAP  = 12;   // kartlar arası boşluk
const CARD_WIDTH  = 132; // Figma ölçün buysa burada sabitle
const CARD_HEIGHT = 132;
const SNAP_INTERVAL = CARD_WIDTH + ITEM_GAP;

const BonusStrip = ({ items = [] }) => {
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={item.onPress}
      android_ripple={{ color: "#dbeafe" }}
    >
      <View style={styles.textBlock}>
        <View>
            <Text style={styles.titleLine1}>{item.title1}</Text>
            <Text style={styles.titleLine2}>{item.title2}</Text>
        </View>
        <Text style={styles.reward}>{item.reward} <Text style={styles.rewardText}>GP</Text></Text>
      </View>

      {item.imageSource ? (
        <Image source={item.imageSource} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={(it) => String(it.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ width: ITEM_GAP }} />}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        // son kartın kenara yapışmaması için küçük bir sağ boşluk
        ListFooterComponent={<View style={{ width: H_PADDING - 4 }} />}
      />
    </View>
  );
};

export default BonusStrip;

const styles = StyleSheet.create({
  container: { paddingVertical: 12 },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 22,            // Figma’ya yakın
    backgroundColor: "#E8F2FE",  // daha açık mavi
    overflow: "hidden",
   

    // iOS gölge
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },

  textBlock: {
    height: "100%",
    justifyContent: "space-between",
    paddingLeft: 13, // görsel ile çarpışmayı azalt
    paddingTop: 18,
    paddingBottom: 28,
  },
  rewardText:{
    fontSize: 18,
    fontWeight: "700",
    color: colors.textColor,
  },

  titleLine1: {
    fontSize: 16,         // 18 → 16: daha sıkı
    fontWeight: "700",
    color: colors.textColor,     // biraz koyu gri
  },
  titleLine2: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.MainColor,     // vurgu mavisi
  },
  reward: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.MainColor,
  },

  // Görseli SAĞ-ALTA sabitle ve hafif TAŞIR
  image: {
    position: "absolute",
    right: -30,   // taşıma için negatif offset
    bottom: -6,
    width: 78,   
    height: 78,
    borderRadius: 18,
  },
  imagePlaceholder: {
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 78,
    height: 78,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
  },
});
