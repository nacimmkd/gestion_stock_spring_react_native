# Gestion de stock — API

API REST de gestion de stock : catalogue de produits, mouvements d'entrée et de sortie, alertes de stock faible et tableau de bord. Elle sert de backend à l'application mobile React Native du dossier [`../mobile`](../mobile).

## Stack

| Élément | Version / choix |
|---|---|
| Langage | Java 17 |
| Framework | Spring Boot 4.1.1 (Web MVC, Data JPA, Validation, Actuator) |
| Base de données | PostgreSQL 16 |
| Documentation | springdoc-openapi (Swagger UI) |
| Divers | Lombok, Maven Wrapper, Docker |

## Fonctionnalités

- CRUD des produits, avec référence unique.
- Liste paginée avec recherche (nom du produit ou de la catégorie), filtre par catégorie et filtre par statut de stock.
- Entrées et sorties de stock, avec refus d'une sortie supérieure au stock disponible.
- Statut de stock calculé à partir de la quantité et du seuil d'alerte.
- Tableau de bord : totaux, répartition par statut et par catégorie.
- Liste des catégories (lecture seule).

## Démarrage

### Avec Docker (recommandé)

Depuis le dossier `api` :

```bash
docker compose up --build
```

Aucune configuration n'est nécessaire : `docker-compose.yml` fournit des valeurs par défaut pour la base (voir le tableau des variables). Pour les remplacer, créer un fichier `.env` à côté de `docker-compose.yml` :

```bash
cp .env.example .env      # puis renseigner les variables à changer
```

L'API écoute sur `http://localhost:8080`. Le port 8080 doit être libre sur la machine. Vérifier l'état des conteneurs avec `docker compose ps` : les deux services doivent passer en `healthy`.

La base n'a pas de volume : les données sont perdues à chaque `docker compose down`, puis recréées au démarrage suivant à partir de `data.sql`.

### En local

Prérequis : JDK 17 et une base PostgreSQL accessible sur `localhost:5432`.

Hors Docker, les trois variables de la base sont obligatoires : `application.yaml` ne leur donne pas de valeur par défaut.

```bash
createdb gestion_stock
cp .env.example .env      # puis renseigner les trois variables

set -a; source .env; set +a
./mvnw spring-boot:run
```

Les tables sont créées automatiquement au démarrage (`ddl-auto: update`).

> `application.yaml` importe le fichier `api/.env`, avec un chemin relatif au répertoire de lancement. Il n'est donc lu que si l'application est lancée depuis la racine du dépôt (cas d'IntelliJ ouvert sur la racine). Lancée depuis `api`, elle a besoin des variables dans l'environnement, d'où la ligne `source .env` ci-dessus.

### Variables d'environnement

| Variable | Rôle | Défaut avec Docker Compose | Défaut en local |
|---|---|---|---|
| `POSTGRES_DB` | Nom de la base | `gestion_stock` | aucun, obligatoire |
| `POSTGRES_USER` | Utilisateur PostgreSQL | `postgres` | aucun, obligatoire |
| `POSTGRES_PASSWORD` | Mot de passe | `123` | aucun, obligatoire |
| `POSTGRES_HOST` | Hôte de la base | `postgres` (fixé par le compose) | `localhost` |

Les valeurs par défaut du compose sont prévues pour le développement en local. Pour tout autre usage, définir au minimum `POSTGRES_PASSWORD` dans `.env`.

### Données de démonstration

`src/main/resources/data.sql` est exécuté à chaque démarrage. Il insère 3 catégories (Téléphone, Ordinateurs, Accessoires) et 45 produits, sans créer de doublons si les données existent déjà.

Sur une base neuve, le tableau de bord renvoie donc 45 produits, 676 unités, 24 produits en stock normal, 13 en stock faible et 8 en rupture.

## Endpoints

Tous les endpoints sont sous le préfixe `/api/v1`.

| Méthode | Chemin | Description |
|---|---|---|
| `GET` | `/products` | Liste paginée, avec recherche et filtres (`search`, `categoryId`, `status`, `page`, `size`, `sort`) |
| `GET` | `/products/{id}` | Détail d'un produit |
| `POST` | `/products` | Création d'un produit |
| `PUT` | `/products/{id}` | Modification de la fiche (hors quantité) |
| `PATCH` | `/products/{id}/stock` | Entrée ou sortie de stock |
| `DELETE` | `/products/{id}` | Suppression d'un produit |
| `GET` | `/categories` | Liste des catégories |
| `GET` | `/dashboard` | Statistiques du stock |

Pour plus de détails (paramètres, corps de requête, réponses) ou pour tester les endpoints, ouvrir ces liens une fois la base et l'API démarrées :

- [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) pour explorer et tester les endpoints dans le navigateur ;
- [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs) pour le schéma OpenAPI en JSON, utilisé pour générer les types TypeScript du mobile.
