#!/bin/env node

var Twit = require('twit');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var restify = require('restify');

// auth for tweet stream
var T = new Twit({
	    consumer_key:         process.env.twitter_consumer_key
	  , consumer_secret:      process.env.twitter_consumer_secret
	  , access_token:         process.env.twitter_access_token
	  , access_token_secret:  process.env.twitter_access_token_secret
	})

// parameterized requests
var r6p = '<SOAP-ENV:Envelope xmlns:m="urn:ActionWebService" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">  <SOAP-ENV:Body>    <VmProvisionRequest xmlns="urn:ActionWebService">      <version xsi:type="xsd:string">1.1</version><templateFields xsi:type="xsd:string">name=CFME_PGSQL_RHEL64_v2|request_type=template|guid=b5314e6c-ab23-11e3-a745-22000a0d8347</templateFields><vmFields xsi:type="xsd:string">vm_name=changeme|customization_template_id=1000000000008|instance_type=1000000000001|placement_auto=false|guest_access_key_pair=1000000000003|placement_availability_zone=1000000000001|security_groups=1000000000003|src_ems_id=1000000000001</vmFields><requester xsi:type="xsd:string">"user_name=admin|owner_last_name=ServiceNOW|owner_first_name=ServiceNOW|owner_email=ServiceNOW@evm.com</requester><tags xsi:type="xsd:string">retirement=12|show=summit</tags><options xsi:type="m:VmdbwsSupport..ProvisionOptions">      <values xsi:type="xsd:string"></values>      <ems_custom_attributes xsi:type="xsd:string"></ems_custom_attributes><miq_custom_attributes xsi:type="xsd:string">color=%COLOR%|application=postgresql|tweeter=%TWITTER_USERNAME%|summit_user_passwd=rirm1234|tweet_id=%TWEET_ID%</miq_custom_attributes></options>    </VmProvisionRequest>  </SOAP-ENV:Body></SOAP-ENV:Envelope>';
var r6m = '<SOAP-ENV:Envelope xmlns:m="urn:ActionWebService" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">  <SOAP-ENV:Body>    <VmProvisionRequest xmlns="urn:ActionWebService">      <version xsi:type="xsd:string">1.1</version><templateFields xsi:type="xsd:string">name=CFME_MYSQL_RHEL64_v2|request_type=template|guid=b552b994-ab23-11e3-a745-22000a0d8347</templateFields><vmFields xsi:type="xsd:string">vm_name=changeme|customization_template_id=1000000000008|instance_type=1000000000001|placement_auto=false|guest_access_key_pair=1000000000003|placement_availability_zone=1000000000001|security_groups=1000000000003|src_ems_id=1000000000001</vmFields><requester xsi:type="xsd:string">"user_name=admin|owner_last_name=ServiceNOW|owner_first_name=ServiceNOW|owner_email=ServiceNOW@evm.com</requester><tags xsi:type="xsd:string">retirement=12|show=summit</tags><options xsi:type="m:VmdbwsSupport..ProvisionOptions">      <values xsi:type="xsd:string"></values>      <ems_custom_attributes xsi:type="xsd:string"></ems_custom_attributes><miq_custom_attributes xsi:type="xsd:string">color=%COLOR%|application=postgresql|tweeter=%TWITTER_USERNAME%|summit_user_passwd=rirm1234|tweet_id=%TWEET_ID%</miq_custom_attributes></options>    </VmProvisionRequest>  </SOAP-ENV:Body></SOAP-ENV:Envelope>';
var r7p = '<SOAP-ENV:Envelope xmlns:m="urn:ActionWebService" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">  <SOAP-ENV:Body>    <VmProvisionRequest xmlns="urn:ActionWebService">      <version xsi:type="xsd:string">1.1</version><templateFields xsi:type="xsd:string">name=CFME_PGSQL_RHEL7_V2|request_type=template|guid=f7c0262e-b8aa-11e3-9aac-22000a0d8347</templateFields><vmFields xsi:type="xsd:string">vm_name=changeme|customization_template_id=1000000000008|instance_type=1000000000009|placement_auto=false|guest_access_key_pair=1000000000003|placement_availability_zone=1000000000001|security_groups=1000000000003|src_ems_id=1000000000001</vmFields><requester xsi:type="xsd:string">"user_name=admin|owner_last_name=ServiceNOW|owner_first_name=ServiceNOW|owner_email=ServiceNOW@evm.com</requester><tags xsi:type="xsd:string">retirement=12|show=summit</tags><options xsi:type="m:VmdbwsSupport..ProvisionOptions">      <values xsi:type="xsd:string"></values>      <ems_custom_attributes xsi:type="xsd:string"></ems_custom_attributes><miq_custom_attributes xsi:type="xsd:string">color=%COLOR%|application=postgresql|tweeter=%TWITTER_USERNAME%|summit_user_passwd=rirm1234|tweet_id=%TWEET_ID%</miq_custom_attributes></options>    </VmProvisionRequest>  </SOAP-ENV:Body></SOAP-ENV:Envelope>';
var r7m = '<SOAP-ENV:Envelope xmlns:m="urn:ActionWebService" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">  <SOAP-ENV:Body>    <VmProvisionRequest xmlns="urn:ActionWebService">      <version xsi:type="xsd:string">1.1</version><templateFields xsi:type="xsd:string">name=CFME_MYSQL_RHEL7_V2|request_type=template|guid=f7e6a45c-b8aa-11e3-9aac-22000a0d8347</templateFields><vmFields xsi:type="xsd:string">vm_name=changeme|customization_template_id=1000000000008|instance_type=1000000000009|placement_auto=false|guest_access_key_pair=1000000000003|placement_availability_zone=1000000000001|security_groups=1000000000003|src_ems_id=1000000000001</vmFields><requester xsi:type="xsd:string">"user_name=admin|owner_last_name=ServiceNOW|owner_first_name=ServiceNOW|owner_email=ServiceNOW@evm.com</requester><tags xsi:type="xsd:string">retirement=12|show=summit</tags><options xsi:type="m:VmdbwsSupport..ProvisionOptions">      <values xsi:type="xsd:string"></values>      <ems_custom_attributes xsi:type="xsd:string"></ems_custom_attributes><miq_custom_attributes xsi:type="xsd:string">color=%COLOR%|application=postgresql|tweeter=%TWITTER_USERNAME%|summit_user_passwd=rirm1234|tweet_id=%TWEET_ID%</miq_custom_attributes></options>    </VmProvisionRequest>  </SOAP-ENV:Body></SOAP-ENV:Envelope>';

