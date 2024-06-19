import { contactApi } from '@/common/api';
import { useState } from 'react';

export default function useContact() {
	
	const [ loading, setLoading ] = useState(false);
	const [ statusMessage, setStatusMessage ] = useState({})
	
	const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const inquiry = async (e) => {
        e.preventDefault();
		setLoading(true);

        const formData = new FormData();

        if(selectedFile) {
            formData.append('file', selectedFile);
        }

        formData.append('company', e.target.company.value);
        formData.append('name', e.target.name.value);
        formData.append('phone', e.target.tel.value);
        formData.append('email', e.target.email.value);
        formData.append('field', e.target.field.value);
        formData.append('content', e.target.content.value);

        try {
            const res = await contactApi.contact(formData);
            if(res) {
				e.target.reset();
                setSelectedFile(null);
                setLoading(false);
				setStatusMessage({message: '문의 등록이 완료되었습니다.', status: 'success'})
				setTimeout(() => setStatusMessage(''), 4000);
            }
        } catch (error) {
			setStatusMessage({message: '문의 등록이 실패하였습니다. 다시 시도해주세요.', status: 'fail'})
			setTimeout(() => setStatusMessage(''), 4000);
        }
    }

	return { loading, handleFileChange, inquiry, statusMessage };
}
