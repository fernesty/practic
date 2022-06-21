import React from "react";
import { StyleSheet, View } from "react-native";
import { Outlet, Link } from "react-router-dom";


class Pages extends React.Component {
  render() {
    return (<View style={styles.container}>
      <View style={styles.mainMenu}>
        <Link to="./" style={{
          display: "block",
          textAlign: "center",
          textDecoration: "none",
          backgroundColor: "#E3BCC1",
          borderRadius: 4,
          padding: "10px 20px",
          color: "#3D0008",
        }}>Главная</Link>
        <Link to="./Test" style={{
          display: "block",
          textAlign: "center",
          textDecoration: "none",
          backgroundColor: "#E3BCC1",
          borderRadius: 4,
          padding: "10px 20px",
          color: "#3D0008",
        }}>Test</Link>
      </View>
      <Outlet />
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(61,0,8)",
    backgroundImage: "linear-gradient(35deg, rgba(61,0,8,1) 35%, rgba(252,240,241,1) 100%)",
    color: "#FCF0F1",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",

  }, button: {
    backgroundColor: "#E3BCC1", borderRadius: 4, paddingVertical: 10, paddingHorizontal: 20, color: "#3D0008",
  }, mainMenu: {
    flexDirection: "row", justifyContent: "center",
  },
});

export default Pages;
