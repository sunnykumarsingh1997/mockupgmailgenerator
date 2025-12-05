#!/bin/bash

# Deployment script for Mockup Gmail Generator
# Run this script on your VPS after initial setup

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# Navigate to application directory
APP_DIR="/var/www/mockupgmailgenerator"
cd "$APP_DIR" || exit 1

echo -e "${GREEN}📦 Pulling latest changes from GitHub...${NC}"
git pull origin main

echo -e "${GREEN}📥 Installing/updating dependencies...${NC}"
npm install

echo -e "${GREEN}🔨 Building production version...${NC}"
npm run build

echo -e "${GREEN}🔒 Setting proper permissions...${NC}"
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

echo -e "${GREEN}🔄 Reloading Nginx...${NC}"
systemctl reload nginx

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${YELLOW}Visit: https://app.codershive.in${NC}"