// provision function that makes webservice call to cfme
function provision(request){
	var options = {
		    host: process.env.cfme_url,
		    path: "/vmdbws/api",
		    port: 443,
		    method: "POST",
		    Connection: "Keep-Alive",
		    rejectUnauthorized: false,
		    requestCert: true,
		    agent: false,
		    headers: {
		    	'Accept-Encoding': 'gzip,deflate',
		        'Cookie': "cookie",
		        'Content-Type': 'text/xml;charset=UTF-8',
		        'Content-Length': Buffer.byteLength(request),
		        'Authorization': 'Basic ' + new Buffer(process.env.cfme_user+":"+process.env.cfme_pass).toString('base64'), 
		        'SOAPAction' : '/vmdbws/wsdl/VMProvisionRequest'
		    }
	};
	
	var req = https.request(options, function(res)    {
		var buffer = '';
		console.log("Status Code:" + res.statusCode);
		res.on("data", function(data) { 
			buffer += data;
		});
		res.on("end", function() { 
			util.puts('Buffer' + '\n');
			util.puts(buffer);
		});

	});

	req.on("error", function(er)  { console.log("Error:" + '\n' +  er) } );
	req.write(request);
	req.end();
	
}

function getcolor(text){
	if (((text.toLowerCase().indexOf("#blue")) != -1)){
		return "blue";		
	} else if (((text.toLowerCase().indexOf("#red")) != -1)){
		return "red";
	} else if (((text.toLowerCase().indexOf("#pink")) != -1)){
		return "pink";
	} else if (((text.toLowerCase().indexOf("#yellow")) != -1)){
		return "yellow";
	} else if (((text.toLowerCase().indexOf("#green")) != -1)){
		return "green";
	} else if (((text.toLowerCase().indexOf("#orange")) != -1)){
		return "orange";
	} else if (((text.toLowerCase().indexOf("#purple")) != -1)){
		return "purple";
	} else if (((text.toLowerCase().indexOf("#black")) != -1)){
		return "black";
	}  else{
		return "black";	
	}
}

