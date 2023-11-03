
// Global passengers map for test
const passengerMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0., 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
]

function euclideanDistance(passengerPosition, driverPositionX, driverPositionY) {
  return Math.sqrt((passengerPosition[0] - driverPositionX) ** 2 + 
                   (passengerPosition[1] - driverPositionY) ** 2);
}

function stringKmFormat(distance) {
  return `${distance.toFixed(2)} km`;
}

function updateClosestPassengerAndDistance(currentX, currentY, driverPosX, driverPosY, newRide) {
  const currentPosition = [currentX, currentY];
  if(passengerMap[currentPosition[0]][currentPosition[1]] != 1)
    return;
  const currentDistance = euclideanDistance(currentPosition, driverPosX, driverPosY);
  if(currentDistance < newRide[1]) {
    newRide[0] = currentPosition;
    newRide[1] = currentDistance;
  }
}

function findNewRide(driverPositionX, driverPositionY) {
  /*if(passengerMap[driverPositionX][driverPositionY] == 1)
    return [[driverPositionX, driverPositionY], '0.00 km'];*/
  const passengerMapLength = passengerMap.length;
  // Inicializando a posição com valores impossíveis
  // Inicializando a distância com um valor maior do que qualquer distância possível
  let newRide = [[-1, -1], passengerMapLength*2];
  let i = 0;
  // Verificando se o passageiro mais próximo não está na mesma linha X ou coluna Y
  for(; i < driverPositionY; i++)
    updateClosestPassengerAndDistance(driverPositionX, i, driverPositionX, driverPositionY, newRide);
  for(i = driverPositionY+1; i < passengerMapLength; i++)
    updateClosestPassengerAndDistance(driverPositionX, i, driverPositionX, driverPositionY, newRide);
  for(i = 0; i < driverPositionX; i++)
    updateClosestPassengerAndDistance(i, driverPositionY, driverPositionX, driverPositionY, newRide);
  for(i = driverPositionX+1; i < passengerMapLength; i++)
    updateClosestPassengerAndDistance(i, driverPositionY, driverPositionX, driverPositionY, newRide);
  /* Atualizando o passageiro mais próximo e sua distância a partir das linhas e colunas mais próximas
     ao motorista de acordo com um raio crescente dele a elas */
  let radius = 1;
  let intersectionNegY, intersectionNegX, currentLine;
  do{
    intersectionNegY = driverPositionY - radius;
    if(intersectionNegY > -1)
      for(i = 0; i < passengerMapLength; i++)
        updateClosestPassengerAndDistance(i, intersectionNegY, driverPositionX, driverPositionY, newRide);
    intersectionNegX = driverPositionX - radius;
    if(intersectionNegX > -1){
      for(i = 0; i < intersectionNegX; i++)
        updateClosestPassengerAndDistance(intersectionNegX, i, driverPositionX, driverPositionY, newRide);
      for(i = intersectionNegX+1; i < passengerMapLength; i++)
        updateClosestPassengerAndDistance(intersectionNegX, i, driverPositionX, driverPositionY, newRide);
    }
    currentLine = driverPositionX + radius;
    if(currentLine < passengerMapLength){
      for(i = 0; i < intersectionNegY; i++)
        updateClosestPassengerAndDistance(currentLine, i, driverPositionX, driverPositionY, newRide);
      for(i = intersectionNegY+1; i < passengerMapLength; i++)
        updateClosestPassengerAndDistance(currentLine, i, driverPositionX, driverPositionY, newRide);
    }
    currentLine = driverPositionY + radius;
    if(currentLine < passengerMapLength){
      for(i = 0; i < intersectionNegX; i++)
        updateClosestPassengerAndDistance(i, currentLine, driverPositionX, driverPositionY, newRide);
      for(i = intersectionNegX+1; i < currentLine; i++)
        updateClosestPassengerAndDistance(i, currentLine, driverPositionX, driverPositionY, newRide);
      for(i = currentLine+1; i < passengerMapLength; i++)
        updateClosestPassengerAndDistance(i, currentLine, driverPositionX, driverPositionY, newRide);
    }
    if(newRide[0][0] != -1)
      break;
    radius++;
  }while(true);
  for (let i = 0; i < passengerMapLength; i++)
    for (let j = 0; j < passengerMapLength; j++)
      updateClosestPassengerAndDistance(i, j, driverPositionX, driverPositionY, newRide);
  newRide[1] = stringKmFormat(newRide[1]);
  return newRide;
}

