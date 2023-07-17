import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native-web";
import Link from "next/link";

const SHADOW_COLOR = "#02d8f3";
const MAIN_COLOR = "purple";
const HOVER_COLOR = "#45B1E8";
const ANIMATION_DURATION = 3000;
const GLITCH_AMPLITUDE = 5;

export default function CyberButton({ label }) {
  const mainAnimatedValue = useRef(new Animated.Value(0)).current;
  const animatedX = useRef(new Animated.Value(0)).current;

  const [isHovered, setHovered] = useState(false);

  const runAnimation = () => {
    Animated.timing(mainAnimatedValue, {
      toValue: 100,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(() => {
      mainAnimatedValue.setValue(0);
      setTimeout(() => runAnimation(), 2000);
    });

    Animated.loop(
      Animated.sequence([
        Animated.spring(animatedX, {
          toValue: GLITCH_AMPLITUDE,
          useNativeDriver: false,
          speed: 500,
          bounciness: 1000,
        }),
        Animated.spring(animatedX, {
          toValue: -GLITCH_AMPLITUDE,
          useNativeDriver: false,
          speed: 500,
          bounciness: 1000,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const positionY = mainAnimatedValue.interpolate({
    inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    outputRange: [30, 40, 20, 60, 60, 60, 20, 5, 0, 0, 20],
  });

  const height = mainAnimatedValue.interpolate({
    inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    outputRange: [0.01, 20, 10, 30, 30, 30, 15, 20, 10, 10, 20],
  });

  return (
    <Link href="/login" passHref style={{"text-decoration":"none"}}>
      <View 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)} 
        style={[styles.row, isHovered ? styles.buttonHovered : styles.button]}
      >
        <View style={[styles.row]}>
          <View>
            <View style={[styles.leftRectangle, isHovered ? styles.hovered : {}]} />
            <View style={[styles.leftCorner, isHovered ? styles.hovered : {}]} />
          </View>
          <View style={[styles.mainContainer, styles.buttonHeight, isHovered ? styles.hovered : {}]}>
            <Text style={[styles.labelText]}>{label?.toUpperCase()}</Text>
          </View>
        </View>
        <Animated.View
          style={[
            styles.row,
            styles.coverContainer,
            {
              height,
              transform: [{translateY: positionY}, {translateX: animatedX}],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.row,
              styles.buttonHeight,
              {
                transform: [{translateY: Animated.multiply(positionY, -1)}],
              },
            ]}
          >
            <View>
              <View style={[styles.leftRectangle, styles.leftSideCover, isHovered ? styles.hovered : {}]} />
              <View style={[styles.leftCorner, isHovered ? styles.hovered : {}]} />
            </View>
            <View
              style={[
                styles.mainContainer,
                styles.buttonHeight,
                styles.mainContainerCover,
                isHovered ? styles.hovered : {},
              ]}
            >
              <Text style={[styles.labelText, styles.glitchText]}>
                {label?.toUpperCase()}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </Link>
  );  
  
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: MAIN_COLOR,
  },
  hovered: {
    backgroundColor: HOVER_COLOR,
    borderTopColor: HOVER_COLOR,  
  },
  buttonHeight: {
    height: 60,
  },
  mainContainer: {
    backgroundColor: MAIN_COLOR,
    borderColor: SHADOW_COLOR,
    borderRightWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 10,
  },
  leftCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderRightColor: "transparent",
    borderTopColor: MAIN_COLOR,
    transform: [{ rotate: "90deg" }],
  },
  leftRectangle: {
    width: 20,
    height: 40,
    backgroundColor: MAIN_COLOR,
  },

  labelText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  coverContainer: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
    height: 0,
  },
  blueBg: { backgroundColor: "blue" },
  mainContainerCover: {
    borderRightWidth: 6,
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  leftSideCover: {
    borderLeftWidth: 3,
    borderLeftColor: SHADOW_COLOR,
  },
  glitchText: {
    textShadowColor: SHADOW_COLOR,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
