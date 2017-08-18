title: Chatbots and You
author:
  name: Guy Bianco IV
  email: gbianco@redhat.com
  twitter: gjbiancoiv
  url: http://gbianco.com
controls: true
theme: gjbianco/cleaver-dark-alt
style: 'custom.css'

--
# 🤖 chatbots and you 🤓
--
# slides and example bot <br> https://github.com/gjbianco/chatbot-talk
## we'll be building up the same bot
--
# what do we mean by _chatbot_?
--
# connects to your chat platform
## e.g. slack, gitter, sms
--
# acts like another user
## except for the whole being a bot thing
--
# being a bot means they are <br> 🎊 _programmable_ 🎊
--
# programming one is pretty easy
--
# we'll focus on *Hubot* chatbots
--
# Hubot is a chatbot framework by GitHub
--
# largely written in <br> ☕️ CoffeeScript ☕️
## this is changing!
--
# you can write your scripts in CoffeeScript _or_ JavaScript
## or both
--
# we'll use <br> 🚀 JavaScript 🚀
## because I don't like CoffeeScript...
--
# install Node.js <br> https://nodejs.org/en/download/
## anything at or above v4 should be fine
--
# i recommend using nvm <br> https://github.com/creationix/nvm
## easily work with multiple versions of node
--
# official getting started guide: <br> https://hubot.github.com/docs/
## we're going to loosely follow this
--
# install yeoman generator
<pre>npm install -g yo generator-hubot</pre>
--
# start the generator
<pre>
yo hubot
</pre>
-- bullet-star
### you will be prompted for a few things
 * owner -> your info
 * bot name -> "hubot" will NOT work!
 * description -> default is fine
 * bot adapter -> slack
--
# adapters define what platform Hubot is talking to
## e.g. Slack, gitter, shell, etc.
## more info about adapters: https://hubot.github.com/docs/adapters/
--
# let's test our bot
<pre>
bin/hubot
</pre>
--
# you'll probably get a few warnings
## we can ignore those for now
--
# you should be dropped into a shell session with your bot
## may need to hit &lt;Enter&gt; to see the prompt
--
# try talking to it!
<pre>&lt;ROBOT NAME&gt; what are the rules?</pre>
--
# doesn't do much else right now
--
# let's help our new pal <br> 💡 _learn_ 💡
--
# first we'll clean house
--
# remove the file `hubot-scripts.json`
-- bullet-point
### remove all EXCEPT the following from _external-scripts.json_
 * hubot-help
 * hubot-redis-brain
 * hubot-rules
-- bullet-redx
### remove these from _package.json_
 * hubot-diagnostics
 * hubot-google-translate
 * hubot-google-images
 * hubot-heroku-keepalive
 * hubot-maps
 * hubot-pugme
 * hubot-shipit
--
# clear out dependencies with
<pre>
npm prune
</pre>
--
# try running your bot again
<pre>bin/hubot</pre>
## you should see less warnings
--
# let's actually build something!
## don't worry, we'll start <small><small><small>small</small></small></small>
--
# we'll make our own custom response
--
# we can put our own scripts in the `scripts/` directory
## we'll ignore `example.coffee` for now
--
# create `scripts/response.js`
## 
<pre>touch scripts/response.js</pre>
-- code
### scripts/response.js
<pre>
module.exports = function(robot) {
  robot.hear(/ping/i, function(res) {
    res.send('pong');
  });
};
</pre>
--
# let's break down this snippet
-- code bullet-point
<pre>
module.exports = function(robot) {
  ...
};
</pre>
 * `module.exports` is kind of like the Node.js equivalent of `public`
 * here we are exposing a "callback function"
 * the Hubot framework will call our function, passing a `robot` object
 * we use that object to interact with the framework
-- code bullet-point
<pre style="color: #555;">
module.exports = function(robot) {
</pre>
<pre>
  robot.hear(/ping/i, function(res) {
    ...
  });
</pre>
<pre style="color: #555;">
};
</pre>
 * accepts a RegEx/pattern and a callback function (foreshadowing!)
 * callback is called with a "response object"
 * registers our callback for Hubot to call whenever a message matches our pattern
-- code bullet-point
<pre style="color: #555;">
module.exports = function(robot) {
  robot.hear(/ping/i, function(res) {
</pre>
<pre>
    res.send('pong');
</pre>
<pre style="color: #555;">
  });
};
</pre>
 * using our response object, send a reply with a message ("pong")
--
# let's try running our bot again
<pre>bin/hubot</pre>
--
# we need to enter a message that matches our string
## (hint: anything containing "ping")
--
# your bot should reply simply with "pong"
--
# not terribly exciting...
--
# let's make it convert <br> 🏦 currency 🏦
## (i am not liable for any quotes, information accuracy, etc. just saying. use at your own risk.)
--
# we'll use a free API from http://fixer.io/
--
# their API is pretty easy to use for our needs
--
# let's start by converting USD  to Euro
--
# we need to call their API to get the current rate
--
# we'll use `axios` to make the call
## Node's built in `http` lib can be a bit much for those who are new to it
--
# just add axios as a dependency
<pre>npm install --save axios</pre>
## shortcut: `npm i -S axios`
--
# now let's make a new file: `scripts/currency.js`
-- code
### scripts/currency.js
<pre>
var http = require('axios');
module.exports = function(robot) {
  robot.respond(/convert/i, function(res) {
    http.get('http://api.fixer.io/latest?base=USD')
    .then(function(conversion) {
      res.reply(conversion.data.rates.EUR);
    });
  });
};
</pre>
--
# let's break down the new parts
-- code bullet-point
<pre>var http = require('axios');</pre>
 * Node's way of importing
 * we assign the axios lib to `http`
