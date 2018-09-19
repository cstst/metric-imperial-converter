/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    const fractionConverter = fraction => {
      return Function(`"use strict"; return (${fraction})`)();
    }
    
    const doubleFraction = fraction => {
      let count = 0;
      fraction.split("").forEach(char => {
        if (char === '/') {
          count++;
        }
      });
      return count > 1 ? true : false;
    }
    
    for (let i = 0; i <= input.length; i++) {
      if (input.charCodeAt(i) > 64 || i === input.length) {
        const numInput = input.slice(0, i),
           fractionInd = numInput.indexOf('/');
        if (fractionInd === -1) {
          const num = numInput === '' ? 1 : Number(numInput);
          return isNaN(num) ? null : num; 
        } else if (fractionInd === 0 || fractionInd === numInput.length - 1 || doubleFraction(numInput)) {
          return null;
        } else {  
          const num = fractionConverter(numInput);
          return isNaN(num) ? null : num; 
        }
      }
    }
  };
  
  this.getUnit = function(input) {
    for (let i = 0; i <= input.length; i++) {
      if (input.charCodeAt(i) > 64 || i === input.length) {
        const validUnits = ['mi','km','gal','l','kg','lbs'],
                    unit = input.slice(i).toLowerCase();
        return validUnits.includes(unit) ? unit : null;
      } 
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit) {
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'gal':
        return 'L';
      case 'l':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return null;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit) {
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if (!initNum && !initUnit) {
      return 'invalid number and unit';
    } else if (!initNum) {
      return 'invalid number'
    } else if (!initUnit) {
      return 'invalid unit';
    } else {
      let result;
      switch(initUnit) {
        case 'gal':
          result = initNum * galToL;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'km':
          result = initNum / miToKm;
          break;
      }
      return Math.round(result * 100000) / 100000;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (!initNum || !initUnit) {
      return returnNum;
    } else {
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
    
  };
  
}

module.exports = ConvertHandler;
