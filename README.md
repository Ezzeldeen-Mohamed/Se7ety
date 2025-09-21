# 🏥 Se7ty - Smart Healthcare Application (Backend)

## 📌 Overview
**Se7ty** is a smart healthcare mobile application backend designed to provide **simple home healthcare services** through local pharmacies.  
The platform helps patients (especially elderly and people with basic health needs) easily access reliable services such as:

- Blood pressure & sugar measurement  
- Injections  
- Steam sessions for children  
- Initial consultations to determine the case  

The system works like **Uber-style booking** where the user selects a service, chooses a nearby pharmacy with pricing, and confirms the request.

---

## 🎯 Vision & Future Roadmap
- Subscription model for pharmacies  
- AI-powered prescription analysis  
- Insurance integration  
- Web platform for doctors  
- Partnerships with labs & home visits  
- IoT integration (connected pressure devices)  
- Emergency service with on-duty pharmacies  

---

## 🏗️ Architecture
The backend is built following **Clean Architecture (Onion Architecture)** principles:

- **Domain Layer** → Core entities & business rules  
- **Application Layer** → DTOs, services, use-cases  
- **Infrastructure Layer** → EF Core, SQL Server, repositories  
- **API Layer** → RESTful APIs, authentication, controllers  

### 🔹 Key Features
- Authentication & Authorization using **JWT (Access & Refresh Tokens)**  
- Pharmacy & User management with role-based access  
- Service booking system with pricing & availability  
- Reviews & ratings system  
- Real-time notifications (via SignalR or Firebase later)  
- Soft Delete & Global Query Filters  
- Reports exportable to **Excel / PDF**  
- Background jobs with **Hangfire** (e.g., auto-expire bookings, weekly reports)  
- Custom Middleware for exception handling & logging  
- Unit & Integration tests  

---

## ⚙️ Tech Stack
- **ASP.NET Core 8**  
- **Entity Framework Core** + SQL Server  
- **Clean Architecture / Onion Architecture**  
- **Generic Repository Pattern** + Service Layer  
- **JWT Authentication & Refresh Tokens**  
- **Hangfire** for background jobs  
- **Stored Procedures** for advanced DB operations  
- **Automapper** for mapping Entities ↔ DTOs  
- **Serilog** for logging  
- **xUnit / NUnit** for unit & integration testing  

