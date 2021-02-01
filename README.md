# Drupal Docksal Starterkit for PSY Web

A Drupal Starterkit with GraphQL, GraphQL Twig, Gin Future UI, Minimal Frontend Setup with Webpack and vanilla JS running on Docksal (Docker).

## Prerequisites

### Get Docker (for Mac/Windows)
Install Docker Desktop (Mac/Windows): https://www.docker.com/products/docker-desktop
(Use Version 2.1.0.5 or lower until this issue is fixed: https://github.com/docksal/docksal/issues/482)

### Install Docksal
Install Docksal: https://docksal.io/

---

## Installation

### Clone repo
Clone the repo into ```~/Projects```
```
git clone git@github.com:AdictoGmbH/drupal-docksal-starterkit.git drupal-docksal-starterkit
```

### Build/Install containers
```
fin init
```

### Fix services link
Replace `/sites/development.services.yml` in `drupal/web/sites/default/settings.local.php` with `/sites/local.services.yml`.

### Install packages
```
cd drupal
composer install
cd web
composer install
```

### Instance setup
```
drush site-install standard --site-name=drupal-docksal-starterkit --account-name=admin --account-pass=drupal
```

### Copy used icon for menu
```
cd drupal/web
mkdir -p sites/default/files/icons/svgs
cd themes/frontend
cp images/icons/menu.svg ../../sites/default/files/icons/svgs/

```

### Install default db (and generate sprites)
Needs to happen after copying the icon
```
drush sql-cli < ../db_dump/drupal.sql
drush generate-sprites
drush cr
```

---

### Add Drush local config
```
echo "options:
  uri: 'http://drupal-docksal-starterkit.docksal/'" >> drupal/drush/drush.yml
```

## Commands

### Start containers
```
fin start [or fin up]
```

### Stop containers
```
fin stop
```

### When using VirtualBox instead of Docker for Mac

#### Start Docksal VM Box
```
fin system start
```

#### Stop Docksal VM Box
```
fin system stop
```

### SSH into containers
#### Default CLI container
```
fin bash
```

#### Specific container
```
fin exec --in=CONTAINERNAME bash
```

### Drush
Make sure you're in the frontend folder (`cd drupal/web`)

```
fin drush COMAMND
```

#### Show Aliases
```
fin drush sa
```

#### Sync Database
```
fin drush sql-sync @dev @self
```
Syncs the DB, Syntax: @FROM-ALIAS @TO-ALIAS

#### Rsync Files
```
fin drush rsync @dev:%files @self:%files
```
Syncs files, Syntax: @FROM-ALIAS @TO-ALIAS, %files is a wildcard for the specificed Drupal files folder

#### Drush SSH
```
fin drush @dev ssh
```
SSH into the remote server

### Composer
Make sure you're in the frontend folder (`cd drupal/web`)

```
fin composer COMMAND
```

---

## Drupal

https://drupal-docksal-starterkit.docksal/

```
username: admin
password: drupal
```

### GraphQL Default API
https://drupal-docksal-starterkit.docksal/graphql

Authentication via Bearer access token.

#### Get a Bearer Token
```
curl --request POST \
  --url https://drupal-docksal-starterkit.docksal/oauth/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=password \
  --data username=api \
  --data password=drupal \
  --data client_id=104a2b89-02fc-4501-aebc-2ec7766cc84f \
  --data 'client_secret=7U9_kQ_@ozhHi!.v-!'
  ```

### Mailhog
https://mail.drupal-docksal-starterkit.docksal/

### Solr
https://solr.drupal-docksal-starterkit.docksal/

---

## Frontend Theme

### Run theme (compile / watch)
Install
```
cd drupal/web/themes/frontend/
nvm use
npm install
```

### Setup
Install dependencies in `drupal/web/core` (used for linting, e.g.)
```bash
cd drupal/web/core/
nvm use 10.15.1 # no version specified, let's use the one from `drupal/web/themes/frontend/`
npm install
```

### Run theme (compile / watch)
See [drupal/web/themes/frontend/README.md](drupal/web/themes/frontend/README.md)

---

## Special

### Skip frontend build on commit

By default, the frontend is built in a `pre-commit` hook and `drupal/web/themes/frontend/dist` added to the commit. Use `--no-verify` in your `git commit` command to skip this behavior.

### Database update with new structure

```
cd drupal/web
fin bash
drush sql-cli < PATH_TO_DUMP
drush cr
drush cim -y
drush updb
```

## Deployment

To deploy changes use

```shell script
bash drupal/web/deploy.sh
```

Replace /home/YOURSERVER with the home path on your server

It includes the following steps:
- db dump
- git pull
- composer install
- drush cim -y
- drush updb
- drush cr

It checks environment. Server environments will be recognised based on the path prefix /home/YOURSERVER.
