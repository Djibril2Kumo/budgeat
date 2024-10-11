# Utilise l'image Node 18
FROM node:18

# Définit le répertoire de travail
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json (pour les dépendances)
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers de l'application dans le conteneur
COPY . .

# Expose le port 19000 pour Expo
EXPOSE 19000

# Expose également le port 19001 pour WebSocket et le port 3000 si nécessaire
EXPOSE 19001
EXPOSE 3000

# Définit la variable d'environnement pour forcer Expo à utiliser l'adresse IP
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.100

CMD npm i @expo/ngrok@^4.1.0

# Commande d'entrée
ENTRYPOINT npx expo start --port 19000 --tunnel
