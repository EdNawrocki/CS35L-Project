import React from "react";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';


const Wrapper = styled.div`
background-color: #F0EAD6;

i {
    display: flex;
    justify-content: center;
}
`;

const Container = styled.div`
position: static;
width: 1fr;
height: 18vh;
left: 0px;
top: 0px;
background-color: #094CF8C2;

h1 {
    font-size: 30px;
    text-align: center;
    color: #FFFFFF;
}

`;

const Toolbar = styled.div`
position: static;
margin-top: 5px;
width: 100%;
height: 57px;
left: 0px;
top: 123px;
background-color: #094CF8C2;
display: grid;
grid-template-columns: repeat(2, 50vw);

#Home {

}

#About {

}

h1 {
    font-size: 20px;
    text-align: center;
    color: #FFFFFF;
}

`

const Grid = styled.div`
position: static;
    display: grid;
    width: 100%;
    grid-template-columns: 33vw 15.5vw 15.5vw 1fr;
    grid-template-rows: repeat(4, 15vh);
gap: 10px;
margin-top: 10px;

h1 {
    font-size: 30px;
    color: #FFFFFF;
    text-align: center;
    margin: 50;
}

    grid-template-areas: 
      "a a a abutton"
      "d d dbutton dbutton"
      "s s s s"
      "p q q q";

    .a {
      grid-area: a;
background-color: #094CF8C2;
    }

    .abutton {
      grid-area: abutton;
background-color: #F8B509;
    }

    .d {
      grid-area: d;
        background-color: #094CF8C2;
    }
    .dbutton {
      grid-area: dbutton;
        background-color: #F8B509;
    }

    .s {
      grid-area: s;
background-color: #094CF8C2;
    }

    .p {
      grid-area: p;
background-color: #094CF8C2;
    }

    .q {
      grid-area: q;
background-color: #094CF8C2;
    }
`;

export default function main() {
    return (
        <React.Fragment>
            
            <Container>
                
                <h1><i className="fa fa-database fa-3x"></i> Bruin Industrial Storage Solutions</h1></Container>
            <Toolbar>
                <div id="Home"><h1>Home</h1></div>
                <div id="About"><h1>About</h1></div>
                
            </Toolbar>
            <Wrapper>
            <Grid>
                <div class="a"><h1>Add an item</h1></div>
                <div class="abutton"><h1><i className="fa fa-plus-square fa-2x"></i></h1></div>
                <div class="d"><h1>Display Statistics</h1></div>
                <div class="dbutton"><h1><i className="fa fa-connectdevelop fa-2x"></i></h1></div>
                <div class="s"><h1>Selected: </h1></div>
                <div class="p"><h1>Price</h1></div>
                <div class="q"><h1>Quantity</h1></div>

            </Grid>
        </Wrapper>
            </React.Fragment>
        );
}