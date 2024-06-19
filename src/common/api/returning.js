import HttpClient from '../helpers/httpClient';


function Returning() {

  return {
        returningDay: (date) => {
            // console.log("returning_day", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/returning', {
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


        returningWeek: (date) => {
            // console.log("returning_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/returning', {
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


        returningMonth: (date) => {
            // console.log("returning_month", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/returning', {
                    day: date,
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

export default Returning();
