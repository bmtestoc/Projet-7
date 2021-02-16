![Image](frontend/vueproject/src/assets/icon-left-font3.png)

Prérequis  
Installer Apache, PHP et MySQL sur la machine (WAMP pour windows ou LAMP pour Linux) et Node.

1/ Cloner le repository GitHub 
Il est situé à l'adresse https://github.com/bmtestoc/Projet-7

2/ Démarrer le service MySQL

3/ Création de la base de données  
Exécuter le script groupomania.sql dans votre SGBD (situé à la racine du projet).

4/ Accès BDD  
Saisir vos informations de connexion à la BDD dans le fichier Projet-7\backend\config\db.config.js

5/ Backend  
Se rendre dans le dossier backend et lancer les commandes : "npm install" puis "nodemon server".

6/ Frontend  
Se rendre dans le dossier frontend/vueproject et lancer les commandes : "npm install" puis "npm run dev".

7/ Application  
L'application est disponible à l'adresse : http://localhost:8080/signup  
Vous pouvez créer votre compte.  
Ensuite, pour vous connecter, rendez-vous à l'adresse : http://localhost:8080/signin 

8/ Identification  
A l'inscription, l'utilisateur créé est un user (profile = 0 dans la table user).  
Pour accéder aux droits admin, il faut se rendre dans la table user et  passer la valeur du champ profile à 1.

