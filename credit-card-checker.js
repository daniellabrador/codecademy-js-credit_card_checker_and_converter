// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]
const valid6 = [4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]
const invalid6 = [2, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// LUHN'S ALGORITHM -------------------

// Multiply every other digit by two starting from the 2nd digit from the right.
const multiplyByTwo = card => {
    let arr = [];
    let digit = 0; // To keep the digits from mutating

    if ((card.length%2)===0){
        for (i=card.length-1;i>=0;i--){
            arr.unshift(card[i]);
    
            i--;
            digit = card[i]*2;
            arr.unshift(digit);
        }
    } else {
        for (i=card.length-1;i>1;i--){
            arr.unshift(card[i]);
    
            i--;
            digit = card[i]*2;
            arr.unshift(digit);
        }
        arr.unshift(card[0]);
    }
    return arr;
}

// If a digit is greater than 9 after doubling, subtract 9.
const luhnArr = card => {
    let arr = multiplyByTwo(card);

    for (i=0;i<arr.length;i++){
        if(arr[i]>9){
            arr[i] -= 9;
        }
    }
    return arr;
}

// Find luhnArr % 10
const moduloOfLuhnArr = card => {
    let sum = luhnArr(card).reduce((x,y) => x+=y);
    return sum % 10;
}

// Validate credit card
const validateCred = card => {
    const sum = moduloOfLuhnArr(card)
    return (sum%10)===0 ? true : false
}

// END OF LUHN'S ALGORITHM ------------

const findInvalidCards = cardSet => {
    const invalidCards = [];
    cardSet.forEach(card => {if(!validateCred(card)){invalidCards.push(card)}});
    return invalidCards;
}

const idInvalidCardCompanies = invalidCards => {
    const issuingCompanies = [];

    // Get first digits of the card
    const firstDigits = [];
    invalidCards.forEach(card => firstDigits.push(card[0]));

    // Get unique first digits
    const uniqueFirstDigits = firstDigits.filter((item,pos)=>{return firstDigits.indexOf(item) === pos;});

    // List issuing companies
    uniqueFirstDigits.sort().forEach(digit => {
        switch (digit){
            case 3:
                issuingCompanies.push('Amex');
                break;
            case 4:
                issuingCompanies.push('Visa');
                break;
            case 5:
                issuingCompanies.push('Mastercard');
                break;
            case 6:
                issuingCompanies.push('Discover');
                break;
            default:
                console.log(`Company not found`);
                break;
        }
    })

    // console.log(firstDigits); console.log(uniqueFirstDigits.sort());
    return issuingCompanies;
}

// Test required functions
/*
console.log(`valid1 is a valid card: ${validateCred(valid1)}`);
console.log(`invalid1 is an valid card: ${validateCred(invalid1)}\n`);
console.log(findInvalidCards(batch)); console.log();
console.log(idInvalidCardCompanies(findInvalidCards(batch)));
//*/

// Accept string for validation

// Convert invalid numbers to valid numbers

const numOfDigits = card => card.length === 15 || card.length === 16 ? card : `Please input a 15-digit or 16-digit credit card number`;

const checkFirstDigit = cardToCheck => {
    const card = numOfDigits(cardToCheck);
    if (typeof card === 'string'){
        return `Please input a 15-digit or 16-digit credit card number`;
    }

    // In case we will have 3 cards.
    const cardSet = [card,card,card]
    console.log(cardSet)
    console.log()

    if (card.length===15){
        // Make sure Amex card starts with 3.
        card[0] = 3;
        return card
    } else {
        // Check if card belongs to Visa, Mastercard, or Discover; else, create one of each
        if (card[0]===4 || card[0]===5 || card[0]===6){
            return card
        } else {

            // Change to a Visa card
            cardSet[0][0] = '4';
            
            // Change to a Mastercard
            cardSet[1][0] = '5';
            
            // Change to a Discover card
            cardSet[2][0] = '6';
            //*/
        }
    }
    
    console.log(cardSet);
    console.log('End of function\n')
    return cardSet
}

const primeConvert = card => {
    // Value that will determine how to adjust and how much
    let modulo = moduloOfLuhnArr(card);
    //console.log(`Modulo: ${modulo}`); console.log(`Valid:`)

    // Mutate card
    if (card[card.length-1]>=modulo){
        card[card.length-1] -= modulo;
    } else {
        card[card.length-1] += (10-modulo)
    }

    return card;
}

const convertInvalidToValid = arr => {
    let cardSet = checkFirstDigit(arr)
    if (typeof card === 'string'){
        return `Please input a 15-digit or 16-digit credit card number`;
    }
    
    if (cardSet.length === 3){
        for(i=0;i<cardSet.length;i++){
            cardSet[i] = primeConvert(cardSet[i])
        }
    } else {
        cardSet = primeConvert(cardSet)
    }
    return cardSet
}



console.log()


//console.log('Invalid card:')
//console.log(invalid1)
//console.log()
const testNewCard = convertInvalidToValid(invalid6);
console.log(testNewCard)
console.log()
//console.log(`Valid? ${validateCred(testNewCard)}`)
//*/