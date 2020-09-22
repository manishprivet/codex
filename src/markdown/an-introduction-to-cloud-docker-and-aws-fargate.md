---
title: "An introduction to Cloud, Docker and AWS Fargate"
date: "2020-08-20"
description: "Cloud technology provides us with Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Whether you’re a system admin and server administrator, who wants to manage his/her own barebones server or an awesome developer who just wants to write the code and deploy it to the world with every push, the cloud has you covered."
ogImage: "https://ik.imagekit.io/codex/cloud_fWYl1I_glm.png?tr=w-1200,h-630,fo-auto"
---

![Cloud](https://ik.imagekit.io/codex/cloud_fWYl1I_glm.png?tr=w-1200,h-630,fo-auto)

Technology is at pace with a rate that’s faster than ever. You take a break for one month, and boom, ten new tools, and 100 new frameworks are currently in trend you have no idea about. But there’s one thing that’s required for any tool or language or framework to work or deployed is the underlying hardware. Most of us can’t afford the hardware to set up for small startups. That’s the problem that cloud solves.
The below section is an introduction about cloud and serverless functions, so if you know about them, you can skip that.

---

Cloud technology provides us with Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Whether you’re a system admin and server administrator, who wants to manage his/her own barebones server or an awesome developer who just wants to write the code and deploy it to the world with every push, the cloud has you covered.

Cloud isn’t free, there are costs, but it’s very very less than the costs incurring in managing your own hardware and Infrastructure. Out of all the cloud services, a game-changer service emerged in recent years, Function as a Service (FaaS). It lets you run your app functions in the cloud without a server, that’s why the name serverless, and costs only for the number of times the function is called. FaaS has been a game-changer since now developers don’t have to worry about setting up and managing virtual computers or instances in the cloud. They can split their code in various microservices and run them independently, leading to better code and faster debugging.

---

Various companies around the world provide cloud services, but the leading top 3 companies are Amazon, Microsoft, and Google. Among the 3, as of now, Amazon holds a whopping 32.4% market share. And there’s a reason for that. AWS provides a very tight and integrated environment, with all the services you’ll ever need, but they also come up with new services every now and then that you thought you didn’t need.

At this point, maybe you need an introduction to Docker and Docker Compose. If you know them already, you can skip to the next section.

---

Docker is a revolutionary technology that lets you run your applications in a container. Now you ask what a container is? Containers are basically little virtual instances inside a server that contains an app and it’s dependencies, nothing else. There’re two significant technologies when it comes to containers, Docker and Kubernetes. Both can run containers independently or together. Kubernetes is out of scope for this blog, so we’ll talk about Docker only. With Docker, you can build your containers as images. Also, if you have multiple containers, you can run them simultaneously by the use of Docker Compose.

Enough with the mumbo jumbo. If you have come this far, first of all, a huge thanks to you, since this is my first blog 😅.

---

Now, if you have your node app ready to serve some awesome websites, you can either run it on a server directly or ship it in a Docker image. A Docker image will ensure that your application will run the same no matter where it runs.

All major cloud providers provide a Container Registry, which is basically a repository to store your Docker images. AWS also provides one. It’s called Elastic Container Registry or ECR. ECR is part of a bigger service by AWS, ECS, Elastic Container Service. ECS lets you push your containers to the ECR, and then run those containers on the cloud with the help of Task Definitions. A Task Definition is basically a set of rules that define how the container will be connected to the outside world, or how two or more containers will be connected to each other. The task definitions then run the containers on an ECS Cluster, which is a service provided by AWS to launch and manage clusters easily and scale them when needed.

ECS Clusters are of two types, Fargate and EC2. An EC2 instance is basically a virtual computer located on the cloud on which you have full control. An EC2 cluster lets you provision an EC2 instance according to your needs. It provides you full control over your EC2 instance, the container deployment model. But we’re not here to talk about EC2 clusters.

---

We’re here to talk about Fargate, a service provided by AWS, which lets you run your containers on the cloud, serverless. With Fargate, you don’t need to provision or maintain any instance. And unlike EC2, and you pay only for the amount of CPU and RAM usage by your application. This comes with some caveats, but often the benefits provided by Fargate outweigh them.

For a nodejs application, AWS Fargate proves to be a better choice by all means, as you don’t need to worry about managing any server. And if you’re just starting, the costs are also minimal at the start.
AWS provides a 12 month free trial for its various services, but keep in mind that Fargate doesn’t come under the free trial.
