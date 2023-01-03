function anagrams(str1, str2) {
  // Your code here
  let table1 = table(str1);
  let table2 = table(str2);

  for(let letter of str1){
    if(table1[letter] !== table2[letter]) return false;
  }

  for(let letter of str2){
    if(table1[letter] !== table2[letter]) return false;
  }

  return true;
}

function table(str){
  let table = {};
  for(let i = 0; i < str.length; i++){
    let letter = str[i];
    if (table[letter] === undefined) table[letter] = 1;
    table[letter]++;
  }

  return table;
}


function commonElements(arr1, arr2) {
  // Your code here
  let set1 = new Set(arr1);
  let set2 = new Set(arr2);
  let set3 = [];

  for(n of set1){
    if (set2.has(n)) set3.push(n);
  }

  return set3;
}


function duplicate(arr) {
  // Your code here
  let set2 = new Set()
  for(ele of arr){
    if (!set2.has(ele)){
      set2.add(ele);
    }else{
      return ele;
    }
  }
}


function twoSum(nums, target) {
  // Your code here
  let set = new Set();
  for(let i = 0; i < nums.length; i++){
    if(set.has(target - nums[i])) return true;
    else set.add(nums[i]);
  }
  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const model = {};
  const assigned = new Set()

  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    let key = pattern[i];

    if ( !model[key] && !assigned.has(str) ) {
      model[key] = str;
      assigned.add(str);
    } else if (model[key] !== str) {
      return false;
    }
  }

  return true;

}

console.log(wordPattern("ABBAA", ['dog', 'cat', 'cat', 'dog', `cat`]))
console.log(wordPattern("ABBA", ['dog', 'dog', 'dog', 'dog']))
console.log(wordPattern("AAAA", ['dog', 'dog', 'dog', 'dog']))
console.log(wordPattern("ABCD", ['dog', 'cat', 'dog', 'cat']))



module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
