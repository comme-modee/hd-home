import HttpClient from '../helpers/httpClient';


function Pageview() {

  return {
        pageviewDay: (date) => {
            // console.log("pageview_day", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/visitor/visitedPage', {
                        day: date,
                        type: 'D'
                    })
                    .then(response => {
                    resolve(response);
                    // console.log("day data", response)
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


        pageviewWeek: (date) => {
            // console.log("pageview_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/visitedPage', {
                    day: date,
                    type: 'W'
                })
                .then(response => {
                    resolve(response);
                    // console.log("week data", response)
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


        pageviewMonth: (date) => {
            // console.log("pageview_month", date)

            const sliceDate = date.slice(0,7);
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/visitedPage', {
                    day: sliceDate,
                    type: 'M'
                })
                .then(response => {
                    resolve(response);
                    // console.log("month data", response)
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

export default Pageview();
