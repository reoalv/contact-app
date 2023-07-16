import React, {useCallback, useEffect, useState} from 'react';
import {
  Animated,
  Button,
  LayoutAnimation,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DataUser} from './ListPopupAnimate';
import {moderateScale} from 'react-native-size-matters';
import {AnimatedInput} from './AnimatedTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAddNewContact,
  getEditContact,
  setEditContactStatus,
} from '../redux/action';
import {RootState} from '../redux/types';

export type ModalViewProps = {
  isAddNew?: boolean;
  layoutData: any;
  close: () => void;
  dataUsr?: DataUser;
};

export function ModalView({
  layoutData,
  close,
  dataUsr,
  isAddNew = false,
}: ModalViewProps) {
  const {x, y, _width, _height} = layoutData;
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  const [firstName, setFirstName] = useState<string>(dataUsr?.firstName || '');
  const [lastName, setLastName] = useState<string>(dataUsr?.lastName || '');
  const [age, setAge] = useState<string>(dataUsr?.age?.toString() || '');
  const {statusEdit} = useSelector((state: RootState) => state.contactReducer);
  const openIT = useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setExpanded(true);
    }, 5);
  }, []);

  useEffect(() => {
    if (isAddNew) {
      setOnEditing(true);
    }
  }, [isAddNew]);

  useEffect(openIT, [openIT]);
  const onRequestClose = useCallback(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
      () => {
        close();
      },
    );
    setExpanded(false);
  }, [close]);

  useEffect(() => {
    if (statusEdit) {
      dispatch(setEditContactStatus(false));
      onRequestClose();
    }
  }, [dispatch, close, statusEdit, onRequestClose]);

  const onSave = () => {
    if (dataUsr && !isAddNew) {
      dispatch(
        getEditContact({
          ...dataUsr,
          firstName: firstName,
          lastName: lastName,
          age: Number(age),
        }),
      );
    } else if (isAddNew) {
      dispatch(
        getAddNewContact({
          firstName: firstName,
          lastName: lastName,
          age: Number(age),
        }),
      );
    }
  };

  const onSaveEdit = () => {
    onEditing ? onSave() : setOnEditing(true);
  };
  const initialName =
    dataUsr &&
    Array.from(dataUsr?.firstName)[0] + Array.from(dataUsr?.lastName)[0];

  return (
    <Modal visible onRequestClose={onRequestClose} transparent>
      <View style={styles.center}>
        {expanded && (
          <Animated.View
            style={[StyleSheet.absoluteFill, {backgroundColor: '#000000aa'}]}
          />
        )}
        <View
          style={[
            expanded
              ? {
                  height: '90%',
                  width: '90%',
                  top: moderateScale(25),
                  position: 'absolute',
                }
              : {
                  height: _height,
                  width: _width,
                  left: x,
                  top: y,
                  position: 'absolute',
                },
            styles.containerContent,
          ]}>
          {expanded && (
            <>
              <View style={styles.close}>
                <Button title="close" onPress={onRequestClose} color={'red'} />
              </View>
              {onEditing ? (
                <EditingView
                  dataUsr={dataUsr}
                  initialName={initialName || ''}
                  onChgFirstName={e => setFirstName(e)}
                  onChgLastName={e => setLastName(e)}
                  onChgAge={e => setAge(e)}
                  valueFirstName={firstName}
                  valueLastName={lastName}
                  valueAge={age}
                />
              ) : (
                <ContentView dataUsr={dataUsr} />
              )}

              <Button
                title={onEditing ? 'save' : 'edit'}
                onPress={onSaveEdit}
              />
              {onEditing && !isAddNew && (
                <Button
                  title={'cancel'}
                  color={'red'}
                  onPress={() => {
                    setFirstName(dataUsr?.firstName || '');
                    setLastName(dataUsr?.lastName || '');
                    setAge(dataUsr?.age.toString() || '');
                    setOnEditing(false);
                  }}
                />
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const ContentView = ({dataUsr}: Partial<ModalViewProps>) => {
  const initialName =
    dataUsr &&
    Array.from(dataUsr?.firstName)[0] + Array.from(dataUsr?.lastName)[0];
  return (
    <View style={styles.containerDetail}>
      <View
        style={[
          styles.imgBig,
          {
            backgroundColor: dataUsr?.color,
          },
        ]}>
        <Text style={styles.textInitialBig}>{initialName}</Text>
      </View>

      <Text style={styles.textName}>
        {`${dataUsr?.firstName} ${dataUsr?.lastName}`}
      </Text>

      <Text style={styles.textAge}>{`${dataUsr?.age}y.o`}</Text>
    </View>
  );
};

const EditingView = ({
  dataUsr,
  onChgFirstName,
  onChgLastName,
  onChgAge,
  valueFirstName,
  valueLastName,
  valueAge,
  initialName,
}: {
  dataUsr?: DataUser;
  onChgFirstName: (arg: string) => void;
  onChgLastName: (arg: string) => void;
  onChgAge: (arg: string) => void;
  valueFirstName: string;
  valueLastName: string;
  valueAge: string;
  initialName: string;
}) => {
  return (
    <View style={styles.containerEdit}>
      <View
        style={[
          styles.imgBig,
          {
            backgroundColor: dataUsr?.color,
          },
        ]}>
        <Text style={styles.textInitialBig}>{initialName}</Text>
      </View>

      <AnimatedInput
        placeholder={'First Name'}
        value={valueFirstName}
        onChange={onChgFirstName}
        bgColor="#ccc"
      />
      <AnimatedInput
        placeholder={'Last Name'}
        value={valueLastName}
        onChange={onChgLastName}
        bgColor="#ccc"
      />
      <AnimatedInput
        placeholder={'Age'}
        value={valueAge}
        onChange={onChgAge}
        bgColor="#ccc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerContent: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    borderRadius: moderateScale(6),
  },
  containerDetail: {
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(24),
  },
  containerEdit: {
    flex: 1,
    paddingTop: moderateScale(24),
    paddingHorizontal: moderateScale(8),
  },
  imgBig: {
    height: moderateScale(112),
    width: moderateScale(112),
    borderRadius: moderateScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: moderateScale(20),
  },
  textInitialBig: {
    fontSize: moderateScale(62),
    fontWeight: '600',
  },
  textName: {
    fontSize: moderateScale(24),
    color: '#141414',
    fontWeight: '500',
  },
  textAge: {
    fontSize: moderateScale(28),
    color: '#141414',
    fontWeight: '500',
  },
});
