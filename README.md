# Location Tracker App

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**Location Tracker App** is a real-time web application to request, broadcast, and track active location streams using WebSockets, Node.js, and MongoDB. The application manages active tracking sessions and seamlessly visualizes real-world mapping points in real time.

## ✨ Features
- **Real-Time Websockets:** Ultra-fast, bidirectional event-based communication utilizing `ws`.
- **Location Storage:** All location requests are securely persisted and actively managed via MongoDB.
- **REST APIs:** Full integration with backend routing controllers to handle user acceptances and map generations.

## 🛠️ Built With
- **Frontend Scripting:** Vanilla JS interfacing closely with Socket APIs.
- **Backend Setup:** Node.js, Express.js
- **Database Architecture:** MongoDB cluster & Mongoose.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Local or Cloud MongoDB Instance (e.g., MongoDB Atlas)

### Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/2k33cse992574/location-tracker.git
   cd location-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy carefully crafted `.env.example` to your own `.env` configuration file to prevent secrets from leaking into Git.
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to insert your MongoDB connection URI and running Port.*

4. Launch the application:
   ```bash
   npm start
   ```

## 📝 License
This project is open-source.
