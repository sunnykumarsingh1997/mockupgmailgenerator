# VPS Migration Guide - Contabo Server 213.136.74.135

This guide will help you migrate Statement Unlocker and set up fresh Paperless-ngx on your new Contabo VPS.

## Domain Configuration
- **Statement Unlocker**: `pdf.codershive.in` → Port 8001
- **Paperless-ngx**: `docs.codershive.in` → Port 8000

## Step 1: Initial VPS Setup

### Connect to VPS
```bash
ssh root@213.136.74.135
```

### Update System
```bash
apt update && apt upgrade -y
```

### Install Required Software
```bash
# Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Docker and Docker Compose
apt install -y docker.io docker-compose
systemctl enable docker
systemctl start docker

# Install Nginx
apt install -y nginx

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# Install PM2 for process management
npm install -g pm2

# Install Python and pip (for backend if needed)
apt install -y python3 python3-pip
```

### Configure Firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw allow 8001/tcp  # Statement Unlocker
ufw allow 8000/tcp  # Paperless-ngx
ufw enable
ufw status
```

## Step 2: Deploy Statement Unlocker

### Clone Repository
```bash
cd /opt
git clone https://github.com/sunnykumarsingh1997/mstools.git unlocker
cd unlocker
```

### Install Dependencies
```bash
# Install frontend dependencies
npm install

# Check if backend exists and install
if [ -d "backend-unlocker" ]; then
    cd backend-unlocker
    pip3 install -r requirements.txt  # if requirements.txt exists
    cd ..
fi
```

### Configure Environment Variables
```bash
nano .env
```

Add your environment variables (check the repository for required variables).

### Build Frontend
```bash
npm run build
```

### Set Up as Service

Create PM2 ecosystem file or systemd service. See `setup-unlocker-service.sh` script.

## Step 3: Install Paperless-ngx

### Create Paperless Directory
```bash
mkdir -p /opt/paperless
cd /opt/paperless
```

### Create docker-compose.yml
See the provided `paperless-docker-compose.yml` file.

### Start Paperless-ngx
```bash
docker-compose up -d
```

### Create Admin User
```bash
docker-compose exec webserver createsuperuser
```

## Step 4: Configure Nginx

### Statement Unlocker Config
Create `/etc/nginx/sites-available/pdf.codershive.in` (see provided config file)

### Paperless-ngx Config
Create `/etc/nginx/sites-available/docs.codershive.in` (see provided config file)

### Enable Sites
```bash
ln -s /etc/nginx/sites-available/pdf.codershive.in /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/docs.codershive.in /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Step 5: Setup SSL Certificates

```bash
certbot --nginx -d pdf.codershive.in
certbot --nginx -d docs.codershive.in
```

## Step 6: DNS Configuration

Update your DNS records:
- `pdf.codershive.in` A record → `213.136.74.135`
- `docs.codershive.in` A record → `213.136.74.135`

Wait for DNS propagation (can take up to 48 hours, usually much faster).

## Step 7: Testing

1. Test Statement Unlocker: `https://pdf.codershive.in`
2. Test Paperless-ngx: `https://docs.codershive.in`
3. Verify SSL certificates work
4. Test from React app integration

## Troubleshooting

### Check Service Status
```bash
# Statement Unlocker
pm2 list
pm2 logs

# Paperless-ngx
docker-compose ps
docker-compose logs
```

### Check Nginx Logs
```bash
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Restart Services
```bash
# Statement Unlocker
pm2 restart all

# Paperless-ngx
docker-compose restart

# Nginx
systemctl restart nginx
```

