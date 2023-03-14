# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Clone the Repository:

`git clone https://github.com/EdNawrocki/CS35L-Project`

`cd CS35L-Project`

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the dependencies required to run the webpage in your browser.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Using The Website

This website is designed to function as an industrial inventory management web application.
Users can search through items in the database, add new items to the database,
view statistics about an item and update the current statistics to an item.
Different users can login and logout, and their contributions to the database are tracked
by their login email.

When the website is launched, the user is directed to login to the website.
Until the user logs in, no other pages on the website are accessible.
Upon login, the user is directed to the Home page. This page contains
the Navigation bar as well as a button to view the list of current items and a button
to add a new item. 

Selecting the 'Add an Item' button directs the user to the Add Item page. On this page
the user can enter the name of the item they want to add/update as well as the new
quantity information about that item. The user can then use the Navigation bar to
redirect themselves back to the Home page, or to the View Item page to see what they have
just added.

Selecting the 'View Items' button directs the user to the View Items page. On this page
the user can search through the current items in the database with the search bar. A successful search on an item will direct the user to that item's personal page, where statistics can be seen about the item. Additionally, the search bar can be used to search for any user's email to see that user's contribution history to the database. The user is also able to scroll through the list of items, where the change in quantity for each entry is available as well as the user who made the change.

Selecting the button on the left side of an item's entry on the View Items page directs the 
user to that item's personal page, where a full history of changes to the item are available,
along with a line graph representation of the quantity of the item over time. At the bottom of 
the item's page is a button which says 'Stop tracking Item {Item}'. Clicking this button will 
remove this item from the database to be tracked.

In the navigation bar we have provided an 'About' tab which gives meta-information regarding
the creation of the project.

When the user is done with their session on the website, they can click the 'Logout' option
in the navigation bar, which will log them out from their current session. Even after logout, all 
changes to the database are saved and can be returned to in a future session.


