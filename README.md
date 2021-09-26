# Medius - UET Web Dev Big Project

## Overview
This is the big project for 

Members:
Tung
Quan
Trung
Lam
Bac

## Usage
```
docker-compose up --build
```

---

## Development

### medius-frontend

- To run `medius-frontend` service, first start all other service using `docker-compose.dev.yml`
```
docker-compose -f docker-compose.dev.yml up --scale medius-frontend=0
```

- Then, run the development service
```
cd medius-frontend && npm install && npm start
```

---

### medius-server
- To run `medius-server` service, first start all other service using `docker-compose.dev.yml`
```
docker-compose -f docker-compose.dev.yml up --scale medius-server=0
```

- Install dependencies
```
cd medius-server && pip install -r requirements.txt
```

- For the first time running, run the initial script to generate superadmin user
```
python init_data.py
```

- Run the server
```
uvicorn main:app --reload
```

The server will be up at `http://localhost:8000`

To see the swagger api documentation, navigate to `http://localhost:8000/docs`

The super admin credential will be `vinbdi:Vinbdi@2021`

* Note: medius-server was tested on Python 3.8