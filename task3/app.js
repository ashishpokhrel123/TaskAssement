function twopairNumber(num, sum) {
    
    var left, right;
    num.sort();
    left = 0; // intilaizing from beginging of array
    right = num.length -1; // intilaizing from end of array
    

    while (left < right) {
        if (num[left] + num[right] == sum)
            return [num[left], num[right]];
        else if (num[left] + num[right] < sum)
            left++;
        else // num[left] + num[right] > sum
            right--;
    }
    return 0;    
};

/* Intialzing value */

var num = [ 1, 4, 12, 6, 10, -8 ]
var sum = 18;

const result = twopairNumber(num, sum); /*calling function */
console.log(result);
