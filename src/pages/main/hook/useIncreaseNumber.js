// const increaseNumber = (element, maxNum) => {
//     let now = maxNum;

//     const handle = setInterval(() => {
//         let step = now / 10;
//         now -= step;
//         console.log("22", now, step)

//         element.innerHTML = Math.ceil(maxNum - now).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//         if(now < 1) clearInterval(handle)
//     }, 20)
// }

// export default increaseNumber;


const increaseNumber = (element, maxNum) => {
  let maxNumLength = maxNum.toString().length;

  let now = Math.pow(10, maxNumLength - 1);

  let interval;
  if (maxNumLength === 4) {
    interval = 0.1;
  } else if (maxNumLength === 3) {
    interval = 2;
  } else {
    interval = 5;
  }

  const handle = setInterval(() => {
      now++;
      let numString = Math.floor(now).toString(); // 숫자를 문자열로 변환
      let formattedNumber = numString.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // 세 번째 자리마다 콤마를 추가

      element.innerHTML = formattedNumber;

      if (now >= maxNum) {
          clearInterval(handle);
      }
  }, interval);
};
  
export default increaseNumber;