-- code bullet-point
<pre>http.get('http://api.fixer.io/latest?base=USD')</pre>
 * we are making a request to fixer.io
 * we pass in our base currency
 * this call is made asychronously
 * you can hit the link in your browser to see the response
-- code bullet-point
<pre>
.then(function(conversion) {
  ...
});
</pre>
 * anything with a `.then` function is (usually) a Promise
 * we pass `.then` a function that gets called with the response object (conversion)
 * we won't really get into Promises
 * Promises make asynchronous programming fun
-- code bullet-point
<pre>res.reply(conversion.data.rates.EUR);</pre>
 * we've kinda seen this
 * res.reply uses the person's name
 * note what we send back
 * yay for native JSON
--
# conversion.data.rates.EUR
--
# conversion <span style="color: red;">|</span> .data <span style="color: red;">|</span> .rates.EUR
--
# conversion <span style="color: red;">|</span> .data <span style="color: red;">|</span> .rates.EUR <br> <span style="color: blue;">^</span>our code&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">^</span>axios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">^</span>fixer.io
--
# let's test our bot again
<pre>bin/hubot</pre>
--
# address the bot with
<pre>&lt;BOT NAME&gt; convert</pre>
--
# responds with something like
<pre>Shell: 0.85492</pre>
--
# we can do better!
--
# let's make it do the conversion <br> 😎 for us 😎
--
### plan for currency bot
 💚 get the rate <br>
 💔 get user input <br>
 💔 do math and respond
--
# Regular Expressions
## foreshadowing complete
--
# RegExes have lots of math and theory behind them
--
# we're gonna ignore most of that
--
# topical joke:
--
# i had a problem,
# so i used Regular Expressions
--
# now i have two problems
## topical joke complete
--
# there are several flavors
## we'll be using the JavaScript one
--
# in JS, they take the form:
<pre>/stuff/</pre>
## matches anything containing "stuff"
--
# lots of characters are not literal
--
# e.g. dot/period/full stop (.)
## matches any character
--
# /st.ff/
## matches "stuff", "staff", "stbff", "st&ff", etc.
--
# caret (^) matches the beginning of the string
--
# /^stuff/
## matches: "stuff i've said"
## does NOT match: "other stuff"
--
# dollar sign ($) matches the end of the string
--
# /stuff$/
## matches: "other stuff"
## does NOT match: "stuff i've said"
--
# you can combine them to be very specific
--
# /^stuff$/
## the only string that can match is "stuff"
--
# asterisk (*) allows you to have none or many
--
# /stu*ff/
## matches: "stff", "stuff", "stuuff", "stuuuuuuuuuuuff"
--
# fun combination with period
--
# /st.*ff/
## matches: "stff", "stuff", "stlkhfsd9863^(&(*&33asdflff"
--
# you can set up groups with parentheses ( ('s and )'s )
--
# by default, groups are _capturing groups_
--
# basically, able to extract matching parts of the string
--
# /^convert (.*)/
## matches: "convert stuff" (stuff), "convert 4.50" (4.50)
-- code
# remember how `.hear` and `.respond` take a pattern?
<pre>robot.hear(/ping/i, function(res) {</pre>
--
# let's tweak our pattern in `currency.js`
-- code
<pre>
robot.respond(/^convert (.*)/i, function(res) {
  http.get('http://api.fixer.io/latest?base=USD')
  .then(function(conversion) {
    res.reply(conversion.data.rates.EUR);
  });
});
</pre>
--
# `res.match` is an array with our pattern matches
--
# this means `res.match[1]` refers to the part of the input string that matches our group
## `res.match[0]` is always the entire string
--
# let's make our bot respond with whatever you tell it to convert
-- code
<pre>
robot.respond(/^convert (.*)/i, function(res) {
  http.get('http://api.fixer.io/latest?base=USD')
  .then(function(conversion) {
    res.reply(res.match[1]);
  });
});
</pre>
--
# fire up the bot
<pre>bin/hubot</pre>
--
# tell it to convert something
<pre>&lt;BOT NAME&gt; convert 4.50</pre>
--
# it responds with `Shell: 4.50`
--
### plan for currency bot
 💚 get the rate <br>
 💚 get user input <br>
 💔 do math and respond
--
# just multiply user input by the rate from fixer.io
<pre>res.match[1] * conversion.data.rates.EUR</pre>
-- code
### altogether!
<pre>
robot.respond(/convert (.*)/i, function(res) {
  http.get('http://api.fixer.io/latest?base=USD')
  .then(function(conversion) {
    res.reply(res.match[1] * conversion.data.rates.EUR);
  });
});
</pre>
--
# let's see what the bot says
<pre>bin/hubot</pre>
--
# now tell it to convert something
<pre>&lt;BOT NAME&gt; convert 4.50</pre>
--
# you should get something close to 3.84
## unless either the US or Europe is screwed
--
### plan for currency bot
 💚 get the rate <br>
 💚 get user input <br>
 💚 math and respond
## bot completed
--
# there is some obvious room for improvement!
--
# what about actually hooking this up?
--
# you do need to host the bot server somewhere
--
### hosting
 * OpenShift
 * Heroku
 * Digital Ocean
 * AWS
 * a Raspberry Pi
 * anything else that runs Node.js
--
# currently running on Digital Ocean
--
# i've also got a slack instance set up with the integration
--
# let's take a look at it running
## make sure bot is invited to the room!
--
# just make sure you have the correct adapter(s)
## each chat service has their own instructions
--
# hopefully, i've inspired you to go make your own bots 🤘
--
# 🌞 enjoy the eclipse (safely)! 🌖 