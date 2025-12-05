#!/bin/bash

# Setup script for Statement Unlocker service
# Run this from /opt/unlocker directory

set -e

APP_DIR="/opt/unlocker"
SERVICE_NAME="statement-unlocker"
PORT=8001

echo "🚀 Setting up Statement Unlocker service..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the unlocker directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if backend exists
if [ -d "backend-unlocker" ]; then
    echo "🔧 Setting up backend..."
    cd backend-unlocker
    
    if [ -f "requirements.txt" ]; then
        echo "📦 Creating Python virtual environment..."
        python3 -m venv venv
        
        echo "📥 Installing Python dependencies..."
        source venv/bin/activate
        pip install --upgrade pip
        pip install -r requirements.txt
        deactivate
        
        echo "✅ Backend dependencies installed in virtual environment"
    fi
    
    # Create backend service (if needed)
    # You may need to adjust this based on your backend setup
    cd ..
fi

# Create PM2 ecosystem file
echo "📝 Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '${SERVICE_NAME}',
    script: 'npm',
    args: 'run preview',
    cwd: '${APP_DIR}',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: ${PORT}
    }
  }]
};
EOF

# Start with PM2
echo "▶️  Starting service with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Statement Unlocker service setup complete!"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check service status"
echo "  pm2 logs ${SERVICE_NAME}  - View logs"
echo "  pm2 restart ${SERVICE_NAME} - Restart service"
echo "  pm2 stop ${SERVICE_NAME}   - Stop service"

