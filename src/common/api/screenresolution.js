import HttpClient from '../helpers/httpClient';


function Screenresolution() {

  return {
        screenresolutionDay: (date) => {
            // console.log("screenresolution_day", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/visitor/screenResolution', {
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


        screenresolutionWeek: (date) => {
            // console.log("screenresolution_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/screenResolution', {
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


        screenresolutionMonth: (date) => {
            // console.log("screenresolution_month", date)

            const sliceDate = date.slice(0,7);
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/screenResolution', {
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

export default Screenresolution();
