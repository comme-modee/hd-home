import { contactApi } from "@/common";
import { useState } from "react";

export default function useContactList () {

    const [data, setData] = useState('');

    const getContactList = async () => {
        try {
            const res = await contactApi.getContactList();
            if(!res) throw new Error('There is no data')
            const sortData = res.list.sort((a, b) => b.idx - a.idx)
            setData(sortData)
        } catch (error) {
            console.log(error)
        }
    }
    return { data, getContactList };
}