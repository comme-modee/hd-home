import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import { useModal } from '@/pages/ui/base/hooks';
import { portfolioApi } from '@/common';
import usePortfolio from './usePortfolio';
import './Form.css';
import './Portfolio.css';

//dnd-kit
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    KeyboardSensor,
    PointerSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import Item from './Item';
import Flex from './Flex';

const initialPortfolioData = {
  pt_name: '',
  pt_mission1: '',
  pt_mission2: '',
  pt_contents1: '',
  pt_contents2: '',
  pt_contents3: ''
};

const Portfolio = () => {

  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ editPortfolioData, setEditPortfolioData ] = useState({});
	const { toggleModal } = useModal();
  const [ portfolioData, setPortfolioData ] = useState({...initialPortfolioData});
  const { portfolioList, dataLoading, addLoading, editLoading, deleteLoading, sortLoading, deletePortfolio, sortData, getPortfolioList, thumbnail, setThumbnail, handleThumbnailChange, inquiry } = usePortfolio();
  const [ mode, setMode ] = useState('');
  const [ previewThumbnailSrc, setPreviewThumbnailSrc ] = useState('');

  //새 포트폴리오 등록에서 썸네일 업로드하면 미리보기창 띄워주기
  const readThumbnailURL = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewThumbnailSrc(e.target.result)
      }
      reader.readAsDataURL(file)
  }

  useEffect(() => {
    if(thumbnail) {
      readThumbnailURL(thumbnail)
    } else {
      setPreviewThumbnailSrc('')
    }
  },[thumbnail])

  //dnd-kit
  const [ items, setItems ] = useState([]);
  const [ activeId, setActiveId ] = useState(null);
  //dnd-kit 센서
  const pointerSensor = useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01
      }
  })
  // const mouseSensor = useSensor(MouseSensor)
  // const touchSensor = useSensor(TouchSensor)
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(
      // mouseSensor,
      touchSensor,
      keyboardSensor,
      pointerSensor
  )

  useEffect(()=>{
    getPortfolioList()
  },[deletePortfolio])

  useEffect(()=>{
    if(!dataLoading && portfolioList && portfolioList.length > 0) {
        setItems(portfolioList)
    }
   },[dataLoading, portfolioList])

  useEffect(()=>{
    if(!sortLoading || !editLoading || !addLoading) {
      getPortfolioList()
    }
  },[addLoading, editLoading, sortLoading])

  const handleDragStart = useCallback((event) => {
    // console.log(event)
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if(!over) {
      // 모바일 환경에서 over가 null일 경우 처리
      return;
    }

    if (active.id !== over?.id) {
      setItems((items) => {
          const oldIndex = items.findIndex(item => item.pt_seq === active.id);
          const newIndex = items.findIndex(item => item.pt_seq === over.id);

          const newItems = arrayMove(items, oldIndex, newIndex);
          sortData(newItems.map(item => item.pt_seq)); // 서버에 정렬된 데이터 저장
          return newItems;
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log('모드', mode)
    if(mode === 'new') {
      setPortfolioData({ ...portfolioData, [id]: value });
    } else if(mode === 'edit') {
      setEditPortfolioData({ ...editPortfolioData, [id]: value });
    }
  }

  //새 포트폴리오 추가
  const addPortfolio = async (e) => {
    e.preventDefault();
    inquiry({ mode:mode, portfolioData });
    setIsAddModalOpen(false);
  }
  
  //싱글 포트폴리오 데이터 가져오기
  const getSinglePortfolio = async (seq) => {
    try {
      const res = await portfolioApi.getSinglePortfolio(seq);
      if(res) {
        setEditPortfolioData(res.list);
        setIsEditModalOpen(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  //포트폴리오 수정
  const editPortfolio = async (e) => {
    e.preventDefault();
    setMode('edit');
    inquiry({ mode:mode, portfolioData:editPortfolioData });
    setIsEditModalOpen(false)
  }

  //모달 창 열릴때/닫힐때 처리할 것들
  useEffect(() => {
    if(isAddModalOpen) {
      setMode('new');
    } else {
      setThumbnail(null)
      //새 포트폴리오 모달이 닫히면 form 내용과 mode 초기화
      setPortfolioData({...initialPortfolioData})
      setMode('');
    }
  },[isAddModalOpen])

  //모달 창 열릴때/닫힐때 처리할 것들
  useEffect(() => {
    if(isEditModalOpen) {
      setMode('edit')
    } else {
      //포트폴리오 수정 모달이 닫히면 mode 초기화
      setMode('');
    }

  },[isEditModalOpen])

  // useEffect(()=>{
  //   if(Object.keys(editPortfolioData).length !== 0) {
  //     console.log('수정될 데이터:', editPortfolioData)
  //   }
  // },[editPortfolioData])


  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="page-title">포트폴리오</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              
              {/* 새 포트폴리오 등록 모달창 */}
              <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)} dialogClassName='modal-dialog-centered' size='lg'>
                <Modal.Header onHide={toggleModal} closeButton>

                </Modal.Header>
                <Modal.Body>
                  <Form className='portfolio-form' onSubmit={addPortfolio}>
                    <div className='thumbnail-container mb-2'>
                      <Form.Group>
                        <Form.Label>썸네일</Form.Label>
                        <Form.Control
                          type='file'
                          onChange={handleThumbnailChange}
                        />
                      </Form.Group>
                      {previewThumbnailSrc && <img src={previewThumbnailSrc} alt='' className='thumbnail'/>}
                    </div>
                    <Form.Group as={Col} controlId="pt_name">
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        type='text' 
                        placeholder='제목을 입력해주세요' 
                        className='mb-2' 
                        required
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_name}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_mission1">
                      <Form.Label>마케팅 목표</Form.Label>
                      <Form.Control
                        placeholder='15자 이하로 입력해주세요' 
                        className='mb-1'
                        required 
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_mission1}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_mission2">
                      <Form.Control
                        placeholder='15자 이하로 입력해주세요' 
                        className='mb-2'
                        required 
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_mission2}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents1">
                      <Form.Label>마케팅 활동</Form.Label>
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        className='mb-1' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_contents1}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents2">
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        className='mb-1' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_contents2}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents3">
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={portfolioData.pt_contents3}
                      />
                    </Form.Group>
                    <div className='btns'>
                      <Button variant="danger" onClick={() => setIsAddModalOpen(false)}>
                        취소
                      </Button>
                      <Button variant="primary" type="submit">
                        등록
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>


              {/* 포트폴리오 수정 모달창 */}
              <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} dialogClassName='modal-dialog-centered' size='lg'>
                <Modal.Header onHide={toggleModal} closeButton>

                </Modal.Header>
                <Modal.Body>
                  <Form className='portfolio-form' onSubmit={editPortfolio}>
                    <div className='thumbnail-container mb-2'>
                      <Form.Group>
                        <Form.Label>썸네일</Form.Label>
                        <Form.Control
                          type='file'
                          onChange={handleThumbnailChange}
                        />
                        <small>* 이미지를 새로 업로드하지 않을 시 기존 이미지가 유지됩니다.</small>
                      </Form.Group>
                      <img src={editPortfolioData.pt_thumbnail} alt='' className='thumbnail'/>
                    </div>
                    <Form.Group as={Col} controlId="pt_name">
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        type='text' 
                        placeholder='제목을 입력해주세요' 
                        className='mb-2' 
                        required
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_name}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_mission1">
                      <Form.Label>마케팅 목표</Form.Label>
                      <Form.Control
                        placeholder='15자 이하로 입력해주세요' 
                        className='mb-1'
                        required 
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_mission1}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_mission2">
                      <Form.Control
                        placeholder='15자 이하로 입력해주세요' 
                        className='mb-2'
                        required 
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_mission2}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents1">
                      <Form.Label>마케팅 활동</Form.Label>
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        className='mb-1' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_contents1}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents2">
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        className='mb-1' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_contents2}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="pt_contents3">
                      <Form.Control
                        type='text' 
                        placeholder='15자 이하로 입력해주세요 (ex. #인플루언서 #네이버검색노출)' 
                        required
                        maxLength={15}
                        onChange={(e) => handleChange(e)}
                        value={editPortfolioData.pt_contents3}
                      />
                    </Form.Group>
                    <div className='btns'>
                      <Button variant="danger" onClick={() => setIsEditModalOpen(false)}>
                        취소
                      </Button>
                      <Button variant="primary" type="submit">
                        등록
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>


              {/* 등록된 포트폴리오들 */}
              <Button variant='primary' className='mb-3' onClick={() => setIsAddModalOpen(true)}>새 포트폴리오 등록</Button>


              <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragCancel={handleDragCancel}
              >
                  <SortableContext items={items.map(item => item.pt_seq)} strategy={rectSortingStrategy}>
                      <Flex columns={5}>
                          {items.map((item) => (
                              <SortableItem key={item.pt_seq} item={item} id={item.pt_seq} onClick={() => getSinglePortfolio(item.pt_seq)}/>
                          ))}
                      </Flex>
                  </SortableContext>
                  <DragOverlay adjustScale style={{ transformOrigin: '0 0' }}>
                      {activeId ? <Item item={items.find((item) => item.pt_seq === activeId)} isDragging /> : null}
                  </DragOverlay>
              </DndContext>



            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Portfolio