import routeNames from '@routers/routeNames';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from '@src/components/core';
import { Text4 } from '@src/components/core/Text';
import Header from '@src/components/Header';
import { withLayout_2 } from '@components/Layout';
import { useNavigation } from 'react-navigation-hooks';
import styles from './styles';

export const TAG = 'AddNode';
const listItems = [
  {
    title: 'Node Device',
    subTitle: 'Plug in and connect',
    routeName: routeNames.GetStaredAddNode
  },
  {
    title: 'Node Virtual',
    subTitle: 'Run a virtual node',
    routeName: routeNames.AddSelfNode
  },
];

const AddNode = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header title="Add a Node" />
      <View borderTop paddingHorizontal fullFlex>
        {listItems?.map(item => (
          <TouchableOpacity
            key={item.routeName}
            onPress={() => navigation.navigate(item?.routeName)}
            style={styles.contentItem}
          >
            <Text style={styles.title}>
              {item?.title}
            </Text>
            <Text4 style={styles.subTitle}>
              {item?.subTitle}
            </Text4>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default withLayout_2(AddNode);
