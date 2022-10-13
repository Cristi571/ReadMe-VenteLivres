

# TP Développement web backend



### Objectif : 
> Concevoir et mettre en place une API
***


#### Contexte : 
> La société **ReadMe** souhaite digitaliser son activité de vente de livres, en mettant en ligne la fiche des livres proposés. Elle décide de confier le projet à un tiers et s’adresse à l’agence pour laquelle vous travailler.
Après discussion avec l’agence, il est décidé que le développement sera fait avec un environnement JavaScript côté front et back, ainsi qu’une base de données NoSQL. Votre responsable vous demande prend en charge le back.
___


#### Fonctionnalités attendues :

- [ ] Possibilité d’inscription et connexion pour l’utilisateur
- [ ] Visualiser la liste des fiches de livres
- [ ] Visualiser / ajouter / modifier / supprimer une fiche de livre 
___


#### Contraintes :

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


#### Bonus :

- [ ] Permettre à l’utilisateur de classer les livres par catégories
- [ ] Étoffer les fiches produit avec des informations supplémentaires 
  - (par exemple le stock disponible, l’année de publication, …)
---


#### Rendu :

- [ ] Envoyer votre travail sur Teams
- [ ] Documentation de l’API comme vu en cours (document de formalisation)
- [ ] Un dossier « back » contenant l’API
---


##### Barème : 

| ***N°***  | **Fonctionnalités**           | **Points** | **Description** |
| :-:       | :---------------------------- | :--------- | :-------------- |
|
| 1.        | Fonctionnalités utilisateurs  |    5 pts   |  |
| 2.        | Fonctionnalités livres        |    5 pts   |  |
| 3.        | Sécurité                      |    4 pts   |  |
| 4.        | Formalisation de l’API        |    3 pts   |  |
| 5.        | Clarté du code                |    3 pts   |  |
|           | **Total**                     |      pts   |  |

___



## Dependencies and Requirements 

> **Mongoose** is a JS library that creates connexions between *MongoDB* and *NodeJS*
> `npm install --save mongoose`


> ****
> `npm install --save express-session`
---