import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getContactList} from '../redux/action';
import {RootState} from '../redux/types';
import {DataUser, ItemPopupList} from '../component/ListPopupAnimate';
import Header from '../component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ms} from 'react-native-size-matters';
import {AnimatedInput} from '../component/AnimatedTextInput';
import {ModalView} from '../component/ModalViewAnimate';

const MainPage = () => {
  const {data, loadingGetList} = useSelector(
    (state: RootState) => state.contactReducer,
  );
  const dispatch = useDispatch();
  const [layoutData, setLayoutData] = useState<any>(null);
  const [finalData, setFinalData] = useState<Array<DataUser> | null>(null);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');
  const sortingData = data?.slice().sort((a, b) => {
    const nameA = a.firstName.toUpperCase() + a.lastName.toUpperCase();
    const nameB = b.firstName.toUpperCase() + b.lastName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  const onAddNew = () => {
    setLayoutData({
      _height: moderateScale(50),
      _width: moderateScale(50),
      x: moderateScale(30),
      y: moderateScale(30),
    });
  };

  const onSearchOrClose = () => {
    setActiveSearch(val => !val);
    setFinalData(null);
    setValueSearch('');
  };

  const onSearchText = (e: string) => {
    const filterData = sortingData.filter(obj => {
      const searchText = e.replace(/\s/g, '').toLowerCase();
      const allName = obj.firstName + obj.lastName;
      return (
        obj.firstName.toLowerCase().includes(searchText) ||
        obj.lastName.toLowerCase().includes(searchText) ||
        allName.toLowerCase().includes(searchText)
      );
    });
    if (e.length > 0) {
      console.log('fil data', filterData);
      setFinalData(filterData);
    } else {
      setFinalData(null);
    }
    setValueSearch(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity activeOpacity={0.5} onPress={onAddNew}>
            <Ionicons name="person-add-sharp" size={ms(24)} color={'#000'} />
          </TouchableOpacity>
        }
        centerComponent={
          !activeSearch ? (
            <View style={styles.blankView} />
          ) : (
            <AnimatedInput
              value={valueSearch}
              onChange={onSearchText}
              placeholder="Cari Nama"
            />
          )
        }
        righComponent={
          <TouchableOpacity activeOpacity={0.5} onPress={onSearchOrClose}>
            <Ionicons
              name={activeSearch ? 'close' : 'search'}
              size={ms(24)}
              color={'#000'}
            />
          </TouchableOpacity>
        }
      />
      {sortingData && !loadingGetList ? (
        <ItemPopupList data={finalData || sortingData} />
      ) : (
        <ActivityIndicator color={'blue'} size={'large'} />
      )}

      {layoutData !== null && (
        <ModalView
          isAddNew
          layoutData={layoutData}
          close={() => {
            setLayoutData(null);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blankView: {
    height: moderateScale(72),
  },
});

export default MainPage;
