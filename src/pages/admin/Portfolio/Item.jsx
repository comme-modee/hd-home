import React, { forwardRef } from 'react';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import usePortfolio from './usePortfolio';
import { useEffect } from 'react';

const Item = forwardRef((props, ref) => {
    const { item, withOpacity, isDragging, style, ...otherProps } = props;
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const { deletePortfolio } = usePortfolio()

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

    const handleDeletePortfolio = () => {
        const seq = item?.pt_seq;
        if(seq) {
            deletePortfolio(seq)
            setIsDeleteModalOpen(false)
        } else {
            console.log('포트폴리오가 존재하지 않습니다.')
        }
    }

    return (
        <React.Fragment>
            {/* 삭제 모달 */}
            <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} dialogClassName='modal-dialog-centered' size='sm'>
                <Modal.Header closeButton>
                  <h5 className="modal-title"></h5>
                </Modal.Header>
                <Modal.Body>
                    포트폴리오를 삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                    취소
                  </Button>
                  <Button variant="danger" onClick={handleDeletePortfolio}>
                    삭제
                  </Button>
                </Modal.Footer>
            </Modal>

            <div ref={ref} style={inlineStyles} {...otherProps} className='portfolio-item'>
                <FontAwesomeIcon icon={faXmarkSquare} className='delete-btn' onClick={(e) => {e.stopPropagation(); setIsDeleteModalOpen(true)}}/>
                <div className='img'>
                    <img src={item?.pt_thumbnail} alt={item?.pt_name}/>
                </div>
                <div className='name'>{item?.pt_name}</div>
            </div>
        </React.Fragment>
    );
});

export default Item;
