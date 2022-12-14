function convertToRoman(num : number) :string {
    enum romanLookup  {M = 1000, D = 500, C = 100, L = 50, X = 10, V = 5, I = 1}
    type keyType = keyof typeof romanLookup;
    const romanKeys    = Object.keys(romanLookup).filter(x => !(parseInt(x) >= 0)) as keyType[];
    let romanNumber   : string = '';
    let index         : number;
    let count         : number = 0;

    for (let key in romanLookup) {
        let curValue : number = parseInt(romanLookup[key]);
        index = romanKeys.indexOf(key as keyType);
        while (num >= curValue) {
            if (count < 3) {
                romanNumber += (key);
            } else {
                // 9 = VIIII : if we have 9 to we need to remove 1 extra charecter and add "IX"
                if ((romanNumber.indexOf(romanKeys[index - 1]) > -1)) {
                    romanNumber = romanNumber.slice(0, romanNumber.indexOf(romanKeys[index - 1]));
                    romanNumber += (romanKeys[index] + romanKeys[index - 2]);
                } else {
                    // 4 = IIII : if we have 4 do we remove last 3 character
                    if (num < 1000) romanNumber = romanNumber.slice(0, -3);

                    romanNumber += (romanKeys[index])
                    if(romanKeys[index-1] !== undefined)romanNumber += romanKeys[index - 1];
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


