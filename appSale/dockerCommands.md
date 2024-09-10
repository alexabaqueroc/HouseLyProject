Here is a list of useful Docker commands along with explanations of what they do. These commands will help you manage
images, containers, and networks more effectively.

### 1. **`docker ps`**

- **Description**: Lists the currently running containers.
- **Usage**:
  ```bash
  docker ps
  ```
- **Options**:
    - `-a`: Shows all containers, including stopped ones.

### 2. **`docker images`**

- **Description**: Lists all available Docker images on your system.
- **Usage**:
  ```bash
  docker images
  ```

### 3. **`docker pull <image_name>`**

- **Description**: Downloads a Docker image from the Docker Hub registry.
- **Usage**:
  ```bash
  docker pull python:3.8
  ```

### 4. **`docker build -t <image_name> .`**

- **Description**: Builds a Docker image from a `Dockerfile` in the current directory.
- **Usage**:
  ```bash
  docker build -t myapp .
  ```

### 5. **`docker run <image_name>`**

- **Description**: Runs a container based on a Docker image.
- **Usage**:
  ```bash
  docker run myapp
  ```
- **Options**:
    - `-d`: Run the container in the background (detached mode).
    - `-p 8000:8000`: Map port 8000 on the host to port 8000 on the container.
    - `-it`: Run the container interactively (for shells).

### 6. **`docker exec -it <container_name> bash`**

- **Description**: Opens an interactive shell inside a running container.
- **Usage**:
  ```bash
  docker exec -it my_container bash
  ```

### 7. **`docker stop <container_name>`**

- **Description**: Stops a running container.
- **Usage**:
  ```bash
  docker stop my_container
  ```

### 8. **`docker start <container_name>`**

- **Description**: Starts a stopped container.
- **Usage**:
  ```bash
  docker start my_container
  ```

### 9. **`docker rm <container_name>`**

- **Description**: Removes a stopped container.
- **Usage**:
  ```bash
  docker rm my_container
  ```

### 10. **`docker rmi <image_name>`**

- **Description**: Removes an unused Docker image.
- **Usage**:
  ```bash
  docker rmi my_image
  ```

### 11. **`docker logs <container_name>`**

- **Description**: Shows logs of a running (or stopped) container.
- **Usage**:
  ```bash
  docker logs my_container
  ```

### 12. **`docker-compose up`**

- **Description**: Starts all services defined in a `docker-compose.yml` file.
- **Usage**:
  ```bash
  docker-compose up
  ```
- **Options**:
    - `-d`: Runs services in detached mode.

### 13. **`docker-compose down`**

- **Description**: Stops and removes all services defined in a `docker-compose.yml` file.
- **Usage**:
  ```bash
  docker-compose down
  ```

### 14. **`docker-compose build`**

- **Description**: Builds the services defined in a `docker-compose.yml` file.
- **Usage**:
  ```bash
  docker-compose build
  ```

### 15. **`docker-compose ps`**

- **Description**: Lists the containers started by `docker-compose`.
- **Usage**:
  ```bash
  docker-compose ps
  ```

### 16. **`docker-compose logs`**

- **Description**: Shows logs from all services managed by `docker-compose`.
- **Usage**:
  ```bash
  docker-compose logs
  ```

### 17. **`docker volume ls`**

- **Description**: Lists all Docker volumes.
- **Usage**:
  ```bash
  docker volume ls
  ```

### 18. **`docker network ls`**

- **Description**: Lists all Docker networks.
- **Usage**:
  ```bash
  docker network ls
  ```

### 19. **`docker stats`**

- **Description**: Displays live performance statistics (CPU, memory, etc.) for running containers.
- **Usage**:
  ```bash
  docker stats
  ```

### 20. **`docker inspect <container_name_or_id>`**

- **Description**: Displays detailed information about a container or image (configuration, networking, etc.).
- **Usage**:
  ```bash
  docker inspect my_container
  ```

### 21. **`docker system prune`**

- **Description**: Cleans up unused Docker containers, images, networks, and volumes.
- **Usage**:
  ```bash
  docker system prune
  ```

### 22. **`docker commit <container_id> <image_name>`**

- **Description**: Creates a new image from a container’s changes.
- **Usage**:
  ```bash
  docker commit my_container my_new_image
  ```

### 23. **`docker tag <image_id> <repository_name>:<tag>`**

- **Description**: Tags an image to a repository for pushing to Docker Hub.
- **Usage**:
  ```bash
  docker tag image_id myrepo/myimage:latest
  ```

### 24. **`docker push <repository_name>:<tag>`**

- **Description**: Pushes a tagged image to Docker Hub or another registry.
- **Usage**:
  ```bash
  docker push myrepo/myimage:latest
  ```

### 25. **`docker pull <repository_name>:<tag>`**

- **Description**: Pulls an image from Docker Hub or another registry.
- **Usage**:
  ```bash
  docker pull myrepo/myimage:latest
  ```

### 26. **`docker attach <container_name>`**

- **Description**: Attach to a running container’s terminal.
- **Usage**:
  ```bash
  docker attach my_container
  ```

These commands should help you manage Docker containers, images, volumes, and networks efficiently. Let me know if you
need any more information about any of these commands!
