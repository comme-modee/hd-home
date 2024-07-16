import HttpClient from '../helpers/httpClient';


function Portfolio() {

  return {
        addPortfolio: (portfolioData) => {
            // console.log('portfolio api in', portfolioData)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/portfolio', portfolioData, {
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

        getPortfolio: () => {
            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.get('/adminapi/portfolio')
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

        getSinglePortfolio: (seq) => {
            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.get(`/adminapi/portfolio/${seq}`)
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

        editPortfolio: (portfolioData) => {
            // console.log('edit portfolio api in', portfolioData)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.put('/adminapi/portfolio', portfolioData, {
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

        deletePortfolio: (seq) => {
            // console.log('delete portfolio api in', seq)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.delete(`/adminapi/portfolio/${seq}`, {
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

        sortPortfolioList: (seqList) => {
            // console.log('sort portfolio api in', seqList)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.put('/adminapi/portfolio/sort', {
                        seq_list: seqList
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

    };
}

export default Portfolio();
