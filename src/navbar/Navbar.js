import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, className } from "react-native";
import { navbar } from "../../style/styles";

const Navbar = () => {
  return (
    <View style={navbar.navbar}>
      <View style={navbar.logoAndTitle}>
        {/* Logo */}
        <Text style={navbar.text}>Logo</Text>
        
        {/* Title */}
        <Text style={[navbar.text, navbar.title]}>Title</Text>
      </View>

      <View style={navbar.icons}>
        {/* Notification Icon */}
        <TouchableOpacity onPress={() => console.log('Notification pressed')}>
          <Text style={navbar.iconText}>🔔</Text>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
          <Text style={navbar.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Navbar;
