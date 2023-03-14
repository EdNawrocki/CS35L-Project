import React from "react";
import styled from 'styled-components';

export default function About() {
    return (
        <p>This is our final project for CS35L. Created by Albert Guan, Ed Nawrocki, Raphael Santos
        and Luke Westmark.
        <br></br>
        <h4>Welcome to Bruin Industrial Storage Solutions! Here is a quick startup guide on how
                to use this website:
        </h4>
        This website is designed to function as an industrial inventory management web application.
        Users can search through items in the database, add new items to the database,
        view statistics about an item and update the current statistics to an item.
        Different users can login and logout, and their contributions to the database are tracked
        by their login email.
        <br></br><br></br>
        You can use the navigation bar to visit different pages on this website.
        <br></br><br></br>

        In the navigation bar, selecting the 'Add an Item' button will direct you to the Add Item page. On this page
        you can enter the name of the item you want to add/update as well as the new
        quantity information about that item. You can then use the Navigation bar to
        redirect yourself back to the Home page, or to the View Item page to see what you have
        just added.<br></br><br></br>

        Also in the navigation bar, selecting the 'View Items' button will direct you to the View Items page. On this page
        you can search through the current items in the database with the search bar. A successful search on an item
        will direct you to that item's personal page, where statistics can be seen about the item. Moreover,
        you can use the search bar to search for any user's email to see their contribution history to the database.
        In the View Items page, you are also able to scroll through the list of items manually, where the change in quantity for each
        entry is available in the order they were added as well as the user who made the change.
        <br></br><br></br>

        Selecting the button on the left side of an item's entry on the View Items page directs you to that item's personal page, 
        where a full history of changes to the item are available,
        along with a line graph representation of the quantity of the item over time. At the bottom of 
        the item's page is a button which says 'Stop tracking Item'. Clicking this button will 
        remove this item from the database to be tracked.
        </p>
        
        )
}