#!/bin/bash

# Initial VPS Setup Script for Contabo Server
# Run as root: sudo bash vps-initial-setup.sh

set -e

echo "🚀 Starting VPS initial setup..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Docker
echo "🐳 Installing Docker..."
apt install -y docker.io docker-compose
systemctl enable docker
systemctl start docker

# Install Nginx
echo "🌐 Installing Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# Install Certbot
echo "🔒 Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Install PM2
echo "⚙️  Installing PM2..."
npm install -g pm2

# Install Python and pip
echo "🐍 Installing Python..."
apt install -y python3 python3-pip python3-venv

# Configure Firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw allow 8001/tcp  # Statement Unlocker
ufw allow 8000/tcp  # Paperless-ngx

echo "✅ VPS initial setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone Statement Unlocker: cd /opt && git clone https://github.com/sunnykumarsingh1997/mstools.git unlocker"
echo "2. Run setup-unlocker-service.sh from /opt/unlocker"
echo "3. Set up Paperless-ngx: mkdir -p /opt/paperless && copy docker-compose.yml"
echo "4. Configure Nginx with provided config files"
echo "5. Run Certbot for SSL certificates"

