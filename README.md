<h1 align="center">Data Visualization Website</h1>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Serverless website hosted on AWS, displaying numerical and sentiment analysis data on the British Premier League.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Usage](#usage)
- [Built Using](#built_using)
- [Screenshots](#screenshots)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
This project was built as part of my assignment in the 'Advanced Web Development with Big Data' module. Project goals included developing a website in the cloud, as opposed to servers, using AWS and introduce new concepts such as WebSockets and Sentiment Analysis.

Numerical data was gathered using online web services. For this project, I made use of [API-Football](https://www.api-football.com/). Data for the sentiment anaylsis was collected via the Twitter API, creating a developer account and retrieving tweets surrounding BPL teams. These were stored within the AWS cloud using DynamoDB as the database.

AWS Comprehend used for sentiment analysis of Twitter data.

Back-end functionalities and data processing implemented using AWS Lambda functions.

Front-end files were uploaded into S3 buckets and hosted within the cloud. 

## 🎈 Usage <a name="usage"></a>
[Link to website](https://cst3130-2022-mahdiahbab.s3.amazonaws.com/public/index.html)

Select one of the five teams to be presented with the data associated with it. Graphs include interactivity and display further information when hovering the mouse over certain parts.

## ⛏️ Built Using <a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [AWS](https://aws.amazon.com/) - Cloud Service
  - [S3](https://aws.amazon.com/s3/)
  - [Lambda](https://aws.amazon.com/lambda/)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - [Comprehend](https://aws.amazon.com/comprehend/)

## 📷 Screenshots <a name = "screenshots"></a>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67860821/187913266-73db1085-c2db-4ab4-a4ba-61273fc670d5.PNG">
</p>

<h3 align="center"><ins>Architecture diagram for Sentiment Analysis</ins></h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67860821/187908823-97313ee6-c0d9-4220-86c3-0a10fc9e6e16.png">
</p>

<h3 align="center"><ins>Architecture diagram for WebSockets</ins></h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67860821/187912065-787b9af1-8a13-4603-b8c2-2c15154e9946.png">
</p>

<h3 align="center"><ins>Architecture diagram for data processing</ins></h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67860821/187912631-f3a1f44a-13ec-4a0d-a769-ba6c7978eb7b.png">
</p>

## ✍️ Authors <a name = "authors"></a>
- [@MahdiA98](https://github.com/MahdiA98)
