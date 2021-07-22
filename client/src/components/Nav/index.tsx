/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRoom } from '../../context/RoomContext';
import { useUser } from '../../context/UserContext';
import useViewportWidth from '../../hooks/useViewportWidth';
import { changeName } from '../../sockets/emitters';
import { FontWeight600, StyledForm } from '../../styles';
import { ToastType, useToast } from '../../utils';
import Modal from '../Modal';
import {
    ChangeButton,
    Container,
    InnerContainer,
    InputGroup,
    Logo,
    ModalContent,
    NavContainer,
    NavLinks,
    StyledLink,
    UserButton,
    UserIcon,
} from './style';

interface Props {
    forceShow?: boolean;
}

const Nav = ({ forceShow: show }: Props) => {
    const { width } = useViewportWidth();
    const { room } = useRoom();
    const { user, setUser } = useUser();
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const username = user.name.length > 8 ? `${user.name.slice(0, 8)}...` : user.name;

    const closeModal = () => {
        setVisible(false);
    };

    const confirmNameChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser({ ...user, name: newName });
        closeModal();
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

    if (pathname === '/' && !show) return null;

    return (
        <Container>
            <InnerContainer>
                <Logo>
                    <NavLink to="/">Movie Swiper </NavLink>
                </Logo>
                <NavContainer>
                    <NavLinks>
                        <StyledLink $active={pathname.includes('create')} to="/create">
                            Create
                        </StyledLink>
                        {room.roomId && (
                            <StyledLink
                                to={`/${room.stage}/${room.roomId}`}
                                activeStyle={{
                                    fontWeight: 700,
                                }}
                                $active={['selection', 'swiper', 'results'].includes(
                                    pathname.split('/').filter(Boolean)[0],
                                )}
                            >
                                Room
                            </StyledLink>
                        )}
                        {user.name && (
                            <UserButton onClick={() => setVisible(true)}>
                                {width > 450 && <span>{username}</span>}
                                <UserIcon />
                            </UserButton>
                        )}
                    </NavLinks>
                </NavContainer>
            </InnerContainer>
            <Modal visible={visible} onClose={closeModal} height={225} maxWidth={400}>
                <ModalContent>
                    <h2>Change name</h2>
                    <StyledForm onSubmit={confirmNameChange}>
                        <InputGroup>
                            <label htmlFor="newName">Name</label>
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
