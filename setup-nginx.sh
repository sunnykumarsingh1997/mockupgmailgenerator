#!/bin/bash

# Setup Nginx configuration for both services
# Run as root: sudo bash setup-nginx.sh

set -e

echo "🌐 Setting up Nginx configuration..."

# Copy Nginx configs
echo "📝 Copying Nginx configuration files..."

if [ -f "nginx-pdf.codershive.in.conf" ]; then
    cp nginx-pdf.codershive.in.conf /etc/nginx/sites-available/pdf.codershive.in
    echo "✅ Copied pdf.codershive.in config"
else
    echo "❌ Error: nginx-pdf.codershive.in.conf not found"
    exit 1
fi

if [ -f "nginx-docs.codershive.in.conf" ]; then
    cp nginx-docs.codershive.in.conf /etc/nginx/sites-available/docs.codershive.in
    echo "✅ Copied docs.codershive.in config"
else
    echo "❌ Error: nginx-docs.codershive.in.conf not found"
    exit 1
fi

# Enable sites
echo "🔗 Enabling sites..."
ln -sf /etc/nginx/sites-available/pdf.codershive.in /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/docs.codershive.in /etc/nginx/sites-enabled/

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    echo "✅ Nginx reloaded successfully"
else
    echo "❌ Nginx configuration test failed. Please fix errors above."
    exit 1
fi

echo ""
echo "✅ Nginx setup complete!"
echo ""
echo "Next steps:"
echo "1. Update DNS records:"
echo "   - pdf.codershive.in → 213.136.74.135"
echo "   - docs.codershive.in → 213.136.74.135"
echo ""
echo "2. After DNS propagation, run SSL setup:"
echo "   certbot --nginx -d pdf.codershive.in"
echo "   certbot --nginx -d docs.codershive.in"

