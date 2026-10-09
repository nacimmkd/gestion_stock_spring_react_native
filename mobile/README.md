# Gestion de stock — Mobile

Application mobile de gestion de stock : consultation et recherche des produits, création et modification, entrées et sorties de stock, et tableau de bord. Elle consomme l'API REST du dossier [`../api`](../api).

## Stack

| Élément | Version / choix |
|---|---|
| Langage | TypeScript |
| Framework | React Native 0.86, Expo SDK 57 |
| Navigation | React Navigation 7 |
| Appels API | Axios |
| Validation des formulaires | Zod |
| Graphiques | react-native-gifted-charts |
| Types de l'API | Générés depuis le schéma OpenAPI avec openapi-typescript |

## Fonctionnalités

- Liste des produits avec recherche par nom ou catégorie, filtre par statut de stock et pagination.
- Détail d'un produit, avec entrée et sortie de stock.
- Création, modification et suppression d'un produit, avec validation du formulaire.
- Tableau de bord : chiffres clés et répartition des produits par catégorie.

## Démarrage

### Prérequis

- Node.js (version LTS) et npm.
- L'API démarrée et joignable depuis l'appareil de test (voir [`../api/README.md`](../api/README.md)).
- Pour tester : l'application Expo Go sur un téléphone, ou un émulateur Android.

### Installation

Depuis le dossier `mobile` :

```bash
npm install
```

### Adresse de l'API

L'adresse de l'API est définie dans `src/shared/api/client.ts`, dans la constante `api_url`. Elle doit être adaptée avant le lancement.

| Où tourne l'application | Adresse à utiliser |
|---|---|
| Téléphone réel (Expo Go) | `http://<IP locale du PC>:8080/api/v1` |
| Émulateur Android | `http://10.0.2.2:8080/api/v1` |
| Simulateur iOS | pas encore testé |

Le téléphone et le PC doivent être sur le même réseau.

### Lancement

```bash
npx expo start
```

Scanner ensuite le QR code avec Expo Go, ou appuyer sur `a` dans le terminal pour ouvrir l'émulateur Android.

## Écrans

| Écran | Accès | Contenu |
|---|---|---|
| Produits | Onglet | Liste, recherche, filtre par statut |
| Créer | Onglet | Formulaire de création d'un produit |
| Tableau de bord | Onglet | Chiffres clés et graphique par catégorie |
| Produit | Depuis une carte de la liste | Détail, mouvements de stock, modification, suppression |
| Modifier le produit | Depuis le détail | Formulaire de modification |

## Types de l'API

Les types TypeScript des requêtes et des réponses ne sont pas écrits à la main : ils sont générés depuis le schéma OpenAPI de l'API, dans `src/shared/api/generated/schema.ts`.

Après une modification d'un DTO ou d'un endpoint côté API, les régénérer avec l'API démarrée sur `localhost:8080` :

```bash
npm run generate:types
```

## Structure du projet

Le code est organisé par fonctionnalité : chaque dossier de `features` regroupe ses écrans, ses composants, ses appels API et sa validation.

```
src/
├── features/
│   ├── products/       Écrans, composants, appels API et schéma de validation
│   ├── dashboard/      Écran et appel API du tableau de bord
│   └── categories/     Appel API des catégories
├── shared/
│   ├── api/            Client Axios, types et schéma généré
│   ├── components/     Composants réutilisables (Button, TextField, AlertDialog…)
│   └── hooks/          useFetch
└── navigation/         Onglets et pile d'écrans
```
