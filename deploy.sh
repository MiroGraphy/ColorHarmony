#!/bin/bash

# Deployment script for resume generator
echo "🚀 Starting deployment process..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.example .env
    echo "Please edit .env file with your actual values before continuing!"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 To start the production server:"
    echo "   npm start"
    echo ""
    echo "🐳 To run with Docker:"
    echo "   docker-compose up -d"
    echo ""
    echo "📋 Make sure these environment variables are set:"
    echo "   - OPENAI_API_KEY (required)"
    echo "   - DATABASE_URL (optional, uses in-memory if not set)"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi