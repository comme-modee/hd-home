import HttpClient from '../helpers/httpClient';


function Visitor() {

  return {
        visitorTime: (date) => {
            // console.log("visitor_time", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/visitor_time', {
                        date
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


        visitorWeek: (date) => {
            // console.log("visitor_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor_week', {
                    date
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


        visitorMonth: (date) => {
            // console.log("visitor_month", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor_month', {
                    date
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

export default Visitor();
