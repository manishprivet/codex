---
title: "Web Server Deployment Using Nginx and Docker"
date: "2020-08-18"
---

### Prerequisites

An Ubuntu 18.04 server

1. Firewall rules allowing ssh on port 22, HTTP on port 80 and HTTPS on port 443 access

2. A static Public IP for the server

3. A root password for the server as it will be needed in few steps (If you use an Access Key to SSH into the server, just use `sudo passwd <YOUR USERNAME>` to create a new one)

4. Ability to SSH into the server

5. An Account on Docker Hub with a private repository created (You can use any registry, just look up the instructions to do `docker login`.

### SSH Into the Server

### Install Docker

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
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
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
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

6. Generate new token You should get a screen like this. Copy the code somewhere safe and accessible and close the dialog box.

### Login to Docker Hub

Login to Docker Hub on your server

```bash
docker --login username <USERNAME> # Replace <USERNAME> with your Docker Hub username
```

### Make the `docker-compose.yml` file

```bash
cd ~
touch docker-compose.yml
nano docker-compose.yml
```

Paste the Following

```yml
version: "3"

services:
  frontend:
    image: manishprivet/admin-dashboard:frontend # Docker Image of Frontend App
    container_name: frontend
    ports:
      - "8000:80" # Replace 80 with your container port

  backend:
    image: manishprivet/admin-dashboard:backend # Docker Image of Backend App
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

```nginx
worker_processes 1;

events {
  worker_connections 1024;
}

http {

  client_max_body_size 10M;

  server {

    client_max_body_size 10M;
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
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

#### Install CertBot

```bash
sudo certbot --nginx
```

Enter all the follow up inputs required while generating certificate.

#### Test Automatic Renewal

```bash
sudo certbot renew --dry-run
```

#### Confirm that HTTPS is active now

Go to the your domain in your browser, and click on the Padlock to verify that the certificate issued is by LetsEncrypt.

> References: [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)
