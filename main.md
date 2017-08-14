title: Chatbots and You
author:
  name: Guy Bianco IV
  twitter: gjbiancoiv
  url: http://gbianco.com
controls: true
theme: gjbianco/cleaver-dark-alt
style: 'custom.css'

--
# 🤖 chatbots and you 🤓
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
 * bot adapter -> gitter
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
# remove the file _hubot-scripts.json_
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