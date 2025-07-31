# Resume and Cover Letter Generator

Een professionele meertalige resume en cover letter generator web applicatie met AI-gestuurde content creatie.

## Features

- **Meertalige ondersteuning**: 35+ talen met volledige UI vertalingen
- **AI-gestuurde content**: Gebruikt OpenAI GPT-4o voor professionele document generatie
- **Culturele intelligentie**: Documenten aangepast aan lokale business normen
- **Modern design**: Burgundy, goud en wit kleurenschema
- **Responsive**: Werkt op alle apparaten
- **Live preview**: Zie je document terwijl je het maakt

## Ondersteunde Talen

**Europese talen**: Nederlands, Engels, Frans, Duits, Spaans, Italiaans, Portugees, Russisch, Pools, Zweeds, Noors, Deens, Fins, Turks, Tsjechisch, Hongaars, Roemeens, Bulgaars, Kroatisch, Slovaaks, Sloveens, Ests, Lets, Litouws, Oekraïens

**Aziatische talen**: Chinees (Vereenvoudigd), Japans, Koreaans, Hindi, Thais, Vietnamees, Indonesisch, Maleis

**Midden-Oosten/Afrika**: Arabisch, Hebreeuws

**Aanvullend**: Filipijns/Tagalog

## Technische Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL met Drizzle ORM
- **AI**: OpenAI GPT-4o
- **UI**: Shadcn/ui + Tailwind CSS
- **Styling**: Burgundy, goud en wit thema

## Lokaal Draaien

1. Clone de repository:
```bash
git clone <your-repo-url>
cd resume-generator
```

2. Installeer dependencies:
```bash
npm install
```

3. Configureer environment variabelen:
```bash
cp .env.example .env
# Voeg je OPENAI_API_KEY en DATABASE_URL toe
```

4. Start de applicatie:
```bash
npm run dev
```

De applicatie draait op `http://localhost:5000`

## Deployment

### GitHub Pages
1. Fork deze repository
2. Ga naar Settings > Pages
3. Selecteer "GitHub Actions" als source
4. Voeg je `OPENAI_API_KEY` toe aan repository secrets
5. Push naar main branch voor automatische deployment

### Eigen Server
1. Build de applicatie: `npm run build`
2. Deploy de `dist` folder naar je server
3. Configureer environment variabelen op je server

## Environment Variabelen

- `OPENAI_API_KEY`: Je OpenAI API sleutel
- `DATABASE_URL`: PostgreSQL database URL (optioneel, gebruikt in-memory storage als fallback)
- `NODE_ENV`: development of production

## Project Structuur

```
├── client/                 # Frontend React applicatie
│   ├── src/
│   │   ├── components/     # UI componenten
│   │   ├── pages/         # Pagina componenten
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities en configuratie
├── server/                # Backend Express server
│   ├── services/          # Business logic services
│   └── routes.ts          # API routes
├── shared/                # Gedeelde types en schemas
└── dist/                  # Build output
```

## API Endpoints

- `POST /api/documents` - Genereer een nieuw document
- `GET /api/documents/:id` - Haal een document op
- `GET /api/health` - Health check endpoint

## Contributing

1. Fork de repository
2. Maak een feature branch: `git checkout -b feature/nieuwe-functie`
3. Commit je changes: `git commit -am 'Voeg nieuwe functie toe'`
4. Push naar branch: `git push origin feature/nieuwe-functie`
5. Maak een Pull Request

## Licentie

MIT License - zie LICENSE file voor details.

## Support

Voor vragen of ondersteuning, maak een issue aan in deze repository.