import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { createUser } from "../api/user.js"; // Mettez à jour le chemin vers votre fichier

const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function AuthScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState(""); // Pour les préférences alimentaires

  const handleSubmit = async () => {
    if (isLoginMode) {
      // Logique de connexion ici
      console.log("Login with:", email, password);
    } else {
      // Logique d'inscription ici
      try {
        const result = await createUser(
          username,
          password,
          email,
          dietaryPreferences
        );
        console.log("User created successfully:", result);
        // Affichez un message de succès ou redirigez l'utilisateur
      } catch (error) {
        console.error("Error creating user:", error.message);
        // Affichez un message d'erreur à l'utilisateur si nécessaire
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <StyledText className="text-3xl font-bold text-center mb-6">
        {isLoginMode ? "Connexion" : "Inscription"}
      </StyledText>

      {!isLoginMode && (
        <StyledTextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <StyledTextInput
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <StyledTextInput
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!isLoginMode && (
        <StyledTextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-6"
          placeholder="Préférences alimentaires"
          value={dietaryPreferences}
          onChangeText={setDietaryPreferences}
        />
      )}

      <StyledTouchableOpacity
        className="bg-blue-500 py-3 rounded-md"
        onPress={handleSubmit}
      >
        <StyledText className="text-white text-center text-lg font-semibold">
          {isLoginMode ? "Se connecter" : "S’inscrire"}
        </StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        className="mt-4"
        onPress={() => setIsLoginMode((prev) => !prev)}
      >
        <StyledText className="text-blue-500 text-center">
          {isLoginMode
            ? "Pas encore de compte ? Inscrivez-vous"
            : "Déjà un compte ? Connectez-vous"}
        </StyledText>
      </StyledTouchableOpacity>
    </View>
  );
}
