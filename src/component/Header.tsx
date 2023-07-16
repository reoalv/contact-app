import {View, Text, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  leftComponent?: ReactNode;
  righComponent?: ReactNode;
  centerComponent?: ReactNode;
  title?: string;
  bgColor?: string;
};

const Header = ({
  leftComponent,
  righComponent,
  title,
  centerComponent,
  bgColor,
}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor || '#fff'}]}>
      {leftComponent && (
        <View style={styles.containerLeft}>{leftComponent}</View>
      )}
      {title && <Text style={styles.containerText}>{title}</Text>}
      {centerComponent && (
        <View style={styles.centerComp}>{centerComponent}</View>
      )}
      {righComponent && (
        <View style={styles.containerRight}>{righComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeft: {
    padding: moderateScale(8),
    borderRadius: 99,
    marginRight: moderateScale(8),
    backgroundColor: '#fff',
  },
  centerComp: {
    flex: 1,
    top: moderateScale(8),
    marginRight: moderateScale(52),
  },
  containerText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#000000',
  },
  containerRight: {
    padding: moderateScale(8),
    borderRadius: 99,
    backgroundColor: '#fff',
    position: 'absolute',
    right: moderateScale(12),
  },
});

export default Header;
