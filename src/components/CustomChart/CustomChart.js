import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const CustomChart = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ["06", "12", "18", "24"], // Saat dilimleri
    datasets: [
      {
        data: [20, 50, 150, 20], // Kalori değerleri
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Üstteki Toplam Kalori Metni */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TOPLAM</Text>
        <Text style={styles.calorieText}>5400 kalori</Text>
        <Text style={styles.subText}>Bugün</Text>
      </View>

      {/* Bar Grafiği */}
      <BarChart
        data={data}
        width={screenWidth - 40} // Genişliği ekran boyutuna göre ayarlıyoruz
        height={220} // Grafik yüksekliği
        yAxisSuffix="" // Y ekseni birimi
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0, // Ondalık yer sayısı
          color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`, // Çubukların rengi
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Etiket rengi
          barPercentage: 0.4, // Barların genişliğini ayarlar
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: "#ccc", // Çizgilerin rengi
            strokeDasharray: "5", // Çizgilerin kesik çizgi olması
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff", // Arka plan rengi
    borderRadius: 10, // Kenar yuvarlama
    shadowColor: "#000", // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Gölgenin opaklığı
    shadowRadius: 2.5, // Gölgenin yayılma alanı
    elevation: 5, // Android için yükseklik
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  calorieText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#999',
  },
});

export default CustomChart;
