# VPS Migration Quick Start Guide

This guide provides step-by-step instructions to migrate Statement Unlocker and set up Paperless-ngx on your new Contabo VPS.

## Prerequisites

- SSH access to VPS: `213.136.74.135`
- Root or sudo access
- DNS control for `codershive.in` domain

## Quick Deployment Steps

### 1. Initial VPS Setup

```bash
# Connect to VPS
ssh root@213.136.74.135

# Upload and run initial setup script
# (Upload vps-initial-setup.sh to server first)
bash vps-initial-setup.sh
```

### 2. Deploy Statement Unlocker

```bash
# Clone repository
cd /opt
git clone https://github.com/sunnykumarsingh1997/mstools.git unlocker
cd unlocker

# Configure environment variables
nano .env
# Add your required environment variables

# Run setup script
bash setup-unlocker-service.sh
```

### 3. Deploy Paperless-ngx

```bash
# Create directory
mkdir -p /opt/paperless
cd /opt/paperless

# Copy docker-compose.yml (upload paperless-docker-compose.yml first)
cp /path/to/paperless-docker-compose.yml docker-compose.yml

# Deploy
bash deploy-paperless.sh

# Create admin user
docker-compose exec webserver createsuperuser
```

### 4. Configure Nginx

```bash
# Upload nginx config files to server first, then:
bash setup-nginx.sh
```

### 5. Setup SSL Certificates

**First, update DNS records:**
- `pdf.codershive.in` A record → `213.136.74.135`
- `docs.codershive.in` A record → `213.136.74.135`

**Wait for DNS propagation (check with `dig pdf.codershive.in`)**

Then run:
```bash
certbot --nginx -d pdf.codershive.in
certbot --nginx -d docs.codershive.in
```

### 6. Update React App

The React app has been updated to use:
- Statement Unlocker: `https://pdf.codershive.in/`
- Document Vault: `https://docs.codershive.in/`

## File Structure on VPS

```
/opt/
├── unlocker/              # Statement Unlocker application
│   ├── .env               # Environment variables
│   └── ecosystem.config.js # PM2 configuration
│
└── paperless/              # Paperless-ngx
    ├── docker-compose.yml
    └── .env               # Paperless environment variables

/etc/nginx/sites-available/
├── pdf.codershive.in      # Statement Unlocker Nginx config
└── docs.codershive.in     # Paperless-ngx Nginx config
```

## Useful Commands

### Statement Unlocker
```bash
pm2 status
pm2 logs statement-unlocker
pm2 restart statement-unlocker
```

### Paperless-ngx
```bash
cd /opt/paperless
docker-compose ps
docker-compose logs -f
docker-compose restart
```

### Nginx
```bash
nginx -t                    # Test configuration
systemctl reload nginx      # Reload Nginx
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Service not starting
- Check logs: `pm2 logs` or `docker-compose logs`
- Verify ports are not in use: `netstat -tulpn | grep :8001`
- Check firewall: `ufw status`

### SSL certificate issues
- Verify DNS is pointing correctly: `dig pdf.codershive.in`
- Check Nginx config: `nginx -t`
- Review Certbot logs: `journalctl -u certbot.timer`

### Connection refused
- Ensure services are running
- Check firewall rules
- Verify Nginx is proxying correctly

## Security Notes

1. Change default passwords in `.env` files
2. Use strong secret keys for Paperless-ngx
3. Keep system updated: `apt update && apt upgrade`
4. Regularly backup Paperless-ngx data volumes
5. Monitor logs for suspicious activity

## Backup Paperless-ngx

```bash
cd /opt/paperless
docker-compose exec db pg_dump -U paperless paperless > backup_$(date +%Y%m%d).sql
```

## Support

For issues, check:
- Service logs (PM2 or Docker)
- Nginx error logs
- System logs: `journalctl -xe`

