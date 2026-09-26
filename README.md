# Exhaust Manifold Routing Optimization

## Project Overview

This project is an Azure-powered exhaust manifold routing optimization system.

The application allows the user to adjust important exhaust routing parameters such as:

- Pipe Diameter
- Bend Radius
- Number of Bends

The frontend sends these values to an Azure Function API.  
The backend processes the input and returns an optimization score and routing result.

---

## Main Features

- Interactive exhaust manifold routing interface
- Adjustable pipe diameter
- Adjustable bend radius
- Adjustable number of bends
- Dynamic exhaust routing visualization
- Route optimization score
- Azure Function backend integration
- CORS-enabled communication between frontend and backend
- Deployed on Microsoft Azure

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Azure Functions
- HTTP Trigger API

### Cloud Platform

- Microsoft Azure
- Azure Function App
- Azure App Service
- Azure Storage
- Application Insights

### Version Control

- Git
- GitHub

---

## Project Architecture

User  
↓  
React Frontend  
↓  
HTTP POST Request  
↓  
Azure Function API  
↓  
Optimization Logic  
↓  
JSON Response  
↓  
Routing Result Display

---

## Azure Function Endpoint

The frontend communicates with the deployed Azure Function:

```text
https://exhaust-routing-api-2026-brdkd2dsgfgwfmh7.eastasia-01.azurewebsites.net/api/optimizeRoute