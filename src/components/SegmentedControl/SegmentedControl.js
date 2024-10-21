import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SegmentedControl = () => {
  const [selectedOption, setSelectedOption] = useState('G'); // Varsayılan seçenek Günlük

  // Gün, hafta, ay, 6 ay, yıl bazında örnek kalori verileri
  const calorieData = {
    G: [300, 600, 400, 800, 500, 700],    // Günlük veriler (saatlik)
    H: [1400, 1200, 1500, 1300, 1800, 1700, 1600], // Haftalık veriler (günlük)
    A: [5000, 6200, 5900, 7200],          // Aylık veriler (haftalık)
    '6A': [18000, 21000, 20000, 19000, 24000, 23000], // 6 Aylık veriler (aylık)
    Y: [120000, 135000, 130000, 140000, 155000, 150000, 160000, 145000, 170000, 165000, 175000, 180000], // Yıllık veriler (aylık)
  };

  // Segment seçenekleri
  const options = ['G', 'H', 'A', '6A', 'Y'];

  const screenWidth = Dimensions.get('window').width;

  // LineChart için seçilen aralığa uygun veriyi ve etiketleri hazırlıyoruz
  const data = {
    labels: selectedOption === 'G'
      ? ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'] // Günlük: Saatler
      : selectedOption === 'H'
      ? ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']      // Haftalık: Günler
      : selectedOption === 'A'
      ? ['1. Hafta', '2. Hafta', '3. Hafta', '4. Hafta']        // Aylık: Haftalar
      : selectedOption === '6A'
      ? ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz']  // 6 Aylık: Aylar
      : ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'], // Yıllık: Aylar
    datasets: [
      {
        data: calorieData[selectedOption], // Seçilen veriyi kullan
        color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`, // Çizgi rengi
        strokeWidth: 2, // Çizgi kalınlığı
      },
    ],
  };

  // Toplam kalori metnini dinamik hale getiriyoruz
  const totalLabel = selectedOption === 'G' ? 'GÜNLÜK'
    : selectedOption === 'H' ? 'HAFTALIK'
    : selectedOption === 'A' ? 'AYLIK'
    : selectedOption === '6A' ? '6 AYLK'
    : 'YILLIK';

  return (
    <View style={styles.container}>
      {/* Segment Control */}
      <View style={styles.segmentContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option)} // Seçim yapıldığında state güncellenir
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Toplam Kalori ve Çizgi Grafiği */}
      <View style={styles.chartContainer}>
        <Text style={styles.headerText}>
          TOPLAM {totalLabel}: {calorieData[selectedOption].reduce((acc, val) => acc + val, 0)} kalori
        </Text>
        <LineChart
          data={data}
          width={screenWidth * 0.9} 
          height={400}
          yAxisSuffix=" kal"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 10, // Etiket font boyutunu küçült
            },
          }}
          bezier // Eğrileri yumuşatmak için
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#7676801F',
    borderRadius: 10,
    padding: 5,
    marginVertical: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#fff',
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'SemiBold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
});

export default SegmentedControl;
