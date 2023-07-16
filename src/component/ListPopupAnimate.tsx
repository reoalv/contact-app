import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ModalView} from './ModalViewAnimate';

export type DataUser = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
  color: string;
};

export const ItemPopupList = ({data}: {data: Array<DataUser>}) => {
  const [layoutData, setLayoutData] = useState(null);
  const [contentData, setContentData] = useState<DataUser | null>(null);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        contentContainerStyle={{
          padding: moderateScale(4),
          flexGrow: 1,
        }}
        keyExtractor={(_, idx) => idx?.toString()}
        renderItem={({item}) => (
          <RenderItem
            toggleModal={(dataLayout, dataUser) => {
              setLayoutData(dataLayout);
              setContentData(dataUser);
            }}
            dataUsr={item}
          />
        )}
      />
      {layoutData !== null && contentData !== null && (
        <ModalView
          layoutData={layoutData}
          dataUsr={contentData}
          close={() => {
            setLayoutData(null);
            setContentData(null);
          }}
        />
      )}
    </View>
  );
};
const RenderItem = (props: {
  toggleModal: (arg0: any, arg1: DataUser) => void;
  dataUsr: DataUser;
}) => {
  const itemRef = useRef<TouchableOpacity>(null);
  const {toggleModal, dataUsr} = props;
  const onPress = () => {
    itemRef.current?.measureInWindow((x, y, _width, _height) => {
      toggleModal(
        {
          x,
          y,
          _width,
          _height,
        },
        dataUsr,
      );
    });
  };
  const initialName =
    Array.from(dataUsr?.firstName)[0] + Array.from(dataUsr?.lastName)[0];
  return (
    <TouchableOpacity
      ref={itemRef}
      style={styles.item}
      onPress={onPress}
      onLongPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.containerItem}>
        <View
          style={[
            styles.img,
            {
              backgroundColor: dataUsr?.color,
            },
          ]}>
          <Text style={styles.textInitial}>{initialName}</Text>
        </View>
        <Text
          style={
            styles.textName
          }>{`${dataUsr.firstName} ${dataUsr.lastName}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(4),
    backgroundColor: '#ddd',
    borderBottomWidth: moderateScale(1),
    borderColor: '#C4C4C4',
  },
  containerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  img: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInitial: {
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  textName: {
    fontSize: moderateScale(18),
    color: '#141414',
    fontWeight: '500',
    marginLeft: moderateScale(8),
  },
});
