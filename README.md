# Card Game API - Complete Documentation

![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Docker](https://img.shields.io/badge/Docker-20.10+-blue)
![REST API](https://img.shields.io/badge/REST-API-brightgreen)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview

A TypeScript-based card game API that allows:
- Creation of standard or custom card decks
- Deck manipulation (shuffling, drawing cards)
- RESTful endpoints for game operations
- Containerized deployment with Docker

## Features

- **Deck Management**:
  - Create standard 52-card decks
  - Build custom decks with specific cards
  - Shuffle decks on creation

- **Game Operations**:
  - Draw multiple cards from a deck
  - Check remaining cards
  - View complete deck contents

- **Technical Highlights**:
  - Type-safe TypeScript implementation
  - SOLID principles compliant
  - Containerized with multi-stage Docker builds
  - Production-ready health checks
  - Comprehensive error handling

## System Architecture

```
card-game-api/
├── src/
│   ├── models/        # Domain entities
│   ├── services/      # Business logic
│   ├── controllers/   # API endpoints
│   ├── interfaces/    # Type definitions
│   └── app.ts         # Application entry
├── tests/             # Unit/integration tests
├── Dockerfile         # Production container setup
├── docker-compose.yml # Multi-service orchestration
└── package.json       # Dependencies and scripts
```
```
## Prerequisites

- Node.js 18.x
- npm 9.x or yarn 1.22+
- Docker 20.10+
- Docker Compose 2.12+

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/card-game-api.git
cd card-game-api
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Access at: `http://localhost:3000`

### Production Build
```bash
npm run build && npm start
```

### Using Docker
```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f card-api
```


## API Documentation

### Base URL
`http://localhost:3000`

### Endpoints

Here's the complete API documentation with all endpoints, including cURL commands and example outputs:

## API Documentation

### Base URL
`http://localhost:3000`

---

### 1. Create a New Deck

#### Standard Deck (Unshuffled)
```bash
curl -X POST "http://localhost:3000/decks"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "deckId": "3a8f5c2b-1d4e-6g7h-9i0j-k1l2m3n4o5p6",
    "shuffled": false,
    "remaining": 52
  }
}
```

#### Shuffled Standard Deck
```bash
curl -X POST "http://localhost:3000/decks?shuffled=true"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "deckId": "5b6c7d8e-9f0g-1h2i-3j4k-l5m6n7o8p9q",
    "shuffled": true,
    "remaining": 52
  }
}
```

#### Partial Deck (Specific Cards)
```bash
curl -X POST "http://localhost:3000/decks?cards=AS,KD,AC,2C,KH"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "deckId": "2c3d4e5f-6g7h-8i9j-0k1l-m2n3o4p5q6r",
    "shuffled": false,
    "remaining": 5
  }
}
```
#### Partial Deck (Specific Suffled Cards)
```bash
curl -X POST "http://localhost:3000/decks?shuffled=true&cards=AS,KD,AC,2C,KH"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "deckId": "2c3d4e5f-6g7h-8i9j-0k1l-m2n3o4p5q6r",
    "shuffled": true,
    "remaining": 5
  }
}
```
---

### 2. Open a Deck

```bash
curl -X GET "http://localhost:3000/decks/3a8f5c2b-1d4e-6g7h-9i0j-k1l2m3n4o5p6"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "deckId": "3a8f5c2b-1d4e-6g7h-9i0j-k1l2m3n4o5p6",
    "shuffled": false,
    "remaining": 52,
    "cards": [
      {"suit": "S", "rank": "A"},
      {"suit": "S", "rank": "2"},
      {"suit": "S", "rank": "3"},
      ... (all 52 cards in order)
    ]
  }
}
```

---

### 3. Draw Cards from Deck

```bash
curl -X POST "http://localhost:3000/decks/3a8f5c2b-1d4e-6g7h-9i0j-k1l2m3n4o5p6/draw?count=3"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "cards": [
      {"suit": "S", "rank": "A"},
      {"suit": "S", "rank": "2"},
      {"suit": "S", "rank": "3"}
    ]
  }
}
```

---

### 5. Error Cases

#### Invalid Deck ID
```bash
curl -X GET "http://localhost:3000/decks/invalid-id"
```

**Response**:
```json
{
  "success": false,
  "error": "Deck not found",
  "code": "NOT_FOUND"
}
```

#### Draw Too Many Cards
```bash
curl -X POST "http://localhost:3000/decks/3a8f5c2b-1d4e-6g7h-9i0j-k1l2m3n4o5p6/draw?count=60"
```

**Response**:
```json
{
  "success": false,
  "error": "Not enough cards remaining (requested: 60, available: 49)",
  "code": "INSUFFICIENT_CARDS"
}
```

#### Invalid Card Codes
```bash
curl -X POST "http://localhost:3000/decks?cards=AS,XX,AC"
```

**Response**:
```json
{
  "success": false,
  "error": "Invalid card code: XX",
  "code": "INVALID_CARD_CODE"
}
```

----

## Deployment

### Docker Production
```bash
docker build -t card-game-api .
docker run -p 3000:3000 -d card-game-api
```

### Kubernetes (example)
```bash
kubectl apply -f deployment.yaml
```

### Cloud Deployment
1. Build and push to container registry
2. Deploy using your cloud provider's container service


## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Maintainer**: Nitish kumar  
**Contact**: nitishofficial78@gmail.com 
**Version**: 1.0.0  
**Last Updated**: 2025-05-10