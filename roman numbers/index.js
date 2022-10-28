function convertToRoman(num) {
    var romanLookup;
    (function (romanLookup) {
        romanLookup[romanLookup["M"] = 1000] = "M";
        romanLookup[romanLookup["D"] = 500] = "D";
        romanLookup[romanLookup["C"] = 100] = "C";
        romanLookup[romanLookup["L"] = 50] = "L";
        romanLookup[romanLookup["X"] = 10] = "X";
        romanLookup[romanLookup["V"] = 5] = "V";
        romanLookup[romanLookup["I"] = 1] = "I";
    })(romanLookup || (romanLookup = {}));
    var romanKeys = Object.keys(romanLookup).filter(function (x) { return !(parseInt(x) >= 0); });
    var romanNumber = '';
    var index;
    var count = 0;
    for (var key in romanLookup) {
        var curValue = parseInt(romanLookup[key]);
        index = romanKeys.indexOf(key);
        while (num >= curValue) {
            if (count < 3) {
                romanNumber += (key);
            }
            else {
                // 9 = VIIII : if we have 9 to we need to remove 1 extra charecter and add "IX"
                if ((romanNumber.indexOf(romanKeys[index - 1]) > -1)) {
                    romanNumber = romanNumber.slice(0, romanNumber.indexOf(romanKeys[index - 1]));
                    romanNumber += (romanKeys[index] + romanKeys[index - 2]);
                }
                else {
                    // 4 = IIII : if we have 4 do we remove last 3 character
                    if (num < 1000)
                        romanNumber = romanNumber.slice(0, -3);
                    romanNumber += (romanKeys[index]);
                    if (romanKeys[index - 1] !== undefined)
                        romanNumber += romanKeys[index - 1];
                }
            }
            num -= curValue;
            count++;
        }
        count = 0;
    }
    return romanNumber;
}
console.log(convertToRoman(4001));
