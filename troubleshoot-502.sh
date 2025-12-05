#!/bin/bash

# Troubleshooting script for 502 Bad Gateway error
# Run this on your VPS

echo "🔍 Troubleshooting 502 Bad Gateway error..."
echo ""

# Check if PM2 service is running
echo "1. Checking PM2 service status..."
pm2 list
echo ""

# Check if port 8001 is listening
echo "2. Checking if port 8001 is listening..."
netstat -tulpn | grep :8001 || ss -tulpn | grep :8001
echo ""

# Check PM2 logs
echo "3. Checking PM2 logs for statement-unlocker..."
pm2 logs statement-unlocker --lines 20 --nostream
echo ""

# Check if the service is actually running
echo "4. Testing local connection to port 8001..."
curl -I http://localhost:8001 2>&1 | head -5
echo ""

# Check Nginx error logs
echo "5. Checking Nginx error logs..."
tail -20 /var/log/nginx/error.log
echo ""

# Check if the build directory exists
echo "6. Checking if dist directory exists..."
if [ -d "/opt/unlocker/dist" ]; then
    echo "✅ dist directory exists"
    ls -la /opt/unlocker/dist/ | head -10
else
    echo "❌ dist directory not found!"
fi
echo ""

# Check package.json for preview script
echo "7. Checking package.json for preview script..."
if [ -f "/opt/unlocker/package.json" ]; then
    grep -A 2 '"preview"' /opt/unlocker/package.json || echo "No preview script found"
else
    echo "❌ package.json not found"
fi
echo ""

echo "📋 Summary:"
echo "If PM2 shows the service as 'errored' or 'stopped', try:"
echo "  pm2 restart statement-unlocker"
echo "  pm2 logs statement-unlocker"
echo ""
echo "If port 8001 is not listening, the service may not have started correctly."
echo "Check the PM2 logs above for errors."

