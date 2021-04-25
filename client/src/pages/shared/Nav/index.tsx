import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, InnerContainer, Link, Logo, NavContainer, NavLinks } from './style';

interface Props {
    forceShow?: boolean;
}

const Nav = ({ forceShow: show }: Props) => {
    const { pathname } = useLocation();

    if (pathname === '/' && !show) {
        return null;
    }

    return (
        <Container>
            <InnerContainer>
                <Logo>
                    <NavLink to="/">Movie Swiper </NavLink>
                </Logo>
                <NavContainer>
                    <NavLinks>
                        <Link>
                            <NavLink to="/">Home</NavLink>
                        </Link>
                        <Link>
                            <NavLink to="/create">Create</NavLink>
                        </Link>
                    </NavLinks>
                </NavContainer>
            </InnerContainer>
        </Container>
    );
};

export default Nav;