// Tests, do not change, comment/uncomment for use.
console.log(findNewRide(0, 0).toString() == [[7, 0], '7.00 km'] ? '\033[32mPASS [0,0]\033' : '\033[31mFAIL [0,0]\033')
console.log(findNewRide(0, 1).toString() == [[1, 7], '6.08 km'] ? '\033[32mPASS [0,1]\033' : '\033[31mFAIL [0,1]\033')
console.log(findNewRide(0, 2).toString() == [[1, 7], '5.10 km'] ? '\033[32mPASS [0,2]\033' : '\033[31mFAIL [0,2]\033')
console.log(findNewRide(0, 3).toString() == [[1, 7], '4.12 km'] ? '\033[32mPASS [0,3]\033' : '\033[31mFAIL [0,3]\033')
console.log(findNewRide(0, 4).toString() == [[1, 7], '3.16 km'] ? '\033[32mPASS [0,4]\033' : '\033[31mFAIL [0,4]\033')
console.log(findNewRide(0, 5).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [0,5]\033' : '\033[31mFAIL [0,5]\033')
console.log(findNewRide(0, 6).toString() == [[1, 7], '1.41 km'] ? '\033[32mPASS [0,6]\033' : '\033[31mFAIL [0,6]\033')
console.log(findNewRide(0, 7).toString() == [[1, 7], '1.00 km'] ? '\033[32mPASS [0,7]\033' : '\033[31mFAIL [0,7]\033')
console.log(findNewRide(0, 8).toString() == [[1, 7], '1.41 km'] ? '\033[32mPASS [0,8]\033' : '\033[31mFAIL [0,8]\033')
console.log(findNewRide(0, 9).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [0,9]\033' : '\033[31mFAIL [0,9]\033')
console.log(findNewRide(0, 10).toString() == [[1, 7], '3.16 km'] ? '\033[32mPASS [0,10]\033' : '\033[31mFAIL [0,10]\033')
console.log(findNewRide(0, 11).toString() == [[3, 11], '3.00 km'] ? '\033[32mPASS [0,11]\033' : '\033[31mFAIL [0,11]\033')
console.log(findNewRide(0, 12).toString() == [[3, 11], '3.16 km'] ? '\033[32mPASS [0,12]\033' : '\033[31mFAIL [0,12]\033')
console.log(findNewRide(0, 13).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [0,13]\033' : '\033[31mFAIL [0,13]\033')
console.log(findNewRide(0, 14).toString() == [[3, 11], '4.24 km'] ? '\033[32mPASS [0,14]\033' : '\033[31mFAIL [0,14]\033')
console.log(findNewRide(0, 15).toString() == [[3, 11], '5.00 km'] ? '\033[32mPASS [0,15]\033' : '\033[31mFAIL [0,15]\033')
console.log(findNewRide(1, 0).toString() == [[7, 0], '6.00 km'] ? '\033[32mPASS [1,0]\033' : '\033[31mFAIL [1,0]\033')
console.log(findNewRide(1, 1).toString() == [[1, 7], '6.00 km'] ? '\033[32mPASS [1,1]\033' : '\033[31mFAIL [1,1]\033')
console.log(findNewRide(1, 2).toString() == [[1, 7], '5.00 km'] ? '\033[32mPASS [1,2]\033' : '\033[31mFAIL [1,2]\033')
console.log(findNewRide(1, 3).toString() == [[1, 7], '4.00 km'] ? '\033[32mPASS [1,3]\033' : '\033[31mFAIL [1,3]\033')
console.log(findNewRide(1, 4).toString() == [[1, 7], '3.00 km'] ? '\033[32mPASS [1,4]\033' : '\033[31mFAIL [1,4]\033')
console.log(findNewRide(1, 5).toString() == [[1, 7], '2.00 km'] ? '\033[32mPASS [1,5]\033' : '\033[31mFAIL [1,5]\033')
console.log(findNewRide(1, 6).toString() == [[1, 7], '1.00 km'] ? '\033[32mPASS [1,6]\033' : '\033[31mFAIL [1,6]\033')
console.log(findNewRide(1, 7).toString() == [[1, 7], '0.00 km'] ? '\033[32mPASS [1,7]\033' : '\033[31mFAIL [1,7]\033')
console.log(findNewRide(1, 8).toString() == [[1, 7], '1.00 km'] ? '\033[32mPASS [1,8]\033' : '\033[31mFAIL [1,8]\033')
console.log(findNewRide(1, 9).toString() == [[1, 7], '2.00 km'] ? '\033[32mPASS [1,9]\033' : '\033[31mFAIL [1,9]\033')
console.log(findNewRide(1, 10).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [1,10]\033' : '\033[31mFAIL [1,10]\033')
console.log(findNewRide(1, 11).toString() == [[3, 11], '2.00 km'] ? '\033[32mPASS [1,11]\033' : '\033[31mFAIL [1,11]\033')
console.log(findNewRide(1, 12).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [1,12]\033' : '\033[31mFAIL [1,12]\033')
console.log(findNewRide(1, 13).toString() == [[3, 11], '2.83 km'] ? '\033[32mPASS [1,13]\033' : '\033[31mFAIL [1,13]\033')
console.log(findNewRide(1, 14).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [1,14]\033' : '\033[31mFAIL [1,14]\033')
console.log(findNewRide(1, 15).toString() == [[3, 11], '4.47 km'] ? '\033[32mPASS [1,15]\033' : '\033[31mFAIL [1,15]\033')
console.log(findNewRide(2, 0).toString() == [[7, 0], '5.00 km'] ? '\033[32mPASS [2,0]\033' : '\033[31mFAIL [2,0]\033')
console.log(findNewRide(2, 1).toString() == [[7, 0], '5.10 km'] ? '\033[32mPASS [2,1]\033' : '\033[31mFAIL [2,1]\033')
console.log(findNewRide(2, 2).toString() == [[1, 7], '5.10 km'] ? '\033[32mPASS [2,2]\033' : '\033[31mFAIL [2,2]\033')
console.log(findNewRide(2, 3).toString() == [[1, 7], '4.12 km'] ? '\033[32mPASS [2,3]\033' : '\033[31mFAIL [2,3]\033')
console.log(findNewRide(2, 4).toString() == [[1, 7], '3.16 km'] ? '\033[32mPASS [2,4]\033' : '\033[31mFAIL [2,4]\033')
console.log(findNewRide(2, 5).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [2,5]\033' : '\033[31mFAIL [2,5]\033')
console.log(findNewRide(2, 6).toString() == [[1, 7], '1.41 km'] ? '\033[32mPASS [2,6]\033' : '\033[31mFAIL [2,6]\033')
console.log(findNewRide(2, 7).toString() == [[1, 7], '1.00 km'] ? '\033[32mPASS [2,7]\033' : '\033[31mFAIL [2,7]\033')
console.log(findNewRide(2, 8).toString() == [[1, 7], '1.41 km'] ? '\033[32mPASS [2,8]\033' : '\033[31mFAIL [2,8]\033')
console.log(findNewRide(2, 9).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [2,9]\033' : '\033[31mFAIL [2,9]\033')
console.log(findNewRide(2, 10).toString() == [[3, 11], '1.41 km'] ? '\033[32mPASS [2,10]\033' : '\033[31mFAIL [2,10]\033')
console.log(findNewRide(2, 11).toString() == [[3, 11], '1.00 km'] ? '\033[32mPASS [2,11]\033' : '\033[31mFAIL [2,11]\033')
console.log(findNewRide(2, 12).toString() == [[3, 11], '1.41 km'] ? '\033[32mPASS [2,12]\033' : '\033[31mFAIL [2,12]\033')
console.log(findNewRide(2, 13).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [2,13]\033' : '\033[31mFAIL [2,13]\033')
console.log(findNewRide(2, 14).toString() == [[3, 11], '3.16 km'] ? '\033[32mPASS [2,14]\033' : '\033[31mFAIL [2,14]\033')
console.log(findNewRide(2, 15).toString() == [[3, 11], '4.12 km'] ? '\033[32mPASS [2,15]\033' : '\033[31mFAIL [2,15]\033')
console.log(findNewRide(3, 0).toString() == [[7, 0], '4.00 km'] ? '\033[32mPASS [3,0]\033' : '\033[31mFAIL [3,0]\033')
console.log(findNewRide(3, 1).toString() == [[7, 0], '4.12 km'] ? '\033[32mPASS [3,1]\033' : '\033[31mFAIL [3,1]\033')
console.log(findNewRide(3, 2).toString() == [[7, 0], '4.47 km'] ? '\033[32mPASS [3,2]\033' : '\033[31mFAIL [3,2]\033')
console.log(findNewRide(3, 3).toString() == [[1, 7], '4.47 km'] ? '\033[32mPASS [3,3]\033' : '\033[31mFAIL [3,3]\033')
console.log(findNewRide(3, 4).toString() == [[1, 7], '3.61 km'] ? '\033[32mPASS [3,4]\033' : '\033[31mFAIL [3,4]\033')
console.log(findNewRide(3, 5).toString() == [[1, 7], '2.83 km'] ? '\033[32mPASS [3,5]\033' : '\033[31mFAIL [3,5]\033')
console.log(findNewRide(3, 6).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [3,6]\033' : '\033[31mFAIL [3,6]\033')
console.log(findNewRide(3, 7).toString() == [[1, 7], '2.00 km'] ? '\033[32mPASS [3,7]\033' : '\033[31mFAIL [3,7]\033')
console.log(findNewRide(3, 8).toString() == [[1, 7], '2.24 km'] ? '\033[32mPASS [3,8]\033' : '\033[31mFAIL [3,8]\033')
console.log(findNewRide(3, 9).toString() == [[3, 11], '2.00 km'] ? '\033[32mPASS [3,9]\033' : '\033[31mFAIL [3,9]\033')
console.log(findNewRide(3, 10).toString() == [[3, 11], '1.00 km'] ? '\033[32mPASS [3,10]\033' : '\033[31mFAIL [3,10]\033')
console.log(findNewRide(3, 11).toString() == [[3, 11], '0.00 km'] ? '\033[32mPASS [3,11]\033' : '\033[31mFAIL [3,11]\033')
console.log(findNewRide(3, 12).toString() == [[3, 11], '1.00 km'] ? '\033[32mPASS [3,12]\033' : '\033[31mFAIL [3,12]\033')
console.log(findNewRide(3, 13).toString() == [[3, 11], '2.00 km'] ? '\033[32mPASS [3,13]\033' : '\033[31mFAIL [3,13]\033')
console.log(findNewRide(3, 14).toString() == [[3, 11], '3.00 km'] ? '\033[32mPASS [3,14]\033' : '\033[31mFAIL [3,14]\033')
console.log(findNewRide(3, 15).toString() == [[3, 11], '4.00 km'] ? '\033[32mPASS [3,15]\033' : '\033[31mFAIL [3,15]\033')
console.log(findNewRide(4, 0).toString() == [[7, 0], '3.00 km'] ? '\033[32mPASS [4,0]\033' : '\033[31mFAIL [4,0]\033')
console.log(findNewRide(4, 1).toString() == [[7, 0], '3.16 km'] ? '\033[32mPASS [4,1]\033' : '\033[31mFAIL [4,1]\033')
console.log(findNewRide(4, 2).toString() == [[7, 0], '3.61 km'] ? '\033[32mPASS [4,2]\033' : '\033[31mFAIL [4,2]\033')
console.log(findNewRide(4, 3).toString() == [[7, 0], '4.24 km'] ? '\033[32mPASS [4,3]\033' : '\033[31mFAIL [4,3]\033')
console.log(findNewRide(4, 4).toString() == [[1, 7], '4.24 km'] ? '\033[32mPASS [4,4]\033' : '\033[31mFAIL [4,4]\033')
console.log(findNewRide(4, 5).toString() == [[1, 7], '3.61 km'] ? '\033[32mPASS [4,5]\033' : '\033[31mFAIL [4,5]\033')
console.log(findNewRide(4, 6).toString() == [[1, 7], '3.16 km'] ? '\033[32mPASS [4,6]\033' : '\033[31mFAIL [4,6]\033')
console.log(findNewRide(4, 7).toString() == [[1, 7], '3.00 km'] ? '\033[32mPASS [4,7]\033' : '\033[31mFAIL [4,7]\033')
console.log(findNewRide(4, 8).toString() == [[1, 7], '3.16 km'] ? '\033[32mPASS [4,8]\033' : '\033[31mFAIL [4,8]\033')
console.log(findNewRide(4, 9).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [4,9]\033' : '\033[31mFAIL [4,9]\033')
console.log(findNewRide(4, 10).toString() == [[3, 11], '1.41 km'] ? '\033[32mPASS [4,10]\033' : '\033[31mFAIL [4,10]\033')
console.log(findNewRide(4, 11).toString() == [[3, 11], '1.00 km'] ? '\033[32mPASS [4,11]\033' : '\033[31mFAIL [4,11]\033')
console.log(findNewRide(4, 12).toString() == [[3, 11], '1.41 km'] ? '\033[32mPASS [4,12]\033' : '\033[31mFAIL [4,12]\033')
console.log(findNewRide(4, 13).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [4,13]\033' : '\033[31mFAIL [4,13]\033')
console.log(findNewRide(4, 14).toString() == [[3, 11], '3.16 km'] ? '\033[32mPASS [4,14]\033' : '\033[31mFAIL [4,14]\033')
console.log(findNewRide(4, 15).toString() == [[3, 11], '4.12 km'] ? '\033[32mPASS [4,15]\033' : '\033[31mFAIL [4,15]\033')
console.log(findNewRide(5, 0).toString() == [[7, 0], '2.00 km'] ? '\033[32mPASS [5,0]\033' : '\033[31mFAIL [5,0]\033')
console.log(findNewRide(5, 1).toString() == [[7, 0], '2.24 km'] ? '\033[32mPASS [5,1]\033' : '\033[31mFAIL [5,1]\033')
console.log(findNewRide(5, 2).toString() == [[7, 0], '2.83 km'] ? '\033[32mPASS [5,2]\033' : '\033[31mFAIL [5,2]\033')
console.log(findNewRide(5, 3).toString() == [[7, 0], '3.61 km'] ? '\033[32mPASS [5,3]\033' : '\033[31mFAIL [5,3]\033')
console.log(findNewRide(5, 4).toString() == [[7, 0], '4.47 km'] ? '\033[32mPASS [5,4]\033' : '\033[31mFAIL [5,4]\033')
console.log(findNewRide(5, 5).toString() == [[1, 7], '4.47 km'] ? '\033[32mPASS [5,5]\033' : '\033[31mFAIL [5,5]\033')
console.log(findNewRide(5, 6).toString() == [[1, 7], '4.12 km'] ? '\033[32mPASS [5,6]\033' : '\033[31mFAIL [5,6]\033')
console.log(findNewRide(5, 7).toString() == [[1, 7], '4.00 km'] ? '\033[32mPASS [5,7]\033' : '\033[31mFAIL [5,7]\033')
console.log(findNewRide(5, 8).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [5,8]\033' : '\033[31mFAIL [5,8]\033')
console.log(findNewRide(5, 9).toString() == [[3, 11], '2.83 km'] ? '\033[32mPASS [5,9]\033' : '\033[31mFAIL [5,9]\033')
console.log(findNewRide(5, 10).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [5,10]\033' : '\033[31mFAIL [5,10]\033')
console.log(findNewRide(5, 11).toString() == [[3, 11], '2.00 km'] ? '\033[32mPASS [5,11]\033' : '\033[31mFAIL [5,11]\033')
console.log(findNewRide(5, 12).toString() == [[3, 11], '2.24 km'] ? '\033[32mPASS [5,12]\033' : '\033[31mFAIL [5,12]\033')
console.log(findNewRide(5, 13).toString() == [[3, 11], '2.83 km'] ? '\033[32mPASS [5,13]\033' : '\033[31mFAIL [5,13]\033')
console.log(findNewRide(5, 14).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [5,14]\033' : '\033[31mFAIL [5,14]\033')
console.log(findNewRide(5, 15).toString() == [[3, 11], '4.47 km'] ? '\033[32mPASS [5,15]\033' : '\033[31mFAIL [5,15]\033')
console.log(findNewRide(6, 0).toString() == [[7, 0], '1.00 km'] ? '\033[32mPASS [6,0]\033' : '\033[31mFAIL [6,0]\033')
console.log(findNewRide(6, 1).toString() == [[7, 0], '1.41 km'] ? '\033[32mPASS [6,1]\033' : '\033[31mFAIL [6,1]\033')
console.log(findNewRide(6, 2).toString() == [[7, 0], '2.24 km'] ? '\033[32mPASS [6,2]\033' : '\033[31mFAIL [6,2]\033')
console.log(findNewRide(6, 3).toString() == [[7, 0], '3.16 km'] ? '\033[32mPASS [6,3]\033' : '\033[31mFAIL [6,3]\033')
console.log(findNewRide(6, 4).toString() == [[7, 0], '4.12 km'] ? '\033[32mPASS [6,4]\033' : '\033[31mFAIL [6,4]\033')
console.log(findNewRide(6, 5).toString() == [[7, 0], '5.10 km'] ? '\033[32mPASS [6,5]\033' : '\033[31mFAIL [6,5]\033')
console.log(findNewRide(6, 6).toString() == [[1, 7], '5.10 km'] ? '\033[32mPASS [6,6]\033' : '\033[31mFAIL [6,6]\033')
console.log(findNewRide(6, 7).toString() == [[1, 7], '5.00 km'] ? '\033[32mPASS [6,7]\033' : '\033[31mFAIL [6,7]\033')
console.log(findNewRide(6, 8).toString() == [[3, 11], '4.24 km'] ? '\033[32mPASS [6,8]\033' : '\033[31mFAIL [6,8]\033')
console.log(findNewRide(6, 9).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [6,9]\033' : '\033[31mFAIL [6,9]\033')
console.log(findNewRide(6, 10).toString() == [[3, 11], '3.16 km'] ? '\033[32mPASS [6,10]\033' : '\033[31mFAIL [6,10]\033')
console.log(findNewRide(6, 11).toString() == [[3, 11], '3.00 km'] ? '\033[32mPASS [6,11]\033' : '\033[31mFAIL [6,11]\033')
console.log(findNewRide(6, 12).toString() == [[3, 11], '3.16 km'] ? '\033[32mPASS [6,12]\033' : '\033[31mFAIL [6,12]\033')
console.log(findNewRide(6, 13).toString() == [[3, 11], '3.61 km'] ? '\033[32mPASS [6,13]\033' : '\033[31mFAIL [6,13]\033')
console.log(findNewRide(6, 14).toString() == [[10, 13], '4.12 km'] ? '\033[32mPASS [6,14]\033' : '\033[31mFAIL [6,14]\033')
console.log(findNewRide(6, 15).toString() == [[10, 13], '4.47 km'] ? '\033[32mPASS [6,15]\033' : '\033[31mFAIL [6,15]\033')
console.log(findNewRide(7, 0).toString() == [[7, 0], '0.00 km'] ? '\033[32mPASS [7,0]\033' : '\033[31mFAIL [7,0]\033')
console.log(findNewRide(7, 1).toString() == [[7, 0], '1.00 km'] ? '\033[32mPASS [7,1]\033' : '\033[31mFAIL [7,1]\033')
console.log(findNewRide(7, 2).toString() == [[7, 0], '2.00 km'] ? '\033[32mPASS [7,2]\033' : '\033[31mFAIL [7,2]\033')
console.log(findNewRide(7, 3).toString() == [[7, 0], '3.00 km'] ? '\033[32mPASS [7,3]\033' : '\033[31mFAIL [7,3]\033')
console.log(findNewRide(7, 4).toString() == [[7, 0], '4.00 km'] ? '\033[32mPASS [7,4]\033' : '\033[31mFAIL [7,4]\033')
console.log(findNewRide(7, 5).toString() == [[7, 0], '5.00 km'] ? '\033[32mPASS [7,5]\033' : '\033[31mFAIL [7,5]\033')
console.log(findNewRide(7, 6).toString() == [[7, 0], '6.00 km'] ? '\033[32mPASS [7,6]\033' : '\033[31mFAIL [7,6]\033')
console.log(findNewRide(7, 7).toString() == [[3, 11], '5.66 km'] ? '\033[32mPASS [7,7]\033' : '\033[31mFAIL [7,7]\033')
console.log(findNewRide(7, 8).toString() == [[3, 11], '5.00 km'] ? '\033[32mPASS [7,8]\033' : '\033[31mFAIL [7,8]\033')
console.log(findNewRide(7, 9).toString() == [[3, 11], '4.47 km'] ? '\033[32mPASS [7,9]\033' : '\033[31mFAIL [7,9]\033')
console.log(findNewRide(7, 10).toString() == [[3, 11], '4.12 km'] ? '\033[32mPASS [7,10]\033' : '\033[31mFAIL [7,10]\033')
console.log(findNewRide(7, 11).toString() == [[10, 13], '3.61 km'] ? '\033[32mPASS [7,11]\033' : '\033[31mFAIL [7,11]\033')
console.log(findNewRide(7, 12).toString() == [[10, 13], '3.16 km'] ? '\033[32mPASS [7,12]\033' : '\033[31mFAIL [7,12]\033')
console.log(findNewRide(7, 13).toString() == [[10, 13], '3.00 km'] ? '\033[32mPASS [7,13]\033' : '\033[31mFAIL [7,13]\033')
console.log(findNewRide(7, 14).toString() == [[10, 13], '3.16 km'] ? '\033[32mPASS [7,14]\033' : '\033[31mFAIL [7,14]\033')
console.log(findNewRide(7, 15).toString() == [[10, 13], '3.61 km'] ? '\033[32mPASS [7,15]\033' : '\033[31mFAIL [7,15]\033')
console.log(findNewRide(8, 0).toString() == [[7, 0], '1.00 km'] ? '\033[32mPASS [8,0]\033' : '\033[31mFAIL [8,0]\033')
console.log(findNewRide(8, 1).toString() == [[7, 0], '1.41 km'] ? '\033[32mPASS [8,1]\033' : '\033[31mFAIL [8,1]\033')
console.log(findNewRide(8, 2).toString() == [[7, 0], '2.24 km'] ? '\033[32mPASS [8,2]\033' : '\033[31mFAIL [8,2]\033')
console.log(findNewRide(8, 3).toString() == [[7, 0], '3.16 km'] ? '\033[32mPASS [8,3]\033' : '\033[31mFAIL [8,3]\033')
console.log(findNewRide(8, 4).toString() == [[7, 0], '4.12 km'] ? '\033[32mPASS [8,4]\033' : '\033[31mFAIL [8,4]\033')
console.log(findNewRide(8, 5).toString() == [[7, 0], '5.10 km'] ? '\033[32mPASS [8,5]\033' : '\033[31mFAIL [8,5]\033')
console.log(findNewRide(8, 6).toString() == [[7, 0], '6.08 km'] ? '\033[32mPASS [8,6]\033' : '\033[31mFAIL [8,6]\033')
console.log(findNewRide(8, 7).toString() == [[10, 13], '6.32 km'] ? '\033[32mPASS [8,7]\033' : '\033[31mFAIL [8,7]\033')
console.log(findNewRide(8, 8).toString() == [[10, 13], '5.39 km'] ? '\033[32mPASS [8,8]\033' : '\033[31mFAIL [8,8]\033')
console.log(findNewRide(8, 9).toString() == [[10, 13], '4.47 km'] ? '\033[32mPASS [8,9]\033' : '\033[31mFAIL [8,9]\033')
console.log(findNewRide(8, 10).toString() == [[10, 13], '3.61 km'] ? '\033[32mPASS [8,10]\033' : '\033[31mFAIL [8,10]\033')
console.log(findNewRide(8, 11).toString() == [[10, 13], '2.83 km'] ? '\033[32mPASS [8,11]\033' : '\033[31mFAIL [8,11]\033')
console.log(findNewRide(8, 12).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [8,12]\033' : '\033[31mFAIL [8,12]\033')
console.log(findNewRide(8, 13).toString() == [[10, 13], '2.00 km'] ? '\033[32mPASS [8,13]\033' : '\033[31mFAIL [8,13]\033')
console.log(findNewRide(8, 14).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [8,14]\033' : '\033[31mFAIL [8,14]\033')
console.log(findNewRide(8, 15).toString() == [[10, 13], '2.83 km'] ? '\033[32mPASS [8,15]\033' : '\033[31mFAIL [8,15]\033')
console.log(findNewRide(9, 0).toString() == [[7, 0], '2.00 km'] ? '\033[32mPASS [9,0]\033' : '\033[31mFAIL [9,0]\033')
console.log(findNewRide(9, 1).toString() == [[7, 0], '2.24 km'] ? '\033[32mPASS [9,1]\033' : '\033[31mFAIL [9,1]\033')
console.log(findNewRide(9, 2).toString() == [[7, 0], '2.83 km'] ? '\033[32mPASS [9,2]\033' : '\033[31mFAIL [9,2]\033')
console.log(findNewRide(9, 3).toString() == [[7, 0], '3.61 km'] ? '\033[32mPASS [9,3]\033' : '\033[31mFAIL [9,3]\033')
console.log(findNewRide(9, 4).toString() == [[7, 0], '4.47 km'] ? '\033[32mPASS [9,4]\033' : '\033[31mFAIL [9,4]\033')
console.log(findNewRide(9, 5).toString() == [[7, 0], '5.39 km'] ? '\033[32mPASS [9,5]\033' : '\033[31mFAIL [9,5]\033')
console.log(findNewRide(9, 6).toString() == [[7, 0], '6.32 km'] ? '\033[32mPASS [9,6]\033' : '\033[31mFAIL [9,6]\033')
console.log(findNewRide(9, 7).toString() == [[10, 13], '6.08 km'] ? '\033[32mPASS [9,7]\033' : '\033[31mFAIL [9,7]\033')
console.log(findNewRide(9, 8).toString() == [[10, 13], '5.10 km'] ? '\033[32mPASS [9,8]\033' : '\033[31mFAIL [9,8]\033')
console.log(findNewRide(9, 9).toString() == [[10, 13], '4.12 km'] ? '\033[32mPASS [9,9]\033' : '\033[31mFAIL [9,9]\033')
console.log(findNewRide(9, 10).toString() == [[10, 13], '3.16 km'] ? '\033[32mPASS [9,10]\033' : '\033[31mFAIL [9,10]\033')
console.log(findNewRide(9, 11).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [9,11]\033' : '\033[31mFAIL [9,11]\033')
console.log(findNewRide(9, 12).toString() == [[10, 13], '1.41 km'] ? '\033[32mPASS [9,12]\033' : '\033[31mFAIL [9,12]\033')
console.log(findNewRide(9, 13).toString() == [[10, 13], '1.00 km'] ? '\033[32mPASS [9,13]\033' : '\033[31mFAIL [9,13]\033')
console.log(findNewRide(9, 14).toString() == [[10, 13], '1.41 km'] ? '\033[32mPASS [9,14]\033' : '\033[31mFAIL [9,14]\033')
console.log(findNewRide(9, 15).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [9,15]\033' : '\033[31mFAIL [9,15]\033')
console.log(findNewRide(10, 0).toString() == [[7, 0], '3.00 km'] ? '\033[32mPASS [10,0]\033' : '\033[31mFAIL [10,0]\033')
console.log(findNewRide(10, 1).toString() == [[7, 0], '3.16 km'] ? '\033[32mPASS [10,1]\033' : '\033[31mFAIL [10,1]\033')
console.log(findNewRide(10, 2).toString() == [[7, 0], '3.61 km'] ? '\033[32mPASS [10,2]\033' : '\033[31mFAIL [10,2]\033')
console.log(findNewRide(10, 3).toString() == [[7, 0], '4.24 km'] ? '\033[32mPASS [10,3]\033' : '\033[31mFAIL [10,3]\033')
console.log(findNewRide(10, 4).toString() == [[7, 0], '5.00 km'] ? '\033[32mPASS [10,4]\033' : '\033[31mFAIL [10,4]\033')
console.log(findNewRide(10, 5).toString() == [[7, 0], '5.83 km'] ? '\033[32mPASS [10,5]\033' : '\033[31mFAIL [10,5]\033')
console.log(findNewRide(10, 6).toString() == [[7, 0], '6.71 km'] ? '\033[32mPASS [10,6]\033' : '\033[31mFAIL [10,6]\033')
console.log(findNewRide(10, 7).toString() == [[10, 13], '6.00 km'] ? '\033[32mPASS [10,7]\033' : '\033[31mFAIL [10,7]\033')
console.log(findNewRide(10, 8).toString() == [[10, 13], '5.00 km'] ? '\033[32mPASS [10,8]\033' : '\033[31mFAIL [10,8]\033')
console.log(findNewRide(10, 9).toString() == [[10, 13], '4.00 km'] ? '\033[32mPASS [10,9]\033' : '\033[31mFAIL [10,9]\033')
console.log(findNewRide(10, 10).toString() == [[10, 13], '3.00 km'] ? '\033[32mPASS [10,10]\033' : '\033[31mFAIL [10,10]\033')
console.log(findNewRide(10, 11).toString() == [[10, 13], '2.00 km'] ? '\033[32mPASS [10,11]\033' : '\033[31mFAIL [10,11]\033')
console.log(findNewRide(10, 12).toString() == [[10, 13], '1.00 km'] ? '\033[32mPASS [10,12]\033' : '\033[31mFAIL [10,12]\033')
console.log(findNewRide(10, 13).toString() == [[10, 13], '0.00 km'] ? '\033[32mPASS [10,13]\033' : '\033[31mFAIL [10,13]\033')
console.log(findNewRide(10, 14).toString() == [[10, 13], '1.00 km'] ? '\033[32mPASS [10,14]\033' : '\033[31mFAIL [10,14]\033')
console.log(findNewRide(10, 15).toString() == [[10, 13], '2.00 km'] ? '\033[32mPASS [10,15]\033' : '\033[31mFAIL [10,15]\033')
console.log(findNewRide(11, 0).toString() == [[7, 0], '4.00 km'] ? '\033[32mPASS [11,0]\033' : '\033[31mFAIL [11,0]\033')
console.log(findNewRide(11, 1).toString() == [[7, 0], '4.12 km'] ? '\033[32mPASS [11,1]\033' : '\033[31mFAIL [11,1]\033')
console.log(findNewRide(11, 2).toString() == [[7, 0], '4.47 km'] ? '\033[32mPASS [11,2]\033' : '\033[31mFAIL [11,2]\033')
console.log(findNewRide(11, 3).toString() == [[7, 0], '5.00 km'] ? '\033[32mPASS [11,3]\033' : '\033[31mFAIL [11,3]\033')
console.log(findNewRide(11, 4).toString() == [[7, 0], '5.66 km'] ? '\033[32mPASS [11,4]\033' : '\033[31mFAIL [11,4]\033')
console.log(findNewRide(11, 5).toString() == [[7, 0], '6.40 km'] ? '\033[32mPASS [11,5]\033' : '\033[31mFAIL [11,5]\033')
console.log(findNewRide(11, 6).toString() == [[10, 13], '7.07 km'] ? '\033[32mPASS [11,6]\033' : '\033[31mFAIL [11,6]\033')
console.log(findNewRide(11, 7).toString() == [[10, 13], '6.08 km'] ? '\033[32mPASS [11,7]\033' : '\033[31mFAIL [11,7]\033')
console.log(findNewRide(11, 8).toString() == [[10, 13], '5.10 km'] ? '\033[32mPASS [11,8]\033' : '\033[31mFAIL [11,8]\033')
console.log(findNewRide(11, 9).toString() == [[10, 13], '4.12 km'] ? '\033[32mPASS [11,9]\033' : '\033[31mFAIL [11,9]\033')
console.log(findNewRide(11, 10).toString() == [[10, 13], '3.16 km'] ? '\033[32mPASS [11,10]\033' : '\033[31mFAIL [11,10]\033')
console.log(findNewRide(11, 11).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [11,11]\033' : '\033[31mFAIL [11,11]\033')
console.log(findNewRide(11, 12).toString() == [[10, 13], '1.41 km'] ? '\033[32mPASS [11,12]\033' : '\033[31mFAIL [11,12]\033')
console.log(findNewRide(11, 13).toString() == [[10, 13], '1.00 km'] ? '\033[32mPASS [11,13]\033' : '\033[31mFAIL [11,13]\033')
console.log(findNewRide(11, 14).toString() == [[10, 13], '1.41 km'] ? '\033[32mPASS [11,14]\033' : '\033[31mFAIL [11,14]\033')
console.log(findNewRide(11, 15).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [11,15]\033' : '\033[31mFAIL [11,15]\033')
console.log(findNewRide(12, 0).toString() == [[7, 0], '5.00 km'] ? '\033[32mPASS [12,0]\033' : '\033[31mFAIL [12,0]\033')
console.log(findNewRide(12, 1).toString() == [[7, 0], '5.10 km'] ? '\033[32mPASS [12,1]\033' : '\033[31mFAIL [12,1]\033')
console.log(findNewRide(12, 2).toString() == [[7, 0], '5.39 km'] ? '\033[32mPASS [12,2]\033' : '\033[31mFAIL [12,2]\033')
console.log(findNewRide(12, 3).toString() == [[7, 0], '5.83 km'] ? '\033[32mPASS [12,3]\033' : '\033[31mFAIL [12,3]\033')
console.log(findNewRide(12, 4).toString() == [[7, 0], '6.40 km'] ? '\033[32mPASS [12,4]\033' : '\033[31mFAIL [12,4]\033')
console.log(findNewRide(12, 5).toString() == [[7, 0], '7.07 km'] ? '\033[32mPASS [12,5]\033' : '\033[31mFAIL [12,5]\033')
console.log(findNewRide(12, 6).toString() == [[10, 13], '7.28 km'] ? '\033[32mPASS [12,6]\033' : '\033[31mFAIL [12,6]\033')
console.log(findNewRide(12, 7).toString() == [[10, 13], '6.32 km'] ? '\033[32mPASS [12,7]\033' : '\033[31mFAIL [12,7]\033')
console.log(findNewRide(12, 8).toString() == [[10, 13], '5.39 km'] ? '\033[32mPASS [12,8]\033' : '\033[31mFAIL [12,8]\033')
console.log(findNewRide(12, 9).toString() == [[10, 13], '4.47 km'] ? '\033[32mPASS [12,9]\033' : '\033[31mFAIL [12,9]\033')
console.log(findNewRide(12, 10).toString() == [[10, 13], '3.61 km'] ? '\033[32mPASS [12,10]\033' : '\033[31mFAIL [12,10]\033')
console.log(findNewRide(12, 11).toString() == [[10, 13], '2.83 km'] ? '\033[32mPASS [12,11]\033' : '\033[31mFAIL [12,11]\033')
console.log(findNewRide(12, 12).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [12,12]\033' : '\033[31mFAIL [12,12]\033')
console.log(findNewRide(12, 13).toString() == [[10, 13], '2.00 km'] ? '\033[32mPASS [12,13]\033' : '\033[31mFAIL [12,13]\033')
console.log(findNewRide(12, 14).toString() == [[10, 13], '2.24 km'] ? '\033[32mPASS [12,14]\033' : '\033[31mFAIL [12,14]\033')
console.log(findNewRide(12, 15).toString() == [[10, 13], '2.83 km'] ? '\033[32mPASS [12,15]\033' : '\033[31mFAIL [12,15]\033')
console.log(findNewRide(13, 0).toString() == [[7, 0], '6.00 km'] ? '\033[32mPASS [13,0]\033' : '\033[31mFAIL [13,0]\033')
console.log(findNewRide(13, 1).toString() == [[7, 0], '6.08 km'] ? '\033[32mPASS [13,1]\033' : '\033[31mFAIL [13,1]\033')
console.log(findNewRide(13, 2).toString() == [[7, 0], '6.32 km'] ? '\033[32mPASS [13,2]\033' : '\033[31mFAIL [13,2]\033')
console.log(findNewRide(13, 3).toString() == [[7, 0], '6.71 km'] ? '\033[32mPASS [13,3]\033' : '\033[31mFAIL [13,3]\033')
console.log(findNewRide(13, 4).toString() == [[7, 0], '7.21 km'] ? '\033[32mPASS [13,4]\033' : '\033[31mFAIL [13,4]\033')
console.log(findNewRide(13, 5).toString() == [[7, 0], '7.81 km'] ? '\033[32mPASS [13,5]\033' : '\033[31mFAIL [13,5]\033')
console.log(findNewRide(13, 6).toString() == [[15, 13], '7.28 km'] ? '\033[32mPASS [13,6]\033' : '\033[31mFAIL [13,6]\033')
console.log(findNewRide(13, 7).toString() == [[15, 13], '6.32 km'] ? '\033[32mPASS [13,7]\033' : '\033[31mFAIL [13,7]\033')
console.log(findNewRide(13, 8).toString() == [[15, 13], '5.39 km'] ? '\033[32mPASS [13,8]\033' : '\033[31mFAIL [13,8]\033')
console.log(findNewRide(13, 9).toString() == [[15, 13], '4.47 km'] ? '\033[32mPASS [13,9]\033' : '\033[31mFAIL [13,9]\033')
console.log(findNewRide(13, 10).toString() == [[15, 13], '3.61 km'] ? '\033[32mPASS [13,10]\033' : '\033[31mFAIL [13,10]\033')
console.log(findNewRide(13, 11).toString() == [[15, 13], '2.83 km'] ? '\033[32mPASS [13,11]\033' : '\033[31mFAIL [13,11]\033')
console.log(findNewRide(13, 12).toString() == [[15, 13], '2.24 km'] ? '\033[32mPASS [13,12]\033' : '\033[31mFAIL [13,12]\033')
console.log(findNewRide(13, 13).toString() == [[15, 13], '2.00 km'] ? '\033[32mPASS [13,13]\033' : '\033[31mFAIL [13,13]\033')
console.log(findNewRide(13, 14).toString() == [[15, 13], '2.24 km'] ? '\033[32mPASS [13,14]\033' : '\033[31mFAIL [13,14]\033')
console.log(findNewRide(13, 15).toString() == [[15, 13], '2.83 km'] ? '\033[32mPASS [13,15]\033' : '\033[31mFAIL [13,15]\033')
console.log(findNewRide(14, 0).toString() == [[7, 0], '7.00 km'] ? '\033[32mPASS [14,0]\033' : '\033[31mFAIL [14,0]\033')
console.log(findNewRide(14, 1).toString() == [[7, 0], '7.07 km'] ? '\033[32mPASS [14,1]\033' : '\033[31mFAIL [14,1]\033')
console.log(findNewRide(14, 2).toString() == [[7, 0], '7.28 km'] ? '\033[32mPASS [14,2]\033' : '\033[31mFAIL [14,2]\033')
console.log(findNewRide(14, 3).toString() == [[7, 0], '7.62 km'] ? '\033[32mPASS [14,3]\033' : '\033[31mFAIL [14,3]\033')
console.log(findNewRide(14, 4).toString() == [[7, 0], '8.06 km'] ? '\033[32mPASS [14,4]\033' : '\033[31mFAIL [14,4]\033')
console.log(findNewRide(14, 5).toString() == [[15, 13], '8.06 km'] ? '\033[32mPASS [14,5]\033' : '\033[31mFAIL [14,5]\033')
console.log(findNewRide(14, 6).toString() == [[15, 13], '7.07 km'] ? '\033[32mPASS [14,6]\033' : '\033[31mFAIL [14,6]\033')
console.log(findNewRide(14, 7).toString() == [[15, 13], '6.08 km'] ? '\033[32mPASS [14,7]\033' : '\033[31mFAIL [14,7]\033')
console.log(findNewRide(14, 8).toString() == [[15, 13], '5.10 km'] ? '\033[32mPASS [14,8]\033' : '\033[31mFAIL [14,8]\033')
console.log(findNewRide(14, 9).toString() == [[15, 13], '4.12 km'] ? '\033[32mPASS [14,9]\033' : '\033[31mFAIL [14,9]\033')
console.log(findNewRide(14, 10).toString() == [[15, 13], '3.16 km'] ? '\033[32mPASS [14,10]\033' : '\033[31mFAIL [14,10]\033')
console.log(findNewRide(14, 11).toString() == [[15, 13], '2.24 km'] ? '\033[32mPASS [14,11]\033' : '\033[31mFAIL [14,11]\033')
console.log(findNewRide(14, 12).toString() == [[15, 13], '1.41 km'] ? '\033[32mPASS [14,12]\033' : '\033[31mFAIL [14,12]\033')
console.log(findNewRide(14, 13).toString() == [[15, 13], '1.00 km'] ? '\033[32mPASS [14,13]\033' : '\033[31mFAIL [14,13]\033')
console.log(findNewRide(14, 14).toString() == [[15, 13], '1.41 km'] ? '\033[32mPASS [14,14]\033' : '\033[31mFAIL [14,14]\033')
console.log(findNewRide(14, 15).toString() == [[15, 13], '2.24 km'] ? '\033[32mPASS [14,15]\033' : '\033[31mFAIL [14,15]\033')
console.log(findNewRide(15, 0).toString() == [[7, 0], '8.00 km'] ? '\033[32mPASS [15,0]\033' : '\033[31mFAIL [15,0]\033')
console.log(findNewRide(15, 1).toString() == [[7, 0], '8.06 km'] ? '\033[32mPASS [15,1]\033' : '\033[31mFAIL [15,1]\033')
console.log(findNewRide(15, 2).toString() == [[7, 0], '8.25 km'] ? '\033[32mPASS [15,2]\033' : '\033[31mFAIL [15,2]\033')
console.log(findNewRide(15, 3).toString() == [[7, 0], '8.54 km'] ? '\033[32mPASS [15,3]\033' : '\033[31mFAIL [15,3]\033')
console.log(findNewRide(15, 4).toString() == [[7, 0], '8.94 km'] ? '\033[32mPASS [15,4]\033' : '\033[31mFAIL [15,4]\033')
console.log(findNewRide(15, 5).toString() == [[15, 13], '8.00 km'] ? '\033[32mPASS [15,5]\033' : '\033[31mFAIL [15,5]\033')
console.log(findNewRide(15, 6).toString() == [[15, 13], '7.00 km'] ? '\033[32mPASS [15,6]\033' : '\033[31mFAIL [15,6]\033')
console.log(findNewRide(15, 7).toString() == [[15, 13], '6.00 km'] ? '\033[32mPASS [15,7]\033' : '\033[31mFAIL [15,7]\033')
console.log(findNewRide(15, 8).toString() == [[15, 13], '5.00 km'] ? '\033[32mPASS [15,8]\033' : '\033[31mFAIL [15,8]\033')
console.log(findNewRide(15, 9).toString() == [[15, 13], '4.00 km'] ? '\033[32mPASS [15,9]\033' : '\033[31mFAIL [15,9]\033')
console.log(findNewRide(15, 10).toString() == [[15, 13], '3.00 km'] ? '\033[32mPASS [15,10]\033' : '\033[31mFAIL [15,10]\033')
console.log(findNewRide(15, 11).toString() == [[15, 13], '2.00 km'] ? '\033[32mPASS [15,11]\033' : '\033[31mFAIL [15,11]\033')
console.log(findNewRide(15, 12).toString() == [[15, 13], '1.00 km'] ? '\033[32mPASS [15,12]\033' : '\033[31mFAIL [15,12]\033')
console.log(findNewRide(15, 13).toString() == [[15, 13], '0.00 km'] ? '\033[32mPASS [15,13]\033' : '\033[31mFAIL [15,13]\033')
console.log(findNewRide(15, 14).toString() == [[15, 13], '1.00 km'] ? '\033[32mPASS [15,14]\033' : '\033[31mFAIL [15,14]\033')
console.log(findNewRide(15, 15).toString() == [[15, 13], '2.00 km'] ? '\033[32mPASS [15,15]\033' : '\033[31mFAIL [15,15]\033')