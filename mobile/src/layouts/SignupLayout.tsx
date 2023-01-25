import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsLayout from "./signup/TermsLayout";
import InputLayout from "./signup/InputLayout";
import TermsDetailLayout from "./signup/TermsDetailLayout";
import useNavParams from "../uses/useNavParams";

const StackNav = createNativeStackNavigator();

function SignupLayout() {
  const params = useNavParams();

  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen name="TermsLayout" component={TermsLayout} initialParams={params} />
      <StackNav.Screen name="InputLayout" component={InputLayout} initialParams={params} />
      <StackNav.Screen
        name="TermsDetailLayout"
        component={TermsDetailLayout}
        initialParams={params}
      />
    </StackNav.Navigator>
  );
}

export default SignupLayout;
