/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { changeName } from '../../../sockets/emitters';
import { FontWeight600, StyledForm } from '../../../styles';
import { ToastType, useToast } from '../../../utils';
import Modal from '../Modal';
import {
    ChangeButton,
    Container,
    CurrentName,
    InnerContainer,
    InputGroup,
    Logo,
    ModalContent,
    Name,
    NavContainer,
    NavLinks,
    UserButton,
    UserIcon,
} from './style';

interface Props {
    forceShow?: boolean;
}

const Nav = ({ forceShow: show }: Props) => {
    const { room } = useRoom();
    const { user, setUser } = useUser();
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState('');

    if (pathname === '/' && !show) {
        return null;
    }

    const confirmNameChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser({ ...user, name: newName });
        setNewName('');
        setVisible(false);
        useToast({
            type: ToastType.Success,
            message: () => (
                <span>
                    {'Name changed to'} <FontWeight600>{newName}.</FontWeight600>
                </span>
            ),
        });

        if (room.roomId) {
            changeName({ roomId: room.roomId, userId: user.id, name: newName });
        }
    };

    return (
        <Container>
            <InnerContainer>
                <Logo>
                    <NavLink to="/">Movie Swiper </NavLink>
                </Logo>
                <NavContainer>
                    <NavLinks>
                        <NavLink to="/create">Create</NavLink>
                        {user.name && (
                            <UserButton onClick={() => setVisible(true)}>
                                {user.name}
                                <UserIcon />
                            </UserButton>
                        )}
                    </NavLinks>
                </NavContainer>
            </InnerContainer>
            <Modal visible={visible} onClose={() => setVisible(false)} height={280} maxWidth={400}>
                <ModalContent>
                    <h2>Change name</h2>
                    <CurrentName>Current name</CurrentName>
                    <Name>{user.name}</Name>
                    <StyledForm onSubmit={confirmNameChange}>
                        <InputGroup>
                            <label htmlFor="newName">New name</label>
                            <input
                                type="text"
                                name="newName"
                                id="newName"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </InputGroup>
                        <ChangeButton type="submit">Change name</ChangeButton>
                    </StyledForm>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default Nav;
