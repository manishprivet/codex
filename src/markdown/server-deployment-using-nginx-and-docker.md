---
title: "Web Server Deployment Using Nginx and Docker"
date: "2021-03-15"
description: "Want to quickly deploy a server on a virtual machine, but also want the flexibility of Docker and it's CI/CD Benefits? This is a guide to deploy a server quickly on a Virtual Machine using Nginx, Docker and Docker-Compose, along with HTTPS using Certbot, all while making it eligible to extend the configuration with CI/CD"
ogImage: "https://ik.imagekit.io/codex/docker_nginx_XcQ4X_LW9b.png?tr=w-1200,h-630,fo-auto"
---

![Post Image](https://ik.imagekit.io/codex/docker_nginx_XcQ4X_LW9b.png?tr=w-1200,h-630,fo-auto)

Before we start, there are definitely some prerequisites regarding this.

### Prerequisites

An Ubuntu 20.04 server

1. Firewall rules allowing ssh on port 22, HTTP on port 80 and HTTPS on port 443 access

2. A static Public IP for the server

3. Ability to SSH into the server

4. A root password for the server as it will be needed in few steps
    * (If you use an Private Key (.pem file) to SSH into the server, SSH into the server and use `sudo passwd <YOUR USERNAME>` to create a new password)

5. An Account on Docker Hub with a private repository created (You can use any registry, just look up the instructions to do `docker login`.

### SSH Into the Server

### Install Docker

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
```

#### Update the package database for Docker and Make sure you are about to install from the Docker repo instead of the default Ubuntu repo

```bash
apt-cache policy docker-ce
```

#### Finally install and check if Docker daemon is running

```bash
sudo apt install docker-ce
sudo systemctl status docker
```

#### Give docker command sudo privileges

```bash
sudo usermod -aG docker ${USER}
su - ${USER} # Password will be needed in this step
```

#### Confirm that you're in the docker group

```bash
id -nG
```

> References: [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)

### Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

> References: [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)

### Get access token from Docker Hub

1. Login to Docker Hub

2. Go to Account Settings

3. Go to Security

4. Click on New Access Token

5. Give your token a name

6. Generate new token and copy it somewhere safe and accessible and close the dialog box.

### Login to Docker Hub

Login to Docker Hub on your server

```bash
docker --login username <USERNAME> # Replace <USERNAME> with your Docker Hub username
```

### Make the docker-compose.yml file

```bash
cd ~
touch docker-compose.yml
nano docker-compose.yml
```

Paste the Following
_Do note that you can change the number of services according to your preference_

```yml
version: "3"

services:
  frontend:
    image: dockerhubusername/webapp:frontend # Docker Image of Frontend App
    container_name: frontend
    ports:
      - "8000:80" # Replace 80 with your container port

  backend:
    image: dockerhubusername/webapp:backend # Docker Image of Backend App
    container_name: backend
    ports:
      - "9000:80" # Replace 80 with your container port
```

### Setup Nginx

#### Install Nginx

```bash
sudo apt update
sudo apt install nginx
```

#### Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Edit conf file for basic http server

```bash
sudo rm /etc/nginx/nginx.conf
sudo touch /etc/nginx/nginx.conf
sudo nano /etc/nginx/nginx.conf
```

#### Paste the following Configuration
_Here also you've to keep the number of services in mind. If you're using only one container, remove the `/api` block_

```nginx
worker_processes 1;

events {
  worker_connections 1024;
}

http {
  client_max_body_size 10M; # Maximum size a request can have
  server {
    client_max_body_size 10M; # Configure both values according to your application

    server_name subdomain.domain.com; # Domain name for the server

    # Pass all /api calls to backend

    location /api {
      client_max_body_size 10M;
      proxy_pass http://localhost:9000;
    }

    location / {
      client_max_body_size 10M;
      proxy_pass http://localhost:8000;
    }
  }
}
```

#### Restart Nginx

```bash
sudo systemctl restart nginx
```

### Starting the HTTP Server

```bash
docker-compose pull && docker-compose up -d
```

### Setup your Domain

**Enter the Public IP of your server in the DNS records of your Domain name as A Record, and your website should be up and running with HTTP on the domain.**

### Setting Up HTTPS and SSL with LetsEncrypt and CertBot

#### Install Prerequisites

```bash
sudo snap install certbot
```

#### Install CertBot

```bash
sudo certbot --nginx -d subdomain.domain.com
```

Enter all the follow up inputs required while generating certificate.

#### Test Automatic Renewal

```bash
sudo certbot renew --dry-run
```

#### Confirm that HTTPS is active now

Go to the your domain in your browser, and click on the Padlock to verify that the certificate issued is by LetsEncrypt.

> References: [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)
