# Medical Appointment Service

A full-stack application for booking and managing medical appointments.  
Built with **Spring Boot (backend)**, **React (frontend)**, and **PostgreSQL**.

Built with the tools and technologies:

`JSON` • `Markdown` • `Spring` • `npm` • `JavaScript` • `React`  
`Docker` • `XML` • `PostgreSQL` • `Axios` • `styled-components` • `YAML`

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Databse](#database)
- [Credentials](#credentials)

---
## Overview

**Medical_Appointment_Service** is a comprehensive platform designed to streamline healthcare scheduling and management for developers building medical systems.  
It integrates a secure backend with a dynamic, role-based frontend, supporting seamless communication between patients and healthcare providers.


## Features
- User authentication (patients, doctors, admin)
- Book, confirm, and cancel appointments
- Role-based actions:
  - Patients can book and cancel appointments
  - Doctors can confirm appointments
  - Admins can manage users
- Email notifications (via Mailhog for testing)

---

## Requirements
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Installation 

Clone the repository:
```bash
git clone https://github.com/chalatsis2004/Medical_Appointment_Service
cd Medical_Appointment_Service
```
Build and start the service:
```
docker-compose up --build
```
This will start:
- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- MailHog: (fake SMTP for dev): http://localhost:8025
- PostgreSQL: http://localhost:5432 (if enabled)

## Databse 

This project requires a PostgreSQL database.
- If you already have Postgres running, update the backend’s application.properties with your DB connection.
- If not, you can use the provided Docker Compose service.

In docker-compose.yml, the db service is commented out by default.
To use it:
- Uncomment the db service section.
- Update the backend service environment variables if needed (or keep defaults).

Example db service:
```
  db:
    image: postgres:15
    container_name: db
    environment:
      POSTGRES_DB: medical_appointments
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
```
Then restart with: 
```
docker-compose up --build
```

## Credentials
When the application starts, you can sign up via the frontend.
Default roles available:
- ROLE_ADMIN
- ROLE_PATIENT
- ROLE_DOCTOR

Default user (for testing):
- Username: admin1
- Password: admin123
