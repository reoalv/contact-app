import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export function AnimatedInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  bgColor,
}: {
  value: string;
  onChange: (arg: string) => void;
  placeholder: string;
  multiline?: boolean;
  bgColor?: string;
}) {
  const [inputHeight, setHeight] = useState(0);
  const [placeholderWidth, setWidth] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const onFocus = () => animate(1);
  const onBlur = () => !value && animate(0);
  const animate = useCallback(
    (val: any) => {
      Animated.spring(animation, {
        toValue: val,
        bounciness: 0,
        useNativeDriver: true,
      }).start();
    },
    [animation],
  );
  useEffect(() => {
    animate(value ? 1 : 0);
  }, [animate, value]);

  return (
    <View
      style={styles.inputContainer}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{height: inputHeight, ...styles.placeholderContainer}}>
        <Animated.Text
          style={[
            styles.placeholder,
            {backgroundColor: bgColor || '#fff'},
            {transform: [{translateY}, {translateX}, {scale}]},
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && {height: 100, textAlignVertical: 'top'},
        ]}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChange}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
    marginBottom: 25,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#343434',
  },
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: moderateScale(20),
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    color: 'rgb(134, 134, 134)',
  },
});
