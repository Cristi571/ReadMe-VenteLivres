

# TP Développement web backend



## Objectif : 
> Concevoir et mettre en place une API
***


### Contexte : 
> La société **ReadMe** souhaite digitaliser son activité de vente de livres, en mettant en ligne la fiche des livres proposés. Elle décide de confier le projet à un tiers et s’adresse à l’agence pour laquelle vous travailler.
Après discussion avec l’agence, il est décidé que le développement sera fait avec un environnement JavaScript côté front et back, ainsi qu’une base de données NoSQL. Votre responsable vous demande prend en charge le back.
___


### Fonctionnalités attendues :

- [ ] Possibilité d’inscription et connexion pour l’utilisateur
- [ ] Visualiser la liste des fiches de livres
- [ ] Visualiser / ajouter / modifier / supprimer une fiche de livre 
___


### Contraintes :

- Le développement backend se fera avec *NodeJS* et *MongoDB* (version cloud avec *Atlas*)
- Les fonctionnalités d’ajout, modification et suppression doivent être sécurisées
- Les données des utilisateurs doivent être sécurisées
- Les fiches produit doivent contenir à minima :
  - le titre, 
  - le nom de l’auteur, 
  - le prix, 
  - l’ISBN, 
  - le nombre de pages
- Les données sont au format JSON
---


### Bonus :

- [ ] Permettre à l’utilisateur de classer les livres par catégories
- [ ] Étoffer les fiches produit avec des informations supplémentaires 
  - (par exemple le stock disponible, l’année de publication, …)
---


### Rendu :

- [ ] Envoyer votre travail sur Teams
- [ ] Documentation de l’API comme vu en cours (document de formalisation)
- [ ] Un dossier « back » contenant l’API
---


### Barème : 

| ***N°***  | **Fonctionnalités**           | **Points** | **Description** |
| :-:       | :---------------------------- | :--------- | :-------------- |
| 1.        | Fonctionnalités utilisateurs  |    5 pts   |  |
| 2.        | Fonctionnalités livres        |    5 pts   |  |
| 3.        | Sécurité                      |    4 pts   |  |
| 4.        | Formalisation de l’API        |    3 pts   |  |
| 5.        | Clarté du code                |    3 pts   |  |
|           | **Total**                     |      pts   |  |

___



# Dependencies and Requirements 

> To run this project/application please follow the steps listed below and 
>  \**have fun*\* !

  1. **NodeJS**
     - Make sure you have at least the **16.14.2 NodeJS** Version\
     - You can download NodeJS [here](https://nodejs.org/en/download/)\
     - Additional documentation about this [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
     - Check the **node** version : \
     `node -v`
   

  2. **npm**
     - Make sure you have at least the **7.24.2** Version of npm
     - Run the command below in your terminal to install **npm** : \
      `npm install -g npm`
     - Check the **npm** version : \
      `npm --version`


  3. **Requirements**
      - Make sure to install all necessary dependencies \
      `npm install`



  | <u>**Note**</u> |
  | :-------------- |
  | Here below you can find a list of dependencies and requirements the you can try to install manually if the 3rd step is not working for you or you have missing dependencies |


> [**bcrypt**](https://www.npmjs.com/package/bcrypt)\
> A password-hashing function \
> `npm install --save bcrypt`


> [**dotenv**](https://www.npmjs.com/package/dotenv)  \
> Module that loads environment variables from a .env file into process.env \
> `npm install --save dotenv`


> [**express**](https://www.npmjs.com/package/express)  \
> A framework that simplifies the API and provides tools for HTTP servers \
> `npm install --save express`


> [**express-session**](https://www.npmjs.com/package/express-session)  \
> Package that helps creating a session middleware with the given options \
> `npm install --save express-session`


> [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)  \
> Allows to transfer data safely using tokens \
> `npm install --save express-session`


> [**mongoose**](https://www.npmjs.com/package/mongoose) \
>  A OOP JS library that creates connexions between *MongoDB* and *NodeJS*  \
> `npm install --save mongoose`


> [**mongoose-unique-validator**](https://www.npmjs.com/package/mongoose-unique-validator)  \
> A plugin which adds pre-save validation for unique fields within a Mongoose schema \
> `npm install --save mongoose-unique-validator`


> [**node-input-validator**](https://www.npmjs.com/package/node-input-validator)  \
> Library for Node.js that helps to validate user inputs using predefined rules.
> `npm install --save node-input-validator`


> [**password-validator**](https://www.npmjs.com/package/password-validator)  \
> Library that helps to validate passwords using predefined rules. \
> `npm install --save password-validator`

---






