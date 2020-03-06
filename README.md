# Drupal Docksal Starterkit

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
git clone git@github.com:saschaeggi/drupal-docksal-starterkit.git drupal-docksal-starterkit
```

### *Optional:* Add custom domain for local development
Add the following to your `/etc/hosts`:

```
# Drupal Docksal Starterkit
192.168.64.100 drupal.mydomain.local
::2 drupal.mydomain.local
```

### Build/Install containers
```
fin init
```

---

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
