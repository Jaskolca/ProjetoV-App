import React, { useCallback, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";

import { useAuth } from "../../hooks/auth";

import Input from "../../components/Input";
import Button from "../../components/Button";

interface SignInFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          username: data.username,
          password: data.password,
        });

        navigate("Home");
      } catch (err) {
        console.error(
          "Ocorreu um erro ao fazer login, verifique as credenciais."
        );
      }
    },
    [signIn, navigate]
  );

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Form onSubmit={handleSignIn} ref={formRef}>
          <Input
            name="username"
            icon="user"
            placeholder="Username"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Input
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry={true}
            returnKeyType="done"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
            textContentType="newPassword"
          />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
          </Button>
        </Form>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
