import React from 'react';

import { Spinner } from 'reactstrap';

// import './app-header.css';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 44px;
        color: ${props => props.colored ? 'red' : 'black'};
        :hover {
            color: blue;
        }
      }
    h2 {
        font-size: 1.2rem;
        color: grey;
      }
`

const AppHeader = ({liked, allPosts}) => {
    return (
         // <Header as="a">  as link or other tags
            <Header >     
                <div className='d-flex align-items-baseline'>
                
                    <Spinner
                        style={{
                            color: 'red'
                            }}
                        type="grow"
                        
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'orange'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'yellow'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'green'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'cyan'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'blue'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    <Spinner
                        style={{
                            color: 'indigo'
                            }}
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    
                    
                    
                    <h1> FORUM  </h1>
                </div>
                
                <h2>{allPosts} posts, {liked} like</h2>
            </Header>
       
    )
}

export default AppHeader;