import axios from "axios";

export async function createUser(
  username,
  password,
  email,
  dietary_preferences
) {
  try {
    const response = await axios.post("http://192.168.1.234:8000/api/users", {
      // Remplacez par votre IP
      username,
      password,
      email,
      dietary_preferences,
    });

    return response.data; // Retourne les données de réponse
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.error ||
          "Erreur 1 lors de la création de l'utilisateur"
      );
    } else {
      throw new Error("Erreur 2 lors de la création de l'utilisateur");
    }
  }
}
