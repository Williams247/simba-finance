// Exchange rate from dollar to naira
const dollarNaira = 417.01;
// Exchange rate from euro to dollar
const euroDollar = 1.14;
// Exhange rate from euro to naira
const euroNaira = 473.32;

module.exports = (sendingCurrency, receivingCurrency, amount, toFixedNum) => {

  // Sending in USD and receiving in USD
  if (sendingCurrency === "USD" && receivingCurrency === "USD") {
    return {
      exchangeRate: 0,
      amount: amount,
      currency: receivingCurrency
    }
  };

  // Sending in EUR and receiving in EUR
  if (sendingCurrency === "EUR" && receivingCurrency === "EUR") {
    return {
      exchangeRate: 0,
      amount: amount,
      currency: receivingCurrency
    }
  };
  
  // Sending in NGN and receiving in NGN
  if (sendingCurrency === "NGN" && receivingCurrency === "NGN") {
    return {
      exchangeRate: 0,
      amount: amount,
      currency: receivingCurrency
    }
  };
  
  // Sending in USD and receiving in NGN
  if (sendingCurrency === "USD" && receivingCurrency === "NGN") {
      const convertedAmount = dollarNaira * amount;
      return {
        exchangeRate: dollarNaira,
        amount: convertedAmount,
        currency: receivingCurrency  
    }
  }

  // Sending in NGN and receiving in USD
  if (sendingCurrency === "NGN" && receivingCurrency === "USD") {
    const convertedAmount = amount / dollarNaira;
    return {
      exchangeRate: 1,
      amount: Number.parseFloat(convertedAmount).toFixed(toFixedNum),
      currency: receivingCurrency  
    }
  }

  // Sending in Eur and receiving in NGN
  if (sendingCurrency === "EUR" && receivingCurrency === "NGN") {
    const convertedAmount = euroNaira * amount;
    return {
      exchangeRate: euroNaira,
      amount: convertedAmount,
      currency: receivingCurrency
    }
  }

  // Sending in NGN and receiving in EUR
  if (sendingCurrency === "NGN" && receivingCurrency === "EUR") {
    const convertedAmount = amount / euroNaira;
    return {
      exchangeRate: 1,
      amount: Number.parseFloat(convertedAmount).toFixed(toFixedNum),
      currency: receivingCurrency
    }
  }

  // Sending in EUR and receiving in USD
  if (sendingCurrency === "EUR" && receivingCurrency === "USD") {
    const convertedAmount = amount * euroDollar;
    return {
      exchangeRate: euroDollar,
      amount: convertedAmount,
      currency: receivingCurrency
    }
  }

  // Sending in USD and receiving in EUR
  if (sendingCurrency === "USD" && receivingCurrency === "EUR") {
    const convertedAmount = amount / euroDollar;
    return {
      exchangeRate: 1,
      amount: Number.parseFloat(convertedAmount).toFixed(toFixedNum),
      currency: receivingCurrency
    }
  }
};
