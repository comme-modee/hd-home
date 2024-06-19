import React, { forwardRef } from 'react';
import './Item.css';

const Item = forwardRef((props, ref) => {
    const { item, withOpacity, isDragging, style, ...otherProps } = props;

    const inlineStyles = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        width: '300px',
        height: '330px',
        borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: 'rgba(var(--ct-tertiary-bg-rgb), 1)',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        boxShadow: isDragging
            ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    return (
        <div ref={ref} style={inlineStyles} {...otherProps} className='portfolio-item'>
            <div className='img'>
                <img src={item?.pt_thumbnail} alt={item?.pt_name}/>
            </div>
            <div className='name'>{item?.pt_name}</div>
        </div>
    );
});

export default Item;
