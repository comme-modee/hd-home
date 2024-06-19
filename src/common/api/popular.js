import HttpClient from '../helpers/httpClient';


function Popular() {

  return {
        popularDay: (date) => {
            // console.log("popular_day", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/visitorstay', {
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


        popularWeek: (date) => {
            // console.log("popular_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitorstay', {
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


        popularMonth: (date) => {
            // console.log("popular_month", date)

            const sliceDate = date.slice(0,7);
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitorstay', {
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

export default Popular();
