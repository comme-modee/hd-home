import * as yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { authApi, useNotificationContext } from '@/common';
import { Form, PasswordInput, Spinner, TextInput, TextInputReadOnly } from '@/components'
import useErrorAni from '@/hooks/useErrorAni';
import { useTranslation } from 'react-i18next';
import './Account.css';

const Account = () => {

    const { t } = useTranslation();
	const [ loading, setLoading ] = useState(false);
	const { showNotification } = useNotificationContext();
	const { errorAni, handleErrorAni } = useErrorAni();
	const navigate = useNavigate();
    const [ userEmail, setUserEmail ] = useState(null);

	//로그인한 사용자 정보
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const schema = yup.object().shape({
		oldpassword: yup.string().required('기존 비밀번호를 입력해주세요'),
        email: yup
			.string()
			.required(t('이메일을 입력해주세요.'))
			.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i, 'email형식이 올바르지 않습니다.'),
	});

    useEffect(()=>{
        //페이지 접속하면 이메일 받아오기
        getUserEmail();
    },[])

    useEffect(()=>{
        console.log(userEmail)
    },[userEmail])

    const getUserEmail = async () => {
        try {
            const res = await authApi.getEmail();
            console.log(res)
            if(res !== '') {
                setUserEmail(res)
            }
        } catch (error) {
            console.log('error', error)
            // navigate('/admin')
        }
    }
	
	const editUserInfo = async (value) => {
		setLoading(true)
		const { oldpassword, password, email } = value;
		console.log("userInfo: ", value)

		try {
			const res = await authApi.editUserInfo({ oldpassword, password, email });
            console.log('계정 정보 수정: ', res)
            if(res) {
                setUserEmail(null);
                getUserEmail();
				showNotification({ message: "계정 정보가 변경되었습니다.", type: 'success' });
            } else {
                showNotification({ message: "비밀번호가 틀렸습니다. 다시 확인 후 입력해주세요.", type: 'error' });
            }
        } catch(error) {
			console.log(error)
        } finally {
			setLoading(false)
		}
	}
  
    return (
        <>
            <Row>
                <Col xs={12}>
                <div className="page-title-box">
                    <h4 className="page-title">계정 설정</h4>
                </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                <Card>
                    <Card.Body>
                                    {userEmail ? 
                                    <Form
                                        onSubmit={editUserInfo}
                                        schema={schema}
                                        defaultValues={{
                                            username: userInfo.username,
                                            oldpassword: '',
                                            password: '',
                                            email: userEmail,
                                        }}
                                        className='edit-form'
                                    >

                                        <TextInputReadOnly
                                            label={t('ID')}
                                            type="text"
                                            name="username"
                                            readOnly
                                            className='form-control-light'
                                        />

                                        <PasswordInput
                                            label={t('Old Password')}
                                            name="oldpassword"
                                            placeholder={t('비밀번호')}
                                            className={`${errorAni}`}
                                        />

                                        <PasswordInput
                                            label={t('New Password')}
                                            name="password"
                                            placeholder={t('비밀번호')}
                                            className={`${errorAni}`}
                                        />

                                        <TextInput
                                            label={t('E-mail')}
                                            type="text"
                                            name="email"
                                            className={`${errorAni}`}
                                        />

                                        <div className="mb-3 text-center">
                                            {loading ?
                                            <Spinner color='primary' size='sm' className='m-auto'/>
                                            :
                                            <Button variant="primary" type="submit" onClick={() => handleErrorAni()}>
                                                {t('정보 수정')}
                                            </Button>
                                            }
                                        </div>
                    
                                    </Form>
                                    : <div className='edit-spinner-wrapper'><Spinner color='primary' size='sm' className='m-auto'/></div>}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </>
    )
}

export default Account