// helper to replace param values in request
function buildRequest(request, username, color, id){
	request = request.replace("%TWITTER_USERNAME%", username);
	request = request.replace("%COLOR%", color);
	request = request.replace("%TWEET_ID%", id);
	return request;
}

// giddyup
console.log("starting engines");

var stream = T.stream('statuses/filter', { track: '#cloudforms2014'})

stream.on('tweet', function (tweet) {
	console.log("Got request. id: "+tweet.id_str+" tweet: @"+tweet.user.screen_name+": "+tweet.text);
	// don't do retweets
	if (tweet.retweeted_status == null){
		// check if the tweet contains both #postgres and #mysql
		if (((tweet.text.toLowerCase().indexOf("#postgres")) != -1) && ((tweet.text.toLowerCase().indexOf("#mysql")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" has both #postgres and #mysql, tweeting user to try again");
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Try again with either just #postgres or #mysql. You can't have both in this demo! "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		// check if the tweet contains both #rhel6 and #rhel7
		else if (((tweet.text.toLowerCase().indexOf("#rhel6")) != -1) && ((tweet.text.toLowerCase().indexOf("#rhel7")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" has both #rhel6 and #rhel7, tweeting user to try again");
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Try again with either just #rhel6 or #rhel7. You can't have both! "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		// check if the tweet contains neither #postgres and #mysql
		else if (((tweet.text.toLowerCase().indexOf("#postgres")) == -1) && ((tweet.text.toLowerCase().indexOf("#mysql")) == -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" has neither #postgres nor #mysql, tweeting user to try again");
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Try again with either #postgres or #mysql. You have to specify one for this demo! "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		// check if the tweet contains neither #rhel6 and #rhel7
		else if (((tweet.text.toLowerCase().indexOf("#rhel6")) == -1) && ((tweet.text.toLowerCase().indexOf("#rhel7")) == -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" has neither #rhel6 nor #rhel7, tweeting user to try again");
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Try again with either #rhel6 or #rhel7. You have to specify one for this demo! "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		else if (((tweet.text.toLowerCase().indexOf("#postgres")) != -1) && ((tweet.text.toLowerCase().indexOf("#rhel6")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" is a #postgres #rhel6 request, provisioning");
			provision(buildRequest(r6p, tweet.user.screen_name, getcolor(tweet.text),tweet.id_str));
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Got it! Provisioning your #rhel6 #postgres #"+ getcolor(tweet.text) +" workload now. "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		else if (((tweet.text.toLowerCase().indexOf("#mysql")) != -1) && ((tweet.text.toLowerCase().indexOf("#rhel6")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" is a #mysql #rhel6 request, provisioning");
			provision(buildRequest(r6m, tweet.user.screen_name, getcolor(tweet.text),tweet.id_str));
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Got it! Provisioning your #rhel6 #mysql #"+ getcolor(tweet.text) +" workload now. "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		else if (((tweet.text.toLowerCase().indexOf("#postgres")) != -1) && ((tweet.text.toLowerCase().indexOf("#rhel7")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" is a #postgres #rhel7 request, provisioning");
			provision(buildRequest(r7p, tweet.user.screen_name, getcolor(tweet.text),tweet.id_str));
			T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Got it! Provisioning your #rhel7 #postgres #"+ getcolor(tweet.text) +" workload now. "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
				if (err){
					console.log(err);
				}
			});
			break;
		}
		else if (((tweet.text.toLowerCase().indexOf("#mysql")) != -1) && ((tweet.text.toLowerCase().indexOf("#rhel7")) != -1)){
			console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" is a #mysql #rhel7 request, provisioning");
			provision(buildRequest(r7m, tweet.user.screen_name, getcolor(tweet.text),tweet.id_str));
		}
		T.post('statuses/update', { status: "@"+tweet.user.screen_name+" Got it! Provisioning your #rhel7 #mysql #"+ getcolor(tweet.text) +" workload now. "+tweet.id_str, in_reply_to_status_id: tweet.id_str }, function(err, reply) {
			if (err){
				console.log(err);
			}
			break;
		});
	} else {
		console.log("tweet: "+tweet.id_str+" by @"+tweet.user.screen_name+" is a retweet, doing nothing");
		break;
	}
})

var server = restify.createServer({
  name: 'cfdemo_rest_notify',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// notify provision is complete REST call
server.put('/notify/:ip/:username/:id', function (req, res, next) {
	console.log("recieved REST notify call, ip: "+req.params.ip+" from username: "+req.params.username+" tweet id: "+req.params.id);
	// tweet back user the IP
	request('http://'+req.params.ip, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var re = new RegExp("ec2-[0-9-]+.[a-z-]+[0-9-].amazonaws.com");
			var hostname = re.exec(body);
			T.post('statuses/update', { status: "@"+req.params.username+" Your workload is now provisioned! Check it out here: http://"+hostname, in_reply_to_status_id: req.params.id }, function(err, reply) {
				if (err){
					console.log(err);
			    }
			});
		}
	})
	res.send(req.params);
	return next();
});

// retire REST call
server.put('/retire/:ip/:username/:id', function (req, res, next) {
	console.log("recieved REST retire call, ip: "+req.params.ip+" for username: "+req.params.username+" tweet id: "+req.params.id);
	// tweet back user the IP
	T.post('statuses/update', { status: "@"+req.params.username+" We've just retired your workload. Thanks for participating in this demo!", in_reply_to_status_id: req.params.id }, function(err, reply) {
		if (err){
			console.log(err);
		}
	});
	res.send(req.params);
	return next();
});

// up/down status of app for monitoring
server.get('/status', function create(req, res, next) {
	res.send("up and running");
	return next();
});

// error REST call
server.put('/error/:username/:id', function (req, res, next) {
	console.log("recieved REST error call from: " +req.params.username+" tweet id: "+req.params.id);
	// tweet back user the IP
	T.post('statuses/update', { status: "@"+req.params.username+" Well this is embarrassing! Something went wrong and we couldn't provision your workload. Give it a minute and try again.", in_reply_to_status_id: req.params.id }, function(err, reply) {
		if (err){
			console.log(err);
		}
	});
	res.send(req.params);
	return next();
});

// load test invoked via rest, can be kicked off with a simple REST get request (you can use your browser)
// the path is: http://$APPNAME-$DOMAIN.rhcloud.com/runloadtest/{number of iterations}
server.get('/runloadtest/:iterations', function create(req, res, next) {
	var counter = 0;
	while (counter < req.params.iterations){
		res.send("Making request #"+counter);
		// postgres on RHEL6
		setTimeout(provision(buildRequest(r6p, "ronak", "blue","5762987")),2000);
		// mysql on RHEL6
		setTimeout(provision(buildRequest(r6m, "ronak", "blue","5762987")),2000);
		// postgres on RHEL7
		setTimeout(provision(buildRequest(r7p, "ronak", "blue","5762987")),2000);
		// mysql on RHEL7
		setTimeout(provision(buildRequest(r7m, "ronak", "blue","5762987")),2000);
		counter++;
	}
	return next();
});

// serve static content
server.get(/.*/, restify.serveStatic({
    directory: './static/',
    default: 'index.html'
}));

server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
  console.log('%s listening at %s', server.name, server.url);
});