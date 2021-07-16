import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import { Participant } from '../../../types/room';
import { Color, Item, List, ModalContent, MoreItems, Name } from './styled';

interface Props {
    users: Participant[];
}

const LikeList = ({ users }: Props) => {
    const [visible, setVisible] = useState(false);

    const maxNumber = 5;
    if (users.length > maxNumber) {
        return (
            <>
                <List>
                    {users.slice(0, maxNumber).map((user) => (
                        <Item key={user.id}>
                            <Color color={user.color} />
                            <Name wrap={0}>{user.name}</Name>
                        </Item>
                    ))}
                    <Item>
                        <MoreItems onClick={() => setVisible(true)}>
                            <button>
                                <span>+{users.length - maxNumber}</span> More
                            </button>
                        </MoreItems>
                    </Item>
                </List>
                <Modal visible={visible} onClose={() => setVisible(false)} height={300}>
                    <ModalContent>
                        <h2>Likes</h2>
                        <List>
                            {users.map((user) => (
                                <Item key={user.id}>
                                    <Color color={user.color} />
                                    <Name wrap={1}>{user.name}</Name>
                                </Item>
                            ))}
                        </List>
                    </ModalContent>
                </Modal>
            </>
        );
    }

    return (
        <List>
            {users.map((user) => (
                <Item key={user.id}>
                    <Color color={user.color} />
                    <Name wrap={0}>{user.name}</Name>
                </Item>
            ))}
        </List>
    );
};

export default LikeList;
