'use strict';//not to use undeclared variables

var mysql = require('mysql');//pkg
var request = require("request");//pkg

var eventRequest = null;//fut

var emailSentences = null;//fut

// server:Receives the request and handles response for the API Call
//event-request,context-invocation information,callback-response/err/promise
exports.handler = function(event, context, callback) {

    event = JSON.parse(JSON.stringify(event))
    event = JSON.parse(event.body);
    eventRequest = event;
    callAPI();//fnc


    // Generate a greeting
    let greeting = "Good Morning";
   console.info(event);
   console.info(event.id);

    // convert the email body into lower case for keyword comparison

    if (event.body_of_email != null) {

        // Email Sentence Array
        //data cleaning-noise removal
        var sentenceEmailBody = event.body_of_email;
        //regular exp for replacing "  to ' to avoid confusion to the compiler.
        sentenceEmailBody = sentenceEmailBody.replace(/\"/g, "'");

        //console.info(sentenceEmailBody);

        emailSentences = sentenceEmailBody.split(/(?<=(?:\/|\.|\?|!))/);//body splitted into each sentence array


        event.body_of_email = event.body_of_email.toLowerCase();//data preparation for keyword table comaprsion
        event.body_of_email = event.body_of_email.replace("\"", "'");//replacing \ to null

        // Store the email into an array of sentences. Used for adding 2 sentences for each keyword occurence
        // Regex to capture sentences ending with .,?,!

        var sentenceSplitRegex = new RegExp(`[.?!]`, 'g');//g- global search
        // removes extra dot's in an email
        event.body_of_email = event.body_of_email.replace(/[.]{2,}/g, ".");//replace ... to .

        // 1. Generate update statement for email table
        var sqlQuery2 = updateEmail(event);//fut 
        var connection = invokeConnection();//fut

        // 2. Invoke the sql connection and update email table
        connection.query(sqlQuery2, function(error, results, fields) {
            if (error) {
                connection.destroy();
                throw error;
            }
            else {
                callback(error, results);
                connection.end();
            }
        });

        // 3a. Query the keyword table and invoke a parse email function
        // 3a. Generates the keyword count
        // 3b. Generate Multi SQL query for all keywords
        queryKeyword(event);


    }
    else {
        greeting = "Oops, Please try again :-)   ";
        console.info("CONSOLE ERROR: Empty Email Body");
        console.info("Email Parser ID = " + event.id);
        console.info("Email MailBox ID = " + event.mail_box_id);
    }

    var responseBody = {
        "key3": "value3",
        "key2": "value2",
        "key1": "value1"
    };

    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    callback(null, response);
};

/*
 * Function to generate the Email SQL Update statement based off the request from mailbox parser
 * Returns - SQL query
 */
function updateEmail(event) {

    var email_parser_id = event.id == null ? 911 : event.id;
    var email_mailbox_id = event.mail_box_id == null ? 911 : event.mail_box_id;
    var email_date = event.date == null ? 911 : event.date;
    var email_subject = event.mail_subject == null ? 911 : event.mail_subject.replace(/\"/g, "'");
    var email_from = event.forwarded_from_address == null ? 911 : event.forwarded_from_address;
    var email_to = event.forwarded_to_address == null ? 911 : event.forwarded_to_address;
    var email_body = event.body_of_email == null ? 911 : event.body_of_email.replace(/\"/g, "'");
    var queryEmailSummary = "insert into `email` VALUES (\"" + email_parser_id + "\", \"" + email_mailbox_id + "\", \"" + email_date + "\", \"" + email_subject + "\", \"" + email_from + "\", \"" + email_to + "\", \"" + email_body + "\");";

    console.info("Email Parser ID = " + email_parser_id);
    console.info("Email MailBox ID = " + email_mailbox_id);

    return queryEmailSummary;
}

/*
 * a. Function to query the keyword table and parse the body of the email to count word occurences
 * b. Genrates a SQL statement for each keyword for which an occurence value is greater than 0
 * c. Invokes the updateCountTable function to update the count for each keyword occurence
 */
async function queryKeyword(event) {
    var insertQuery = "";

    var connection1 = invokeConnection();

    connection1.query("select * from keyword", function(error, results) {
        if (error) {
            connection1.destroy();
            throw error;
        }
        else {

            //getting current date and time
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;


            // Checking each keyword against the body of the email
            var keyword;
            var i = 0;
            //console.info("Inside here");
            for (keyword of results) {
                i++;
                var re = new RegExp(`\\b${keyword.keyword_text}\\b`, 'gi');//re to check globally from keywords table to email body
                var count = event.body_of_email.match(re);//matches re with email body
                if (count != null) {
                    var sentenceValue = "";
                    var k = 1;

                    for (var j = 0; j < emailSentences.length; j++) {
                        if (emailSentences[j].match(re) != null) {


                            //console.info(keyword.keyword_text);

                            var sentence2Split = emailSentences[j].split(re);
                            var sentence1 = emailSentences[j - 1] = undefined ? "----" : emailSentences[j - 1];
                            var sentence2 = sentence2Split[0];
                            var sentence3 = sentence2Split[1];
                            var sentence4 = emailSentences[j + 1] == undefined ? "----" : emailSentences[j + 1];


                            insertQuery += "insert into `count` VALUES (\"" + event.id + "\", \"" + event.date + "\", \"" + keyword.keyword_id + "\", \"" + keyword.keyword_designator + "\", \"" + keyword.keyword_text + "\", \"" + keyword.keyword_word_group + "\", \"" + dateTime + "\", \"" + dateTime + "\", \"" + event.id.substring(0, 5) + Math.floor(Math.random() * 1000) + "\", \"" + k + "\", \"" + sentence1 + "\", \"" + sentence2 + "\", \"" + sentence3 + "\", \"" + sentence4 + "\");\n";
                            k++;

                        }
                    }
                }
                if (i == results.length) {

                    var insertEmptyQuery = "insert into `count` VALUES (\"" + event.id + "\", \"" + event.date + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + dateTime + "\", \"" + dateTime + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\", \"" + "911" + "\");\n";
                    insertQuery = insertQuery == "" ? insertEmptyQuery : insertQuery;
                    updateCountTable(insertQuery);
                }
            }



            connection1.end();
        }
    });
}


/*
 * Updates the count table with keyword occurence count
 */

function updateCountTable(insertQuery) {
    // Creating a Multi Statement AWS RDS Connection object
    var connection2 = invokeConnection();
    connection2.query(insertQuery, function(error, results, fields) {
        if (error) {
            connection2.destroy();
            throw error;
        }
        else {
            connection2.end();
        }
    });
}


/*
 * Function to make a new connection to AWS RDS
 */

function invokeConnection() {
    // Creating a Multi Statement AWS RDS Connection object
    var conn = mysql.createConnection({
        host: "smartemail.cqugwibhbf4m.us-east-2.rds.amazonaws.com",
        user: "admin",
        password: "adminadmin",
        database: "smartemail",
        multipleStatements: true
    });
    return conn;
}


async function callAPI() {

    if (eventRequest.body_of_email != null) {
        eventRequest.body_of_email = eventRequest.body_of_email.replace("\"", "'");
        var test = eventRequest.body_of_email;

        var options = {
            method: 'POST',
            url: 'https://api.yonderlabs.com/1.0/text/allsingletext/fromText',
            qs: {
                nwords: '100',
                taxonomy: 'news-en',
                levels_taxonomy: '1',
                limit_taxonomy: '3',
                limit_entity: '10',
                limit_keyword: '12',
                limit_concept: '10',
                access_token: 'c1670c6a69e03d055bde5975c98dd7ef3188fe0cfd35dac62d30d488100904a5'
            },
            formData: { text: test }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            yonderQuery(body);
        });
    }else{
        console.info("CONSOLE ERROR: Yonder Empty Email Body");
        console.info("Email Parser ID = " + eventRequest.id);
        console.info("Email MailBox ID = " + eventRequest.mail_box_id);
    }
}

function yonderQuery(body) {

    var yResult = JSON.parse(body);

    // Emotional Reaction
    var emotionQuery = "";
    var emotion = yResult.reactions;
    for (var emt of emotion) {
        emotionQuery += "insert into email_emotion values (\"" + eventRequest.id + "\",\"" + emt.reaction + "\", \"" + emt.score + "\", \"" + eventRequest.id.substring(0, 5) + Math.floor(Math.random() * 9999) + "\");\n";
    }

    // Concept Tagging
    var tags = yResult.tags;
    var tagQuery = "";
    for (var tag of tags) {
        tagQuery += "insert into email_tags values (\"" + eventRequest.id + "\", \"" + tag + "\", \"" + eventRequest.id.substring(0, 5) + Math.floor(Math.random() * 9999) + "\");\n";
    }

    // Taxonomy Classification
    var topics = yResult.topics;
    var topicQuery = "";
    for (var topic of topics) {
        topicQuery += "insert into email_taxonomy values (\"" + eventRequest.id + "\", \"" + topic.category + "\",\"" + topic.score + "\", \"" + eventRequest.id.substring(0, 5) + Math.floor(Math.random() * 9999) + "\");\n";
    }

    // Keywords Extraction
    var keywords = yResult.keywords;
    var keywordQuery = "";
    for (var keyword of keywords) {
        keywordQuery += "insert into email_keywords values (\"" + eventRequest.id + "\", \"" + keyword.name + "\",\"" + keyword.score + "\", \"" + eventRequest.id.substring(0, 5) + Math.floor(Math.random() * 9999) + "\");\n";
    }

    // Sentiment Analysis
    var sentiment = yResult.sentiment;
    var sentimentQuery = "insert into email_sentiment values (\"" + eventRequest.id + "\", \"" + sentiment + "\");\n";

    // Text Summarization
    var summary = yResult.summary;
    summary = summary.replace(/\"/g, "'");
    summary = summary.replace(/\”/g, "'");
    var summaryQuery = "insert into email_summary values (\"" + eventRequest.id + "\", \"" + summary + "\");\n";

    // Multi
    var entities = yResult.entities;
    var entitiesQuery = "";
    for (var entity of entities) {
        if (entity.info != null) {
            entitiesQuery += "insert into email_entities values (\"" + eventRequest.id + "\", \"" + entity.type + "\",\"" + entity.name + "\",\"" + entity.score + "\", \"" + eventRequest.id.substring(0, 5) + Math.floor(Math.random() * 9999) + "\");\n";
        }
    }

    var yondeFinalQuery = emotionQuery + tagQuery + topicQuery + sentimentQuery + keywordQuery + summaryQuery + entitiesQuery;
    //console.info(yondeFinalQuery);

    // Creating a Multi Statement AWS RDS Connection object
    var connection3 = invokeConnection();
    connection3.query(yondeFinalQuery, function(error, results, fields) {
        if (error) {
            connection3.destroy();
            throw error;
        }
        else {
            connection3.end();
        }
    });
}
