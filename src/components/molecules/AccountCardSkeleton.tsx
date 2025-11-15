import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '../atoms/Skeleton';

export const AccountCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Skeleton width="60%" height={20} />
        <Skeleton width="20%" height={20} />
      </View>
      <View style={styles.balanceContainer}>
        <Skeleton width="40%" height={28} />
        <Skeleton width="15%" height={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});