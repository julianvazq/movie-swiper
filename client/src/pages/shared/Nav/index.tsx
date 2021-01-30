import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Link, Logo, NavContainer, NavLinks } from './style';

const Nav = () => {
    return (
        <Container>
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
        </Container>
    );
};

export default Nav;
