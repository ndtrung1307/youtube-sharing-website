# YouTube Sharing Website

This project is a YouTube sharing website built with React and backed by a Nestjs server. It allows users to share YouTube videos and receive notifications when new videos are shared.

URL: https://youtube-sharing-website.onrender.com/

## Deployment

Application is deployed on OnRender and config trigger hook at `develop` branch. App run as Container and configured in `DockerFile`. Parameters are configured directly on OnRender project setting.
This application is using Free Package for cost saving purpose. It caused Cold Start problem if server is inactive for a while and It takes from 50 seconds to some minutes to start at first time.

Note: Trigger [Backend API docs](https://youtube-sharing-api.onrender.com/swagger) before open React App is help us to prevent unexpected timeout issue.

## Quick Start with Docker Compose

To quickly start this project using Docker Compose, follow these steps:

### Prerequisites

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)
- Backend API already started at port 3000

### Steps

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/ndtrung1307/youtube-sharing-website.git
   cd youtube-sharing-website
   ```

2. Build and Run the Docker Containers:
   Use Docker Compose to build and run the containers:
   ```sh
   docker-compose up --build
   ```
3. Access the Application:
   Open your web browser and navigate to http://localhost:3001 to access the application.

## Project Structure

- `src/`: Contains the source code for the React application.
- `public/`: Contains the public assets and the index.html file.
- `nginx.conf`: Custom Nginx configuration file.
- `Dockerfile`: Dockerfile to build the Docker image.
- `docker-compose.yml`: Docker Compose configuration file.
