# Deployment Guide for app.codershive.in

This guide will help you deploy the Mockup Gmail Generator app to your Contabo VPS with SSL using Nginx and Let's Encrypt.

## Prerequisites

- Contabo VPS with Ubuntu/Debian Linux
- Domain `app.codershive.in` pointing to your VPS IP
- SSH access to your VPS
- Root or sudo access

## Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

## Step 2: Install Required Software

### Update system packages
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js (v18 or higher)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify installation
```

### Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Install Certbot (for SSL)
```bash
sudo apt install -y certbot python3-certbot-nginx
```

## Step 3: Clone and Setup the Application

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/sunnykumarsingh1997/mockupgmailgenerator.git
cd mockupgmailgenerator

# Install dependencies
sudo npm install

# Build the production version
sudo npm run build
```

## Step 4: Configure Environment Variables

```bash
# Create .env file (you'll need to add your actual values)
sudo nano .env
```

Add your environment variables (Supabase keys, etc.):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Rebuild after adding environment variables:
```bash
sudo npm run build
```

## Step 5: Configure Nginx

Create Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/app.codershive.in
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name app.codershive.in;

    root /var/www/mockupgmailgenerator/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/app.codershive.in /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 6: Setup SSL with Let's Encrypt

```bash
sudo certbot --nginx -d app.codershive.in
```

Follow the prompts:
- Enter your email address
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will automatically update your Nginx configuration to use SSL.

## Step 7: Setup Auto-Renewal for SSL

SSL certificates expire every 90 days. Setup auto-renewal:

```bash
sudo certbot renew --dry-run  # Test renewal
```

The renewal is usually handled automatically by a systemd timer, but verify:
```bash
sudo systemctl status certbot.timer
```

## Step 8: Setup Auto-Deployment (Optional)

### Option A: Manual Deployment Script

Create a deployment script:
```bash
sudo nano /var/www/mockupgmailgenerator/deploy.sh
```

Add:
```bash
#!/bin/bash
cd /var/www/mockupgmailgenerator
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
echo "Deployment completed!"
```

Make it executable:
```bash
sudo chmod +x /var/www/mockupgmailgenerator/deploy.sh
```

### Option B: GitHub Actions (Recommended)

The project already has GitHub Actions configured. After pushing to main, it will auto-deploy if you've set up the deployment server.

## Step 9: Set Proper Permissions

```bash
sudo chown -R www-data:www-data /var/www/mockupgmailgenerator
sudo chmod -R 755 /var/www/mockupgmailgenerator
```

## Step 10: Firewall Configuration

If you have UFW firewall enabled:
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## Step 11: Verify Deployment

1. Visit `http://app.codershive.in` (should redirect to HTTPS)
2. Visit `https://app.codershive.in` (should show your app)
3. Check SSL certificate: `https://www.ssllabs.com/ssltest/analyze.html?d=app.codershive.in`

## Troubleshooting

### Check Nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check if Nginx is running
```bash
sudo systemctl status nginx
```

### Restart Nginx
```bash
sudo systemctl restart nginx
```

### Check if port 80 and 443 are open
```bash
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

### If build fails
```bash
cd /var/www/mockupgmailgenerator
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Maintenance Commands

### Update the application
```bash
cd /var/www/mockupgmailgenerator
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

### Renew SSL certificate manually
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Check disk space
```bash
df -h
```

## Security Recommendations

1. Keep your system updated: `sudo apt update && sudo apt upgrade`
2. Use strong passwords for all accounts
3. Consider setting up fail2ban for SSH protection
4. Regularly backup your application and database
5. Monitor logs for suspicious activity

## Support

For issues, check:
- Nginx error logs: `/var/log/nginx/error.log`
- Application logs (if using PM2)
- GitHub repository: https://github.com/sunnykumarsingh1997/mockupgmailgenerator

