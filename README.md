# E-Commerce Project

This is an e-commerce project built using React for the frontend and Django for the backend.

## Demo

Check the demo video: https://youtu.be/ar4tvtEPvwA

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- Python and pip installed on your machine

### Installation

1. Clone the repository:
2. Navigate to the project directory:
   
4. Install frontend dependencies:
  cd frontend
  npm install

5. Install backend dependencies:
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt

### DB Configuration

- The app is using cloud postgresql as well as storege provided by https://supabase.com/

### Enviroment Variables 

- Frontend
  
REACT_APP_SUPABASE_PROJECT_URL=Your supabase project url
REACT_APP_SUPABASE_API_KEY=Your supabase API key
REACT_APP_STORE_NAME=eStore
REACT_APP_STORE_ID=30e9bd84-803a-4fa6-9ad3-3df8fda348c0 (Or the store you create)
REACT_APP_MERCHANT_ID=cbf23843-4ff2-4016-84e8-0740ae552700 (Your store owner)
REACT_APP_BASE_URL_PROD=https://ordable-1.onrender.com/
REACT_APP_BASE_URL_DEV=http://0.0.0.0:8000/

- Backend
  
SUPABASE_DB_HOST='aws-0-ap-south-1.pooler.supabase.com'
SUPABASE_DB_NAME='postgres'
SUPABASE_DB_PORT='5432'
SUPABASE_DB_USER=Your supabase db user
SUPABASE_DB_PASSWORD=Your supabase db password

### Deloyment

- The frontend is deployed to https://ordable-mennah4.vercel.app/
- The backend is deployed to https://ordable-1.onrender.com/

### Running the application

 - Frontend: http://localhost:3000
 - Backend:  http://0.0.0.0:8000

