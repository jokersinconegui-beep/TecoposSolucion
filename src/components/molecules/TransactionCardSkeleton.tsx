import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '../atoms/Skeleton';

export const TransactionCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <Skeleton width="70%" height={18} style={{ marginBottom: 8 }} />
          <View style={styles.metaInfo}>
            <Skeleton width="25%" height={20} style={{ marginRight: 8 }} />
            <Skeleton width="30%" height={12} />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Skeleton width="60%" height={18} style={{ marginBottom: 4 }} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
});

export default TransactionCardSkeleton;