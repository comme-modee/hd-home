import HttpClient from '../helpers/httpClient';


function Contact() {

  return {
        contact: (formData) => {
            // console.log('contact api in')

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/contact', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                    resolve(response);
                    })
                    .catch(error => {
                    console.error(error, "1");
                    reject(error);
                    });
                } catch (error) {
                    console.error('오류 발생:', error);
                }
            });
        },

        getContactList: () => {
            // console.log('get contact list')

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.get('/adminapi/contact')
                    .then(response => {
                    resolve(response);
                    })
                    .catch(error => {
                    console.error(error, "1");
                    reject(error);
                    });
                } catch (error) {
                    console.error('오류 발생:', error);
                }
            });
        },

        switchContactFlag: (item) => {
            // console.log('switch flag', item)
            // console.log(typeof item.idx)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/switch', {
                      idx: item.idx,
                      flag: item.flag
                    })
                    .then(response => {
                    resolve(response);
                    })
                    .catch(error => {
                    console.error(error, "1");
                    reject(error);
                    });
                } catch (error) {
                    console.error('오류 발생:', error);
                }
            });
        }
    };
}

export default Contact();
