import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Account } from "../../types";
import { formatCurrency } from "../../utils/dateUtils";

interface AccountCardProps {
  account: Account;
  onPress: (account: Account) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onPress,
}) => {
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "general":
        return "#2196F3";
      case "investment":
        return "#4CAF50";
      case "expenses":
        return "#FF9800";
      default:
        return "#9E9E9E";
    }
  };

  const getAccountTypeText = (type: string) => {
    switch (type) {
      case "general":
        return "General";
      case "investment":
        return "Inversiones";
      case "expenses":
        return "Gastos";
      default:
        return type;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(account)}>
      <View style={styles.header}>
        <Text style={styles.accountName}>{account.name}</Text>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: getAccountTypeColor(account.type) },
          ]}
        >
          <Text style={styles.typeText}>
            {getAccountTypeText(account.type)}
          </Text>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>
          {formatCurrency(account.balance, account.currency)}
        </Text>
        <Text style={styles.currency}>{account.currency}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  currency: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});
