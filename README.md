# Gestion de stock

Application de gestion de stock composée d'une API REST et d'une application mobile : catalogue de produits, entrées et sorties de stock et tableau de bord.

## Composition du projet

| Dossier | Contenu | Stack | Documentation |
|---|---|---|---|
| [`api`](api) | API REST | Java 17, Spring Boot 4, PostgreSQL 16 | [`api/README.md`](api/README.md) |
| [`mobile`](mobile) | Application mobile | React Native, Expo, TypeScript, React Navigation | [`mobile/README.md`](mobile/README.md) |

## Fonctionnalités

- Liste des produits avec recherche (nom ou catégorie), filtre par statut de stock et pagination.
- Création, modification et suppression d'un produit.
- Entrées et sorties de stock
- Statut de stock
- Tableau de bord
- Notifications locales des produits en rupture

## Démarrage rapide

### 1. Lancer l'API et la base

```bash
cd api
docker compose up --build
```

L'API écoute sur `http://localhost:8080`. La base est remplie au démarrage avec des données de démonstration (3 catégories et 45 produits). La documentation des endpoints est disponible sur [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html).

### 2. Lancer l'application mobile

Avant le lancement, adapter l'adresse de l'API dans `mobile/src/shared/api/client.ts` : depuis un téléphone ou un émulateur, `localhost` ne désigne pas le PC qui héberge l'API. Les adresses à utiliser sont détaillées dans [`mobile/README.md`](mobile/README.md).

```bash
cd mobile
npm install
npx expo start
```

Scanner ensuite le QR code avec Expo Go, ou appuyer sur `a` dans le terminal pour ouvrir l'émulateur Android.

Pour le lancement de l'API sans Docker, les variables d'environnement et le détail de chaque partie, voir les README des deux dossiers.

## Structure

```
.
├── api/        API REST Spring Boot, Dockerfile et docker-compose.yml
└── mobile/     Application React Native (Expo)
```
