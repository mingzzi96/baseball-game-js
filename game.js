let computerNum = generateRandomNumber();
let attempt = 0;

// 1. 렌덤 숫자 생성
function generateRandomNumber() {
  // 중복을 방지해주는 Set 객체 생성
  let numbers = new Set();
  while (numbers.size < 3) {
    // 랜덤 숫자를 생성해서 객체에 넣어줌. Math.floor로 소숫점이하 제거
    let num = Math.floor(Math.random() * 10);
    numbers.add(num);
  }
  // 배열로 만들어주고 join 메서드 활용해서 하나로 뭉쳐줌
  return Array.from(numbers).join("");
}

// 2. 렌덤 숫자 생성
// computerNum: 렌덤 숫자, userNum: user가 입력한 숫자
function getStrikeAndBall(computerNum, userNum) {
  let strike = 0;
  let ball = 0;

  // 인자로 들어온 두 값을 비교한다.
  for (let i = 0; i < 3; i++) {
    if (computerNum[i] === userNum[i]) {
      // 값과 위치가 같으면? strike에 숫자를 올려줌
      strike++;
    } else if (computerNum.includes(userNum[i])) {
      // 위치는 틀렸지만, 랜덤 숫자 안에 userNum이 들어있으면? ball 숫자를 올려줌
      ball++;
    }
  }

  return { strike, ball };
}

// 3. 사용자가 입력한 값을 input에서 가져오기.
function playGame() {
  let userNum = document.getElementById("user-input").value;
  if (userNum.length !== 3 || isNaN(userNum)) {
    alert("숫자 3개를 정확히 입력하세요.");
    return;
  }

  attempt++;
  let result = getStrikeAndBall(computerNum, userNum);
  displayResult(attempt, userNum, result);

  if (isGameFinished(result)) {
    document.getElementById(
      "result"
    ).innerHTML += `<p>${attempt}번만에 맞히셨습니다. 게임을 종료합니다.</p>`;
    document.getElementById("user-input").disabled = true;
    document.querySelector("button").disabled = true;
  }
}

// 4. 결과를 html에 출력
function displayResult(attempt, userNum, result) {
  document.getElementById(
    "result"
  ).innerHTML += `<p>${attempt}번째 시도: ${userNum} - ${result.ball}B${result.strike}S</p>`;
}

// 5. strike 숫자가 3이면 게임 종료
function isGameFinished(result) {
  return result.strike === 3;
}
