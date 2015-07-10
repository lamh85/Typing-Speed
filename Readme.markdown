# How to run this app:

Please read this before you run the app.

This app runs on:
Node + Angular + MongoDB

## Install MongoDB

Make sure that you have MongoDB installed.

In your MongoDB data, create a database called `typespeed`.

Here is the database's schema:
`_id` : primary key
`start` : The start time of the typing. Format is in UNIX time.
`end` : Same as above, but for end time.
`body` : Body of the inputted text.

## Run the app from Terminal

1. In Terminal, change directory to this app's root folder.
2. Run with this command: `node server`.
3. Open in your browser: `http://localhost:3000/`