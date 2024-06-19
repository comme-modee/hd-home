import HttpClient from '../helpers/httpClient';

function AuthService() {
  
  return {
    login: (values) => {
      // console.log("login", values)
      
      return new Promise(function (resolve, reject) {
        setTimeout(function () {        
        
          try {
            HttpClient.post('/api/auth/login/', {
              username: values.username,
              password: values.password,
            })
            .then(response => {
              // console.log("1", response)

              let userInfo = 
                {
                  role: response.role,
                  phone: response.phone,
                  email: response.email,
                  token: response.token,
                  username: response.username,
                };

              // console.log('userInfo:', userInfo);
              localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
              resolve(userInfo);
              // resolve([200, users]);
            })
            .catch(error => {
              console.error(error, "1");
              reject("아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.");
            });
          } catch (error) {
            console.error('오류 발생:', error);
          }

        }, 500);
      });
        
      

    },


    logout() {
      return HttpClient.post('/api/logout/', {});
    },


    register: (values) => {

      // console.log("join", values)

      return new Promise(function (resolve, reject) {
        setTimeout(function () {        

          try {
            HttpClient.post('/api/join', {
              username: values.username,
							password: values.password,
							phone: values.phone,
							email: values.email
            })
            .then(response => {
              if(response) {
                resolve(response);
              } else {
                reject("동일한 아이디가 존재합니다. 다른 아이디를 입력해주세요.");
              }
            })
            .catch(error => {
              console.error(error, "1");
            });
          } catch (error) {
            console.error('오류 발생:', error);
          }

        }, 500);
      });


      // return HttpClient.post('/register/', values);
    },

    editUserInfo: (values) => {
      // console.log(values, "--- 정보 수정 요청 중 ---")

      return new Promise(function (resolve, reject) {
        setTimeout(function () {        

          try {
            HttpClient.put('/adminapi/changeinfo', {
              oldpassword: values.oldpassword,
              password: values.password,
              email: values.email
            })
            .then(response => {
                resolve(response);
                // localStorage.setItem('userInfo', JSON.stringify(response))
            })
            .catch(error => {
              console.error(error, "1");
            });
          } catch (error) {
            console.error('오류 발생:', error);
          }

        }, 500);
      });
    },

    getEmail: () => {

      return new Promise(function (resolve, reject) {
        setTimeout(function () {        

          try {
            HttpClient.get('/adminapi/emailget')
            .then(response => {
                resolve(response);
            })
            .catch(error => {
              console.error(error, "1");
            });
          } catch (error) {
            console.error('오류 발생:', error);
          }

        }, 500);
      });
    },


    forgetPassword: (values) => {
      return HttpClient.post('/forget-password/', values);
    },
  };
}

export default AuthService();
