# ABSTRACT

In recent years, artificial intelligence (A.I.) has become an emerging trend in different fields: science, business, medicine, automotive, and education. A.I. has also reached marketing.

The purpose of this project is to collect emails from customers and provide email insights to the marketers. With the recent shift in customers using digital platform to communicate with businesses, it is a challenging task for a business representative to go through all the emails, prioritize them and take necessary actions. Increased email communications not only add complexity, but also reduces the quality of business correspondence to a customer’s enquiry. Some of the customer communication challenges faced by a business, can be overcome with the help of Smart Email Assistant by parsing through the email and extracting interesting objects from an email.
With Smart Email Assistant provides marketers to built better understand their customers by closely monitoring customer email exchanges and by providing email insight dashboard to marketers. Email insight includes keyword selection and categorization, text summarization, sentiment analysis, emotional reaction, entity extraction and taxonomy classification. Smart Email Assistant also provides a context sentence extraction capability for a set of keywords administered by a marketer.
User emails are stored and processed by MailParser inboxes, via a multi-step process which includes, storing, parsing, creating data objects, and invoking a pre- configured webhook dispatch. Parsed email is then sent to AWS Lambda through API Gateway by making a HTTP GET method request, and in response generate insights.

## INTRODUCTION

Often marketers, receive a considerable amount of emails from users, and it is not very easy to track, understand, and take necessary actions to resolve a user's request without understanding the essence of an email. Email in its current form is fundamentally chaotic and difficult to extract from the confines of the inbox – which is what makes Smart Email Assistant.so useful .For example, if an email sent by a user is 200 words long, it would take a marketer minimum of 2 to 3 minutes or longer before taking any action, and thereby reducing a marketer's bandwidth to fewer email correspondences in a day.

### PURPOSE:

The purpose of Smart Email Assistant is to help marketers to do more with less effort and focus on the things that matter most. Smart Email Assistant parse email data fields into sender's from details, sender's to details, email subject, and the actual email body. It allows the marketers to control the keywords they're searching for, and give back features such as keyword occurrence, keyword sentence as a response.
Smart Email Assistant also offers features, such as sentiment analysis, emotional reaction, entity extraction and taxonomy classification with less effort.

#### SCOPE OF PROJECT:

The project covers a wide scope. The emails from the users can be stored
in MailParser and are categorized into original email, parsed email and dispatched webhooks as per the parsing rules. Parsed email is sent to A.W.S. Lambda through API Gateway and in response will give text summary to the marketer. Various list of modules included are:

* Mail Parser Mailbox Module
* Rule Parsing Module
* Parser Webhook API Module
* API Gateway and Lambda Function Module
* Lambda Function and DynamoDB Module
* Smart Email Assistant - Data Analytics Module (Core Functionality)
* Tableau - Data Insight Module

#### HARDWARE AND SOFTWARE SPECIFICATION

Operating system: A.W.S. (Amazon Web Services)
Languages: Node.js, SQL
Software:
* Amazon Web Services (A.W.S.) Lambda
* AWS API Gateway
* A.W.S. CloudWatch
* Mail Parser I/O
* Tableau
* MySQL
* Yonder Labs API

#### SOFTWARE DESCRIPTION

##### AWS Lambda

A.W.S. Lambda - Serverless Compute on Amazon Web Services:
A.W.S. Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying computing resources for you. You can use A.W.S. Lambda to extend other A.W.S. services with custom logic or create your own back-end services that operate at A.W.S. scale, performance, and security.

##### AWS API Gateway

Amazon API Gateway is an A.W.S. service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. API developers can create APIs that access A.W.S. or other web services, as well as data stored in the A.W.S. Cloud. As an API Gateway API developer, you can create APIs for use in your own client applications. Or you can make your APIs available to third-party app developers.

API Gateway creates RESTful APIs that:
* Are HTTP-based.
* Enable stateless client-server communication.
* Implement standard HTTP methods such as G.E.T., POST, P.U.T., PATCH, and
DELETE.

##### AWS CloudWatch

Amazon CloudWatch is a monitoring and management service that provides data and actionable insights for A.W.S., hybrid, and on-premises applications and infrastructure resources. With CloudWatch, you can collect and access all your performance and operational data in form of logs and metrics from a single platform.

#### Mail Parser I/O

Mailparser.io is a data processing and workflow automation SaaS product for small and medium-sized online businesses. It provides powerful and reliable tools for extracting data from incoming emails and attachments and automatically transfers the parsed data to Google Sheets, Excel, your CRM, and hundreds of other third-party APIs. These features can save you plenty of time as you can avoid manual data entry and review while keeping the integrity of the data intact. Mailparser.io can process any kind of recurring email, for example, emails from contact forms, order receipts, etc.

#### Tableau

Tableau Software is an American interactive data visualization software company. The company is currently focused on business intelligence. Tableau products query relational databases, online analytical processing cubes, cloud databases, and spreadsheets to generate graph-type data visualizations. The products can also extract, store, and retrieve data from an in-memory data engine.

Four types of DISC types:

* Dominant
* Inspiring,
* Supportive, and.
* Cautious

##### MySQL

MySQL is a relational database management system based on SQL – Structured Query Language. The application is used for a wide range of purposes, including data warehousing, e-commerce, and logging applications. The most common use for MySQL, however, is for the purpose of a web database.

##### Yonder Labs API

YonderAPI provides access to functionalities developed by Yonder. The following suite of text and image analysis API services can be composed together into a pipeline to solve a variety of problems and create smarter applications and services in different verticals. The following set of API allows for extracting semantic information from Text Documents. 