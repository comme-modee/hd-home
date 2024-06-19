import React from 'react';

const Flex = ({ children, columns }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '30px'
            }}
            className='portfolio-item-wrapper'
        >
            {children}
        </div>
    );
};

export default Flex;
