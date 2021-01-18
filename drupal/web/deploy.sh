#!/bin/bash
# Deploy new changes

# Abort if anything fails
set -e

# Coloring outputs
yellow='\033[1;33m'
NC='\033[0m'

# Command variables
drush='drush'
composer='composer'

# web directory
BASEDIR="$( cd "$( dirname "$0" )" && pwd )"

# Remove memory limit to drush and composer
if [[ $BASEDIR = /home/YOURSERVER* ]]
then
  drush='php -d memory_limit=-1 /home/YOURSERVER/app/drush/drush'
  composer='php -d memory_limit=-1 /home/YOURSERVER/app/composer/composer'
  echo -e "${yellow}Environment: Server${NC}"
else
  echo -e "${yellow}Environment: Local${NC}"
fi


# DB Dump
echo
echo -e "${yellow}Dump current db to ${BASEDIR}/../db_dump/deploy-dump-$(date +"%Y-%m-%d").local.sql...${NC}"
echo
$drush sql:dump --result-file=$BASEDIR/../db_dump/deploy-dump-$(date +"%Y-%m-%d").local.sql

# Fetch git updates
echo
echo -e "${yellow}Fetch git updates...${NC}"
echo
git pull

# Install packages
echo
echo -e "${yellow}Installing composer packages...${NC}"
echo
$composer install

# Update configuration
echo
echo -e "${yellow}Importing configuration...${NC}"
echo
$drush cim -y

# Apply database updates
echo
echo -e "${yellow}Apply databas updates of modules...${NC}"
echo
$drush updb

# Clear cache
echo
echo -e "${yellow}Clearing cache...${NC}"
echo
$drush cr
