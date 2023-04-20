import React, { useCallback } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import type Animated from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import {
  SwipeableItem,
  withSwipeableContext,
  useSwipeableContext,
} from 'react-native-swipeable';

type Props = {
  item: any;
  activeItem: Animated.SharedValue<number>;
};

function PersonItem({ item, activeItem }: Props) {
  const { close } = useSwipeableContext();

  const handleDeletePress = useCallback(() => {
    Alert.alert('Delete pressed');
  }, []);

  const handleEditPress = useCallback(() => {
    Alert.alert('Edit pressed');
  }, []);

  const handlePinPress = useCallback(() => {
    Alert.alert('Pin pressed');
  }, []);

  const handleItemPress = useCallback(() => {
    Alert.alert('Item pressed');
  }, []);

  useDerivedValue(() => {
    if (activeItem.value !== item.id) {
      close();
    }
  }, []);

  const handleStartDrag = useCallback(() => {
    activeItem.value = item.id;
  }, [item, activeItem]);

  const renderRightActions = useCallback(() => {
    return (
      <>
        <SwipeableItem.Button onPress={handleDeletePress}>
          <View style={styles.delete}>
            <Text>Delete</Text>
          </View>
        </SwipeableItem.Button>
        <SwipeableItem.Button onPress={handleEditPress}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={[styles.delete, { backgroundColor: 'green' }]}>
            <Text>Edit</Text>
          </View>
        </SwipeableItem.Button>
      </>
    );
  }, [handleDeletePress, handleEditPress]);

  const renderLeftActions = useCallback(() => {
    return (
      <SwipeableItem.Button onPress={handlePinPress}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={[styles.delete, { backgroundColor: 'yellow' }]}>
          <Text>Pin</Text>
        </View>
      </SwipeableItem.Button>
    );
  }, [handlePinPress]);

  return (
    <SwipeableItem
      containerStyle={styles.container}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onStartDrag={handleStartDrag}
      onItemPress={handleItemPress}
    >
      <View style={styles.overlay}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
      </View>
    </SwipeableItem>
  );
}

export default withSwipeableContext(PersonItem);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  overlay: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  delete: {
    width: 80,
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
