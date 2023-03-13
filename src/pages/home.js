import React from "react";
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

import {
    Route,
    Routes,
    Link,
} from "react-router-dom";
import NewItem from './newitem'


const Wrapper = styled.div`
background-color: #F0EAD6;

i {
    display: flex;
    justify-content: center;
    text-decoration: none;
}
`;

const Grid = styled.div`
position: static;
    display: grid;
    width: 100%;
    grid-template-columns: 33vw 15.5vw 15.5vw 1fr;
    grid-template-rows: repeat(4, 15vh);
gap: 10px;

h1 {
    font-size: 50px;
    color: #FFFFFF;
    text-align: center;
    margin: 50;
    text-decoration: none;
}

    grid-template-areas: 
      "a a abutton abutton"
      "a a abutton abutton"
      "d d dbutton dbutton"
      "d d dbutton dbutton";

    .a {
      grid-area: a;
background-color: #094CF8C2;
top: 50%;
display: flex;
justify-content: center;
align-items: center;
    }

    .abutton {
      grid-area: abutton;
background-color: #F8B509;
display: flex;
justify-content: center;
align-items: center;
    }

    .d {
      grid-area: d;
        background-color: #094CF8C2;
        display: flex;
justify-content: center;
align-items: center;
    }
    .dbutton {
      grid-area: dbutton;
        background-color: #F8B509;
display: flex;
justify-content: center;
align-items: center;
    }
.dbutton:hover {
    background-color: red;
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

export default function Home() {
    return (
        <React.Fragment>
            <Wrapper>
                <Grid>
                    
                    <div className="a"><h1>Add an Item</h1></div>
                    <div className="abutton">
                        <Link to="/NewItem" style={{ textDecoration: 'none' }}><h1><i className="fa fa-plus-square fa-3x"></i></h1></Link>
                    </div>
                    <div className="d"><h1>View Items</h1></div>
                    <div className="dbutton">
                        <Link to="/viewitem" style={{ textDecoration: 'none' }}><h1><i className="fa fa-list-ul fa-3x"></i></h1></Link>
                    </div>                 
                </Grid>
            </Wrapper>
            <Routes>
                <Route path="/NewItem" element={<NewItem />} />
            </Routes>
        </React.Fragment>
    );
}