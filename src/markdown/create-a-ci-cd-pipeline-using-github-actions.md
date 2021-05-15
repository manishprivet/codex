---
title: "Create a CI/CD Pipeling using Github Actions"
date: "2021-05-15"
description: "Deployed a server? But updating the deployment manually is a pain, but also is managing complex CI/CD platforms like Jenkins of Spinnaker. Here we'll take a look at creating a simple CI/CD flow using Github Actions"
ogImage: "https://ik.imagekit.io/codex/1_8VdPrEsCILorO5uHJYMUOg_JkeUc57I2.png?tr=w-1200,h-630,fo-auto"
---

![Post Image](https://ik.imagekit.io/codex/1_8VdPrEsCILorO5uHJYMUOg_JkeUc57I2.png?tr=w-1200,h-630,fo-auto)

In the previous [post](/server-deployment-using-nginx-and-docker) we saw how to deploy Docker Container(s) on a Virtual Machine using Nginx and Docker Hub, and setup SSL and HTTPS using Certbot. In this post we'll see how we can setup a Github Actions workflow, which will deploy our server every time there's a push on the master/main branch. We'll also see how we can configure the release process, and how we can write different pipelines for different branches.

### Prerequisites

1. Public IP of the server (Make sure it's a reserved/elastic IP address so that we can use it on a permanent basis)
2. Private Key (`.pem`) file that is used to SSH into the server

### Setting up Repository Secrets

Along with Github Actions, Github provides a nice feature called *Secrets*, in which you can store and encrypt sensitive data on a repository/organization level. We'll utilize this to store our **Docker Hub** Credentials and the Private Key for server access.

#### Go to Repository Settings

![image](https://user-images.githubusercontent.com/54291836/118348443-ff097180-b567-11eb-82de-3104c312253c.png)

#### Look for the Secrets tab

![image](https://user-images.githubusercontent.com/54291836/118348456-1b0d1300-b568-11eb-9300-7fb9c9cbe3aa.png)

#### Click on Add Repository Secret

![image](https://user-images.githubusercontent.com/54291836/118348467-2bbd8900-b568-11eb-8d52-d70a5565fed0.png)

#### Give your secret a name and a secret value
and click on the `Add Secret` button to save it

![image](https://user-images.githubusercontent.com/54291836/118348513-78a15f80-b568-11eb-838f-997f47d61d92.png)

Similarly add your Docker Hub Access Token that we generated in the previous post as `DOCKER_PASSWORD` and the content of the Private Key as `PRIVATE_KEY`.
At the end, your repository should have these three secrets:
1. `DOCKER_USERNAME`
2. `DOCKER_PASSWORD`
3. `PRIVATE_KEY`

### Create a new yml file for our CI/CD workflow
In Github Actions, we've to create a `.yml` file for each workflow we want to have in our repositories. You can create a workflow on your repository page on Github.com directly by going to the `Actions` tab, and utilize one of the many preconfigured templates by Github according to our use case.
But here, we'll create a workflow configuration from scratch just to understand every part of it.

#### Create a new folder `.github` in the root directory of your project, and inside it create a `workflow` directory

#### Writing the script

Create a new file called `deploy.yml` (You can name it anything you want)

Now, we want our workflow to trigger on every push on the master branch. So add this part on the top of the yml file.

```yml
name: Deploy App
on:
  push:
    branches:
      - master
```

But sometimes, we want to have more control on the deployment trigger. For deployments to be triggered manually, we can configure the workflow to run on every release, which has to be created manually.

```yml
name: Deploy App
on:
  release:
    types: [created]
```

Next up, we've to define `jobs` that the workflow will run. In this case, we only have one job, i.e., `deploy`

Add this in the `deploy.yml` file

```yml
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
```

Here, we're giving our job a name of **Deploy** which will run on an Ubuntu Virtual Instance.

Next up, we'll add `steps` that our job will perform. Here we've three steps, `checkout`, `build` and `deploy`. The `checkout` step is necessary as it will pull our code on the Ubuntu Instance. Then, we first build our image and push it to Docker Hub, and the `deploy` step will SSH into our server and, the latest image from Docker Hub and update our App.

```yml
    steps:
      - name: Checkout
        uses: actions/checkout@v2
```
> Indentions matter a lot in a yml file. So make sure that the script is correctly indented according to the final code given at the end of the article.

```yml
      - name: Push to Docker Hub
        uses: docker/build-push-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          repository: <DOCKER_HUB_USERNAME>/<DOCKER_HUB_REPO>
          tags: <IMAGE_TAG>
```

Here, we are using a premade Github Action provide by docker itself, which takes away the hassle of writing the scripts of building and pushing an image. Do note that you can find many such helpful actions on Github Marketplace which you can use in your own workflow.

Also, make sure to replace `<DOCKER_HUB_USERNAME>` and `<DOCKER_HUB_REPO>` with your username and repository name on Docker Hub. Replace `<IMAGE_TAG>` with the tag you want to give to the image. Let's suppose this image is the production image, so you can give it a tag of `prod`. And, if you're deploying both Backend and Frontend on the same server, you can specify the tag `frontend` or `backend` accordingly. Do note that in the previous [post](/server-deployment-using-nginx-and-docker) we've specified these tags in the `docker-compose.yml` file.

Next up, we'll write the steps to SSH into the server, pull the latest image and update the server.

```yml
      - name: Setup key
        id: setup-key
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
        run: |
          echo "$PRIVATE_KEY" >> $HOME/key.pem
          chmod 400 $HOME/key.pem
      - name: Update image on server
        run: ssh -i $HOME/key.pem -o StrictHostKeyChecking=no ubuntu@<SERVER_IP> 'docker-compose pull && docker-compose up -d && docker image prune -a -f'
```

Here, in the first step, we're converting the `PRIVATE_KEY` into a private `.pem` file for it to be usable in the `ssh` command.

After that, we're SSHing into the server and giving it three commands to run.

To pull the latest image(s)
```bash
docker-compose pull
```

To update the deployment
```bash
docker-compose up -d
```

and finally, to delete unused old containers
```bash
docker image prune -a -f
```

Make sure to replace `<SERVER_IP>` with your VM's Public IPv4 IP Address.

Once this final step succeeds, our workflow will be complete, and we'll have our latest code up and running on the server without any hassle.

Our final `deploy.yml` file should look like this

```yml
name: Deploy App
on:
  push:
    branches:
      - master

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Push to Docker Hub
        uses: docker/build-push-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          repository: <DOCKER_HUB_USERNAME>/<DOCKER_HUB_REPO>
          tags: <IMAGE_TAG>

      - name: Setup key
        id: setup-key
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
        run: |
          echo "$PRIVATE_KEY" >> $HOME/key.pem
          chmod 400 $HOME/key.pem
      - name: Update image on server
        run: ssh -i $HOME/key.pem -o StrictHostKeyChecking=no ubuntu@<SERVER_IP> 'docker-compose pull && docker-compose up -d && docker image prune -a -f'
```

Once you push the deployment script on the main/master branch of your repo, you can see the Deployment in action in the Actions tab. After the deployment is finished, it should look something like this.

![image](https://user-images.githubusercontent.com/54291836/118349472-81952f80-b56e-11eb-8f80-66e0163806a4.png)

Thank you for reaching at the end of the post. If you liked it, please share it among your network. If you found any errors/discrepenceies, you can contact me any time on my [mail](mailto:me@manishk.dev) or fill the contact form on my [Portfolio](https://manishk.dev), and I'll get back to you.
