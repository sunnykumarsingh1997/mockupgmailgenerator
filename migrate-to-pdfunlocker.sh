#!/bin/bash

# Migration script: Remove old mstools app and install pdfunlocker3rddecember
# Run as root or with sudo: bash migrate-to-pdfunlocker.sh

set -e

APP_DIR="/opt/unlocker"
SERVICE_NAME="statement-unlocker"
PORT=8001
NEW_REPO="https://github.com/sunnykumarsingh1997/pdfunlocker3rddecember.git"

echo "🔄 Migrating to pdfunlocker3rddecember..."
echo ""

# Step 1: Stop and remove PM2 service
echo "1️⃣  Stopping and removing old PM2 service..."
if pm2 list | grep -q "$SERVICE_NAME"; then
    pm2 stop "$SERVICE_NAME" || true
    pm2 delete "$SERVICE_NAME" || true
    echo "✅ Old service stopped and removed"
else
    echo "ℹ️  No existing PM2 service found"
fi

# Step 2: Backup old directory (optional safety measure)
if [ -d "$APP_DIR" ]; then
    echo "2️⃣  Backing up old installation..."
    BACKUP_DIR="${APP_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
    mv "$APP_DIR" "$BACKUP_DIR"
    echo "✅ Old installation backed up to: $BACKUP_DIR"
    echo "   (You can delete this later if everything works)"
else
    echo "ℹ️  No existing installation found"
fi

# Step 3: Clone new repository
echo "3️⃣  Cloning new repository..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"
git clone "$NEW_REPO" .

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to clone repository"
    echo "   Make sure the repository exists and is accessible"
    exit 1
fi

echo "✅ Repository cloned successfully"

# Step 4: Install dependencies
echo "4️⃣  Installing dependencies..."
if [ -f "package.json" ]; then
    npm install
    echo "✅ Dependencies installed"
else
    echo "⚠️  Warning: package.json not found. Skipping npm install."
fi

# Step 5: Build application
echo "5️⃣  Building application..."
if [ -f "package.json" ] && grep -q '"build"' package.json; then
    npm run build
    echo "✅ Application built"
else
    echo "⚠️  Warning: No build script found. Skipping build."
fi

# Step 6: Setup backend if exists
if [ -d "backend-unlocker" ]; then
    echo "6️⃣  Setting up backend..."
    cd backend-unlocker
    
    if [ -f "requirements.txt" ]; then
        echo "📦 Creating Python virtual environment..."
        python3 -m venv venv
        
        echo "📥 Installing Python dependencies..."
        source venv/bin/activate
        pip install --upgrade pip
        pip install -r requirements.txt
        deactivate
        
        echo "✅ Backend dependencies installed"
    fi
    
    cd ..
fi

# Step 7: Create PM2 configuration
echo "7️⃣  Creating PM2 configuration..."
cat > ecosystem.config.cjs << EOF
module.exports = {
  apps: [{
    name: '${SERVICE_NAME}',
    script: 'npx',
    args: 'vite preview --host 0.0.0.0 --port ${PORT}',
    cwd: '${APP_DIR}',
    interpreter: 'none',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: '${PORT}',
      HOST: '0.0.0.0'
    }
  }]
};
EOF

# Step 8: Start service with PM2
echo "8️⃣  Starting service with PM2..."
pm2 start ecosystem.config.cjs
pm2 save

# Wait a moment for service to start
sleep 3

# Step 9: Verify service is running
echo "9️⃣  Verifying service..."
pm2 status

# Test connection
echo ""
echo "🧪 Testing local connection..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT} | grep -q "200\|301\|302"; then
    echo "✅ Service is responding on port ${PORT}!"
else
    echo "⚠️  Service may not be responding yet. Check logs:"
    echo "   pm2 logs ${SERVICE_NAME}"
fi

echo ""
echo "✅ Migration complete!"
echo ""
echo "📋 Summary:"
echo "   - Old app backed up to: ${BACKUP_DIR:-N/A}"
echo "   - New app installed at: ${APP_DIR}"
echo "   - Service name: ${SERVICE_NAME}"
echo "   - Port: ${PORT}"
echo ""
echo "📝 Next steps:"
echo "   1. Check service logs: pm2 logs ${SERVICE_NAME}"
echo "   2. Test the site: https://pdf.codershive.in"
echo "   3. If everything works, you can delete the backup: rm -rf ${BACKUP_DIR:-N/A}"
echo ""
echo "🔧 Useful commands:"
echo "   pm2 status              - Check service status"
echo "   pm2 logs ${SERVICE_NAME}    - View logs"
echo "   pm2 restart ${SERVICE_NAME} - Restart service"
echo "   pm2 stop ${SERVICE_NAME}    - Stop service"

