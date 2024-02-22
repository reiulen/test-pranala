const express = require("express");
const cors = require("cors");

const corsOption = {
    origin: ['http://localhost:5173'],
};

const app = express();
const port = 4000;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/generate", (req, res) => {
  const { angka, type } = req?.body || {};
  if (!angka || !type) {
    res.json(
      {
        status: false,
        message: "Angka atau type harus diisi",
      },
      400
    );
  }

  const inputNumber = parseInt(angka);
  if (inputNumber < 0) {
    res.json(
      {
        status: false,
        message: "Angka tidak boleh kurang dari 0",
      },
      400
    );
  }

  if (type !== "triangle" && type !== "oddNumber" && type !== "primeNumber") {
    res.json(
      {
        status: false,
        message: "Type tidak valid",
      },
      400
    );
  }

  let result = "";
  switch (type) {
    case "triangle":
      result = generateTriangle(inputNumber);
      break;
    case "oddNumber":
      result = generateOddNumber(inputNumber);
      break;
    case "primeNumber":
      result = generatePrimeNumber(inputNumber);
      break;
  }

  res.json(
    {
      status: true,
      message: "Berhasil generate triangle",
      data: result,
      type: type,
    },
    200
  );
});

function generateTriangle(inputNumber) {
  let triangleResult = "";
  let numberTemp = inputNumber.toString();
  for (let i = 0; i <= numberTemp.length; i++) {
    triangleResult += numberTemp?.substring(i, i + 1).padEnd(i + 2, "0") + "\n";
  }
  return triangleResult;
}

function generateOddNumber(inputNumber) {
  let oddNumber = [];
  for (let i = 0; i <= inputNumber; i++) {
    if (i % 2 !== 0) {
      oddNumber.push(i);
    }
  }
  return oddNumber;
}

function generatePrimeNumber(inputNumber) {
  let primeNumber = [];
  for (let i = 2; i <= inputNumber; i++) {
        console.log(i);

    if(checkPrime(i)) {
        console.log(i);
        primeNumber.push(i);
    }
  }

  return primeNumber;
}

function checkPrime (number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number > 1;
}