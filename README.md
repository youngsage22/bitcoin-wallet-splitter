# Bitcoin Wallet Splitter

A modern web application that receives Bitcoin into a master wallet and automatically distributes it across 5 different recipient wallets.

## ✨ Features

- 🔐 Secure Bitcoin wallet management
- 💰 Receive BTC into a master wallet
- 🔄 Distribute funds to 5 recipient wallets
- ⚙️ Real-time configuration
- 📊 Transaction tracking and history
- 🌐 Modern responsive web interface
- 🐳 Docker support for easy deployment

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for fast development
- React Router for navigation
- Axios for API calls

**Backend:**
- Node.js with Express
- TypeScript
- Bitcoin.js library
- PostgreSQL database

**Infrastructure:**
- Docker & Docker Compose
- Multi-container orchestration

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (recommended) or Node.js 18+
- Git

### Installation & Running

**Using Docker (Easiest):**
```bash
# Clone repository
git clone https://github.com/youngsage22/bitcoin-wallet-splitter.git
cd bitcoin-wallet-splitter

# Start all services
docker-compose up

# Open in browser
http://localhost:3000
```

**Without Docker:**

*Backend:*
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

*Frontend (new terminal):*
```bash
cd frontend
npm install
npm run dev
```

## 📱 Usage

### Dashboard
- View master wallet address
- Check current Bitcoin balance
- Quick status overview

### Configuration
- Add up to 5 recipient Bitcoin addresses
- Set distribution percentages (must total 100%)
- Save configuration

### Transactions
- View all historical transactions
- Track transaction status (pending/confirmed/failed)
- Real-time updates

## 🔌 API Endpoints

### Wallet
- `GET /api/wallet/master` - Get master wallet
- `GET /api/wallet/balance/:address` - Get wallet balance
- `POST /api/wallet/validate` - Validate Bitcoin address

### Transactions
- `POST /api/transactions/send` - Send transaction to recipients
- `GET /api/transactions/history` - Get transaction history
- `GET /api/transactions/:txId` - Get transaction details

### Configuration
- `GET /api/config/recipients` - Get recipient addresses
- `POST /api/config/recipients` - Save recipient addresses
- `POST /api/config/distribution` - Save distribution percentages

## 🐳 Docker Services

```
bitcoin-wallet-splitter/
├── Frontend (React)     -> http://localhost:3000
├── Backend (Express)    -> http://localhost:5000
└── Database (PostgreSQL)-> localhost:5432
```

## 📝 Environment Variables

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
BITCOIN_NETWORK=testnet
BITCOIN_RPC_URL=http://localhost:18332
BITCOIN_RPC_USER=user
BITCOIN_RPC_PASSWORD=password
DATABASE_URL=postgresql://user:password@localhost:5432/bitcoin_splitter
BLOCKCHAIN_API_KEY=your_api_key
```

## 🔒 Security

- Private keys never stored in version control
- Environment variables for sensitive data
- CORS enabled for frontend-backend communication
- Input validation on all endpoints
- Test on Bitcoin testnet before mainnet

## 📦 Project Structure

```
bitcoin-wallet-splitter/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 Development

**Build Backend:**
```bash
cd backend
npm run build
```

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Run Tests:**
```bash
cd backend
npm test
```

## 📚 Learn More

- [Bitcoin.js Documentation](https://github.com/bitcoinjs/bitcoinjs-lib)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Docker Documentation](https://docs.docker.com)

## ⚠️ Disclaimer

This is a development tool. Always test thoroughly on Bitcoin testnet before using with real Bitcoin. The developers are not responsible for any loss of funds.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ by [youngsage22](https://github.com/youngsage22)

---

**Need Help?**
- Open an issue on GitHub
- Check the documentation
- Review API endpoints
