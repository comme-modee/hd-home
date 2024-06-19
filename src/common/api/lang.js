import HttpClient from '../helpers/httpClient';


function Lang() {

  return {
        langDay: (date) => {
            // console.log("lang_day", date)

            return new Promise(function (resolve, reject) { 
                try {
                    HttpClient.post('/adminapi/visitor/languageSetting', {
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


        langWeek: (date) => {
            // console.log("lang_week", date)
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/languageSetting', {
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


        langMonth: (date) => {
            // console.log("lang_month", date)

            const sliceDate = date.slice(0,7);
    
            return new Promise(function (resolve, reject) { 
                try {
                HttpClient.post('/adminapi/visitor/languageSetting', {
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

export default Lang();
