import React from 'react';
import { Bar } from './styled';

interface Props {
    colors: string[];
}

const LikeCountBar = ({ colors }: Props) => {
    const generateGradient = (colors: string[]) => {
        const sectionWidth = 100 / colors.length;
        let percent = 0;
        const gradients: string[] = [];
        colors.forEach((color) => {
            const nextPercent = percent + sectionWidth;
            gradients.push(`${color} ${percent}%, ${color} ${nextPercent}%`);
            percent += sectionWidth;
        });
        return `linear-gradient(90deg, ${gradients.join(', ')})`;
    };

    return <Bar style={{ background: generateGradient(colors) }} />;
};

export default LikeCountBar;
