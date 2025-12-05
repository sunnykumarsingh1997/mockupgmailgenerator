#!/bin/bash

# Quick fix script for 502 Bad Gateway
# Run this on your VPS: bash fix-502-error.sh

set -e

echo "🔧 Fixing 502 Bad Gateway error..."
echo ""

cd /opt/unlocker

# Check if service exists in PM2
if pm2 list | grep -q "statement-unlocker"; then
    echo "🛑 Stopping existing service..."
    pm2 stop statement-unlocker || true
    pm2 delete statement-unlocker || true
fi

# Make sure dist directory exists
if [ ! -d "dist" ]; then
    echo "🔨 Building application..."
    npm run build
fi

# Create/update PM2 config with explicit vite command
echo "📝 Creating PM2 configuration..."
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'statement-unlocker',
    script: 'npx',
    args: 'vite preview --host 0.0.0.0 --port 8001',
    cwd: '/opt/unlocker',
    interpreter: 'none',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: '8001',
      HOST: '0.0.0.0'
    }
  }]
};
EOF

# Start service
echo "▶️  Starting service..."
pm2 start ecosystem.config.cjs
pm2 save

# Wait a moment
sleep 3

# Check status
echo ""
echo "📊 Service status:"
pm2 status

# Test connection
echo ""
echo "🧪 Testing local connection..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8001 | grep -q "200\|301\|302"; then
    echo "✅ Service is responding on port 8001!"
else
    echo "❌ Service is not responding. Check logs:"
    pm2 logs statement-unlocker --lines 30 --nostream
fi

echo ""
echo "✅ Fix complete!"
echo "Check logs with: pm2 logs statement-unlocker"

