import { NavLink, Link, Outlet } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';
import { RandomPage } from '.';

import './page.css'

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const FooterBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    color: rgb(255, 230, 220);
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: rgb(255, 230, 220);
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const Layout = () => {

    return (
        <>
            <Container>
                <HeaderBlock>
                    <HeaderTitle>
                        <Link to='/'>Game of Thrones DB</Link> 
                    </HeaderTitle>
                    <HeaderLinks>
                        <li>
                            <NavLink to='/characters'>Characters</NavLink>   
                        </li>
                        <li>
                            <NavLink to='/houses'>Houses</NavLink>   
                        </li>
                        <li>
                            <NavLink to='/books'>Books</NavLink>   
                        </li>
                    </HeaderLinks>
                </HeaderBlock>
            </Container>
            <Container>
                <Outlet/>
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0} }>
                        <RandomPage/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <FooterBlock>
                    <p>GoT application - 2022</p>
                    <a href='https://anapioficeandfire.com/'>An API of Ice And Fire</a>
                </FooterBlock>
            </Container>
        </>
    )
}

export default Layout