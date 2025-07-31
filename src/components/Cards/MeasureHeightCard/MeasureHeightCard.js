import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Vibration,
} from "react-native";
import { colors } from "../../../utils/Colors/Color";
import { useDispatch } from "react-redux";
import { setHeight } from "../../../redux/dataSlice";

const { width, height } = Dimensions.get("window");

const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const indicatorWidth = 100;
const indicatorHeight = 56;

const MeasureHeightCard = ({
  initialWeight = 70,
  weightText,
  title,
  minValue = 50,
  maxValue = 250,
}) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);
  const [scrollX] = useState(new Animated.Value(0));

  const segmentsLength = maxValue - minValue + 1;
  const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
  const data = Array.from({ length: segmentsLength }, (_, i) => i + minValue);

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      const currentWeight = Math.round(value / snapSegment) + minValue;
      textInputRef.current?.setNativeProps({
        text: currentWeight.toString(),
      });
      dispatch(setHeight(currentWeight));
    });

    const initialOffset = (initialWeight - minValue) * snapSegment;
    scrollViewRef.current?.scrollTo({
      x: initialOffset,
      y: 0,
      animated: false,
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, [scrollX, initialWeight, minValue]);

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / snapSegment);
    const x = index * snapSegment;
    scrollViewRef.current?.scrollTo({ x, y: 0, animated: false });
    Vibration.vibrate(25);
  };

  const Ruler = ({ data, rulerWidth }) => (
    <View style={[styles.ruler, { width: rulerWidth }]}>
      <View style={styles.spacer} />
      {data.map((weight) => {
        const isTenth = weight % 5 === 0;
        return (
          <View key={weight} style={{ alignItems: "center" }}>
            <View
              style={[
                styles.segment,
                {
                  backgroundColor: isTenth ? "#8D8F8F" : "#8D8F8F",
                  height: isTenth ? 46 : 24,
                  marginRight:
                    weight === data[data.length - 1] ? 0 : segmentSpacing,
                },
              ]}
            />
            {isTenth && <Text style={styles.segmentText}>{weight}</Text>}
          </View>
        );
      })}
      <View style={styles.spacer} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.indicatorWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.weightTextStyle}
          defaultValue={initialWeight.toString()}
          editable={false}
        />
        <Text style={styles.weightText}> {weightText}</Text>
      </View>
      <View style={styles.indicator} />
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.scrollViewContainerStyle}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapSegment}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        <Ruler data={data} rulerWidth={rulerWidth} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flexDirection: "row",
    position: "absolute",
    left: (width - indicatorWidth) / 1.9,
    top: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
    width: indicatorWidth,
  },
  title: {
    width: width,
    fontFamily: "SemiBold",
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 16,
  },
  indicator: {
    position: "absolute",
    width: segmentWidth,
    height: indicatorHeight,
    backgroundColor: colors.MainColor,
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 1,
    bottom: height * 0.102,
  },
  container: {
    height: height * 0.3,
    backgroundColor: "#ffffff",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  ruler: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  segment: {
    width: segmentWidth,
  },
  segmentText: {
    position: "absolute",
    top: height * -0.05,
    right: width * 0.003,
    color: "#8D8F8F",
    fontSize: 14,
    fontFamily: "SemiBold",
    width: width * 0.07,
  },
  scrollViewContainerStyle: {
    justifyContent: "flex-end",
  },
  weightTextStyle: {
    fontSize: 22,
    color: colors.MainColor,
    textAlign: "center",
    fontFamily: "SemiBold",
  },
  weightText: {
    fontSize: 11,
    color: colors.MainColor,
    textAlign: "center",
    fontFamily: "SemiBold",
    top: height * 0.005,
  },
  spacer: {
    width: spacerWidth,
  },
});

export default MeasureHeightCard;
