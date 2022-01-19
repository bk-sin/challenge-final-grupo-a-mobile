import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Home from "../screens/Home";
import Productos from "../screens/Productos";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import authAction from "../redux/actions/authAction.jsx";
import { connect } from "react-redux";

const Tab = createNativeStackNavigator();
function NavTabs(props) {
  !props.isAuth && props.tokenVerify();
  console.log(props);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: props.isAuth ? props.user : "Hexagon",
          headerRight: () => (
            <Button
              onPress={() => props.navigation.openDrawer()}
              title="Menu"
              color="#000000"
            />
          ),
        }}
      />
      <Tab.Screen name="Productos" component={Productos} />
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="SignIn" component={SignIn} />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {
  tokenVerify: authAction.tokenVerify,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs);
