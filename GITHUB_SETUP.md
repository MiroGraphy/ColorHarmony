# GitHub Deployment Setup Guide

Deze gids laat je zien hoe je de Resume Generator op GitHub kunt deployen.

## 🚀 Snelle Setup

### 1. Repository Setup
```bash
# Fork deze repository naar je eigen GitHub account
# Of clone en push naar een nieuwe repository:
git clone <this-repo>
cd resume-generator
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. GitHub Secrets Configureren
1. Ga naar je repository op GitHub
2. Klik op **Settings** > **Secrets and variables** > **Actions**
3. Voeg deze secrets toe:
   - `OPENAI_API_KEY`: Je OpenAI API sleutel

### 3. GitHub Pages Activeren (Frontend Only)
1. Ga naar **Settings** > **Pages**
2. Onder "Source", selecteer **"GitHub Actions"**
3. Push naar main branch - deployment start automatisch

## 📋 Deployment Opties

### Option A: GitHub Pages (Gratis)
- ✅ Gratis hosting
- ✅ Automatische HTTPS
- ✅ Werkt met fallback document generatie
- ❌ Alleen frontend (geen database)
- 🌐 URL: `https://yourusername.github.io/repository-name`

### Option B: Docker Container (Full Stack)
- ✅ Volledige backend + database
- ✅ Schaalbaar
- ✅ Werkt met alle hosting providers
- 💰 Hosting kosten vereist
- 🐳 Image: `ghcr.io/yourusername/repository-name`

### Option C: Eigen Server
```bash
# Clone repository
git clone https://github.com/yourusername/repository-name.git
cd repository-name

# Configureer environment
cp .env.example .env
# Edit .env met je API keys

# Deploy
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Environment Variables

### Verplicht
- `OPENAI_API_KEY`: Voor AI document generatie

### Optioneel
- `DATABASE_URL`: PostgreSQL database (gebruikt in-memory storage als niet ingesteld)
- `NODE_ENV`: production/development

## 🐳 Docker Deployment

### Met Docker Compose
```bash
# Clone repository
git clone https://github.com/yourusername/repository-name.git
cd repository-name

# Configureer environment
cp .env.example .env
# Edit .env met je waardes

# Start services
docker-compose up -d
```

### Alleen Docker
```bash
# Build image
docker build -t resume-generator .

# Run container
docker run -d \
  -p 5000:5000 \
  -e OPENAI_API_KEY=your_key_here \
  --name resume-generator \
  resume-generator
```

## 📊 Monitoring

### Health Check
```bash
curl https://your-deployment-url/api/health
```

### Logs
```bash
# Docker
docker logs resume-generator

# Docker Compose
docker-compose logs app
```

## 🔄 Updates

### Automatisch (GitHub Actions)
- Push naar main branch
- GitHub Actions bouwt en deployed automatisch

### Handmatig
```bash
git pull origin main
npm run build
npm start
```

## ❓ Troubleshooting

### Build Fails
- Controleer of alle environment variables zijn ingesteld
- Controleer Node.js versie (20+ vereist)
- Controleer TypeScript errors: `npm run check`

### OpenAI API Issues
- Controleer of `OPENAI_API_KEY` correct is ingesteld
- App gebruikt fallback generatie als API niet beschikbaar is

### Database Issues
- PostgreSQL is optioneel - app werkt met in-memory storage
- Voor productie: gebruik `DATABASE_URL` environment variable

## 📞 Support

Voor hulp:
1. Controleer [README.md](./README.md) voor algemene informatie
2. Maak een GitHub Issue voor bugs
3. Controleer GitHub Actions logs voor deployment problemen