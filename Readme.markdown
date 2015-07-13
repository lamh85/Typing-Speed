# How to run this app:

Please read this before you run the app.

This app runs on:
Node + Angular + MongoDB

## Install MongoDB

Make sure that you have MongoDB installed.

In your MongoDB data, create a database called `typespeed`.

Make sure that MongoDB is running BEFORE you run `node server` in Terminal to run the app:
* Go to the folder where MongoDB is installed (typically `~/usr/local/var/mongodb/`), and run `sudo mongod`.

Here is the database's schema:
* `_id` : primary key
* `start` : The start time of the typing. Format is in UNIX time.
* `end` : Same as above, but for end time.
* `body` : Body of the inputted text.

## Run the app from Terminal

1. Go to the folder where MonogoDB is installed and run `sudo mongod`.
2. Change directory to this app's root folder, and run with this command: `node server`.
3. Open in your browser: `http://localhost:3000/`