import { portfolioApi } from '@/common/api';
import { useState } from 'react';

export default function usePortfolio() {
	
    const [ portfolioList, setPortfolioList ] = useState(null);
    const [ dataLoading, setDataLoaing ] = useState(null)
	const [ addLoading, setAddLoading ] = useState(false);
	const [ editLoading, setEditLoading ] = useState(false);
	const [ sortLoading, setSortLoading ] = useState(false);
	
	const [ mainImg, setMainImg ] = useState(null);
	const [ thumbnail, setThumbnail ] = useState(null);

    const handleMainImgChange = (event) => {
        setMainImg(event.target.files[0]);
    };

    const handleThumbnailChange = (event) => {
        setThumbnail(event.target.files[0]);
    };

    const getPortfolioList = async () => {
        setDataLoaing(true)
        try {
            const res = await portfolioApi.getPortfolio();
            if(res) {
                const sortData = res.list.sort((a, b)=> a.pt_sort - b.pt_sort);
                // console.log("sortData", sortData)
                setPortfolioList(sortData)
                setDataLoaing(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sortData = async (seqList) => {
        setSortLoading(true)
        try {
            const res = await portfolioApi.sortPortfolioList(seqList)
            if(res) {
                setSortLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const inquiry = async (data) => {
        const { mode, portfolioData } = data;
        // console.log(data)
        // console.log('데이터 받아옴', portfolioData, 'mode는', mode)

        if(mode === 'new') {
            setAddLoading(true);
    
            const formData = new FormData();
            
            formData.append('pt_img', mainImg);
            formData.append('pt_thumbnail', thumbnail);
            formData.append('pt_name', portfolioData.pt_name);
            formData.append('pt_goal', portfolioData.pt_goal);
            formData.append('pt_goal_c', portfolioData.pt_goal_c);
            formData.append('pt_manage', portfolioData.pt_manage);
            formData.append('pt_manage_c', portfolioData.pt_manage_c);
            formData.append('pt_activity', portfolioData.pt_activity);
            formData.append('pt_activity_c', portfolioData.pt_activity_c);
    
            try {
                const res = await portfolioApi.addPortfolio(formData);
                console.log('포트폴리오 등록', res)
                if(res) {
                    setAddLoading(false);
                }
            } catch (error) {
            	console.log(error)
            }
        }
        if(mode === 'edit') {
            console.log('수정하겠음', portfolioData)
            setEditLoading(true)
    
            const formData = new FormData();

            //mainImg와 thumbnail은 새로 업데이트하는 파일이 있다면 그 파일을 보내고, 없다면 ''로 보내서 기존 파일을 유지시킨다.
            formData.append('pt_img', mainImg || '') 
            formData.append('pt_thumbnail', thumbnail || '') 

            formData.append('pt_seq', portfolioData.pt_seq);
            formData.append('pt_name', portfolioData.pt_name);
            formData.append('pt_goal', portfolioData.pt_goal);
            formData.append('pt_goal_c', portfolioData.pt_goal_c);
            formData.append('pt_manage', portfolioData.pt_manage);
            formData.append('pt_manage_c', portfolioData.pt_manage_c);
            formData.append('pt_activity', portfolioData.pt_activity);
            formData.append('pt_activity_c', portfolioData.pt_activity_c);

            try {
                const res = await portfolioApi.editPortfolio(formData);
                console.log('포트폴리오 수정', res)
                if(res) {
                    setEditLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

	return { portfolioList, sortLoading, sortData, getPortfolioList, dataLoading, addLoading, editLoading, setMainImg, setThumbnail, handleMainImgChange, handleThumbnailChange, inquiry };
}
