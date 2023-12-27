import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, className } from "react-native";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.logoAndTitle}>
        {/* Logo */}
        <Text style={styles.text}>Logo</Text>
        
        {/* Title */}
        <Text style={[styles.text, styles.title]}>Title</Text>
      </View>

      <View style={styles.icons}>
        {/* Notification Icon */}
        <TouchableOpacity onPress={() => console.log('Notification pressed')}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#A0AEC0" // This is a gray color, you might need to adjust it to match the exact tone of 'bg-gray-400'
  },
  logoAndTitle: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    marginLeft: 8
  },
  icons: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconText: {
    color: "white",
    fontSize: 20,
    marginRight: 16
  }
});

export default Navbar;
