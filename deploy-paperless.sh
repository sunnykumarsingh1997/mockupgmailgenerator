#!/bin/bash

# Deploy Paperless-ngx script
# Run from /opt/paperless directory

set -e

PAPERLESS_DIR="/opt/paperless"

echo "🚀 Setting up Paperless-ngx..."

# Create directory if it doesn't exist
mkdir -p ${PAPERLESS_DIR}
cd ${PAPERLESS_DIR}

# Copy docker-compose.yml if not exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found in ${PAPERLESS_DIR}"
    echo "Please copy paperless-docker-compose.yml to ${PAPERLESS_DIR}/docker-compose.yml"
    exit 1
fi

# Generate secret key if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    SECRET_KEY=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 24)
    
    cat > .env << EOF
PAPERLESS_SECRET_KEY=${SECRET_KEY}
PAPERLESS_DB_PASSWORD=${DB_PASSWORD}
EOF
    
    # Update docker-compose.yml with the password
    sed -i "s/PAPERLESS_DBPASS: \${PAPERLESS_DB_PASSWORD:-paperless-password}/PAPERLESS_DBPASS: ${DB_PASSWORD}/" docker-compose.yml
    sed -i "s/POSTGRES_PASSWORD: \${PAPERLESS_DB_PASSWORD:-paperless-password}/POSTGRES_PASSWORD: ${DB_PASSWORD}/" docker-compose.yml
    
    echo "✅ .env file created with generated secrets"
    echo "⚠️  IMPORTANT: Save these credentials securely!"
fi

# Pull latest images
echo "📥 Pulling latest Paperless-ngx images..."
docker-compose pull

# Start services
echo "▶️  Starting Paperless-ngx services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check status
echo "📊 Service status:"
docker-compose ps

echo ""
echo "✅ Paperless-ngx deployment complete!"
echo ""
echo "Next steps:"
echo "1. Create admin user: docker-compose exec webserver createsuperuser"
echo "2. Access Paperless-ngx at: http://localhost:8000 (before SSL)"
echo "3. Configure Nginx and SSL certificates"
echo ""
echo "Useful commands:"
echo "  docker-compose logs -f          - View logs"
echo "  docker-compose restart          - Restart services"
echo "  docker-compose down             - Stop services"
echo "  docker-compose exec webserver createsuperuser - Create admin user"

