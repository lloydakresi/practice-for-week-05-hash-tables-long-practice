class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    if((this.count / this.capacity) >= 0.7){
      this.resize();
    }
    let kVPair = new KeyValuePair(key, value);
    let bucketKey = this.hashMod(key);

    if(this.data[bucketKey]){
      let bucketPair = this.data[bucketKey];

      while(bucketPair !== null && bucketPair.key !== key){
        bucketPair = bucketPair.next;
      }

      if (bucketPair === null){
        let prev = this.data[bucketKey];
        this.data[bucketKey] = kVPair;
        this.data[bucketKey].next = prev;
        this.count++;
      }else{
        bucketPair.value = kVPair.value;
      }

    }else{
      this.data[bucketKey] = kVPair;
      this.count++;

    }
  }


  read(key) {
    // Your code here
    let mod = this.hashMod(key);
    let bucketPair = this.data[mod];

      while(bucketPair !== null && bucketPair.key !== key){
        bucketPair = bucketPair.next;
      }
      if(bucketPair === null) return undefined ;
      return bucketPair.value;

  }


  resize() {
    // Your code here
    this.capacity*=2;   //double the current capacity
    let oldArr = this.data.slice();   //create a copy of the current this.data
    this.data = new Array(this.capacity).fill(null); //create a new array with double the new capacity
    let countCopy = this.count; // make a copy of the current count

    for(let i = 0; i < oldArr.length; i++){   //assigning the values
      let ele = oldArr[i];
      while(ele){ //while ele !== null
        this.insert(ele.key, ele.value); // insert the new key and value into the new array
        ele = ele.next; // traverse the bucket if the data is a linked list
      }
    }
    this.count = countCopy; // assign the count var to this.copy
  }


  delete(key) {
    // Your code here
    let mod = this.hashMod(key);
    let delKey = this.data[mod];
    let prev;

    while(delKey !== null && (delKey.key !== key)){
      prev = delKey;
      delKey = delKey.next;
    }

    if (delKey === null) return "Key not found";

    if (prev){
      prev.next = delKey.next;
    }else{
      this.data[mod] = delKey.next;
    }
    this.count--;

  }
}


module.exports = HashTable;
