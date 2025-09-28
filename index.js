// LeetCode Problem: Two Sum
/*TODO: Two Sum 
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
*/

function twoSum(nums, target) {
  const numMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return [];
}
// Example usage:
// console.log(`twoSum:`, twoSum([2, 7, 11, 15], 9)); // [0, 1]
// console.log(`twoSum:`, twoSum([3, 2, 4], 6)); // [1, 2]
// console.log(`twoSum:`, twoSum([3, 3], 6)); // [0, 1]

// LeetCode Problem: Add Two Numbers

//TODO: Add Two Numbers
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.*/

// [] is not valid value for the expected return type ListNode

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0);
  let p = l1,
    q = l2,
    current = dummyHead;
  let carry = 0;

  while (p !== null || q !== null) {
    const x = p !== null ? p.val : 0;
    const y = q !== null ? q.val : 0;
    const sum = carry + x + y;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  if (carry > 0) {
    current.next = new ListNode(carry);
  }

  return dummyHead.next;
}
// Example usage:
// Assuming ListNode is defined as per the problem statement

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummyHead.next;
}
// // Helper function to convert a linked list to an array
function linkedListToArray(head) {
  let arr = [];
  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}
// Example usage:
const l1 = createLinkedList([2, 4, 3]);
const l2 = createLinkedList([5, 6, 4]);
const result = addTwoNumbers(l1, l2);
// console.log(`addTwoNumbers:`, linkedListToArray(result)); // [7, 0, 8] which represents the number 807

// LeetCode Problem: Longest Substring Without Repeating Characters
// TODO:Longest Substring Without Repeating Characters

/**
 * Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.*/

function lengthOfLongestSubstring(s) {
  const charIndexMap = new Map();
  let maxLength = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (charIndexMap.has(s[i]) && charIndexMap.get(s[i]) >= start) {
      start = charIndexMap.get(s[i]) + 1;
    }
    charIndexMap.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}
// Example usage:
// console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("abcabcbb")); // 3
// console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("bbbbb")); // 1
// console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("pwwkew")); // 3

// TODO: Median of Two Sorted Arrays
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// The overall run time complexity should be O(log (m+n)).

function findMedianSortedArrays(nums1, nums2) {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const len = merged.length;

  if (len % 2 === 0) {
    return (merged[len / 2 - 1] + merged[len / 2]) / 2;
  } else {
    return merged[Math.floor(len / 2)];
  }
}
// Example usage:
// console.log(`findMedianSortedArrays:`, findMedianSortedArrays([1, 3], [2])); // 2.0
// console.log(`findMedianSortedArrays:`, findMedianSortedArrays([1, 2], [3, 4])); // 2.5

// TODO: Longest Palindromic Substring

function longestPalindrome(s) {
  let start = 0,
    end = 0;

  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  };

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i); // Odd length palindromes
    const len2 = expandAroundCenter(i, i + 1); // Even length palindromes
    const len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}
// Example usage:
// console.log(`longestPalindrome:`, longestPalindrome("babad")); // "bab" or "aba"
// console.log(`longestPalindrome:`, longestPalindrome("cbbd")); // "bb"
// console.log(`longestPalindrome:`, longestPalindrome("abdur")); //   "aba" (or "bab", depending on the implementation)

// TODO: Zigzag Conversion

function convert(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows = Array.from({ length: numRows }, () => "");
  let currentRow = 0;
  let goingDown = false;

  for (let char of s) {
    rows[currentRow] += char;
    if (currentRow === 0) goingDown = true;
    else if (currentRow === numRows - 1) goingDown = false;

    currentRow += goingDown ? 1 : -1;
  }

  return rows.join("");
}
// Example usage:
// console.log(`convert:`, convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
// console.log(`convert:`, convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
// console.log(`convert:`, convert("A", 1)); // "A"

//Intuition
// The zigzag conversion arranges characters in a zigzag pattern across multiple rows, then reads them row by row.
// The function constructs an array of strings for each row, iterating through the input string and determining the current row based on the direction of traversal (down or up).
// Finally, it joins the rows to form the final converted string.
// The time complexity is O(n), where n is the length of the input string, as each character is processed once.
// The space complexity is O(n) as well, due to the storage of characters in the rows array.

// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  const reversed =
    parseInt(Math.abs(x).toString().split("").reverse().join("")) * sign;

  if (reversed < -Math.pow(2, 31) || reversed > Math.pow(2, 31) - 1) {
    return 0;
  }

  return reversed;
}
// Example usage:
// console.log(`reverse:`, reverse(123)); // 321
// console.log(`reverse:`, reverse(-123)); // -321
// console.log(`reverse:`, reverse(120)); // 21

// TODO: String to Integer (atoi)

/**
 * 
 * Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.*/

function myAtoi(s) {
  s = s.trim();
  if (s.length === 0) return 0;

  let sign = 1;
  let index = 0;
  if (s[index] === "-") {
    sign = -1;
    index++;
  } else if (s[index] === "+") {
    index++;
  }

  let result = 0;
  while (index < s.length && s[index] >= "0" && s[index] <= "9") {
    const digit = s[index] - "0";
    result = result * 10 + digit;

    // Check for overflow
    if (result > Math.pow(2, 31) - 1) {
      return sign === 1 ? Math.pow(2, 31) - 1 : -Math.pow(2, 31);
    }
    index++;
  }

  return result * sign;
}

// Example usage:
// console.log(`myAtoi:`, myAtoi("42")); // 42
// console.log(`myAtoi:`, myAtoi("   -42")); // -42
// console.log(`myAtoi:`, myAtoi("4193 with words")); // 4193
// console.log(`myAtoi:`, myAtoi("words and 987")); //0

// TODO:Palindrome Number

/**
 * Given an integer x, return true if x is a palindrome, and false otherwise.

 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 * */

function isPalindrome(x) {
  if (x < 0) return false;
  const str = x.toString();
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Example usage:
// console.log(`isPalindrome:`, isPalindrome(121)); // true
// console.log(`isPalindrome:`, isPalindrome(-121)); // false
// console.log(`isPalindrome:`, isPalindrome(10)); // false

// Regular Expression Matching

// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

// '.' Matches any single character.​​​​
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).

let isMatch = function (s, p) {
  const m = s.length,
    n = p.length;

  // create DP table (m+1) X (n+1)
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

  // base case: Empty string & empty pattern
  dp[0][0] = true;

  // Handle patters like a*, a*b*, a*b*c*

  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  // fill DP table;

  for (let i = 1; (i) => m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        // Zero occurrence of previous char
        dp[i][j] = dp[i][j - 2];

        // One or more occurrence
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }
  return dp[m][n];
};

// console.log(isMatch("aa", "a")); // false
// console.log(isMatch("aa", "a*")); // true
// console.log(isMatch("ab", ".*")); // true
// console.log(isMatch("aab", "c*a*b")); // true
// console.log(isMatch("mississippi", "mis*is*p*.")); // false



// Container With Most Water
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

function maxArea(height) {
  let left = 0,
    right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentArea = width * currentHeight;
    maxArea = Math.max(maxArea, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}
// Example usage:
// console.log(`maxArea:`, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
// console.log(`maxArea:`, maxArea([1, 1])); // 1
// console.log(`maxArea:`, maxArea([4, 3, 2, 1, 4])); // 16
// console.log(`maxArea:`, maxArea([1, 2, 1])); // 2





//  Integer to Roman

// Roman numerals are formed by appending the conversions of decimal place values from highest to lowest.Converting a decimal place value into a Roman numeral has the following rules:

// If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
// If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1(I) less than 5(V): IV and 9 is 1(I) less than 10(X): IX.Only the following subtractive forms are used: 4(IV), 9(IX), 40(XL), 90(XC), 400(CD) and 900(CM).
// Only powers of 10(I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5(V), 50(L), or 500(D) multiple times.If you need to append a symbol 4 times use the subtractive form.
// Given an integer, convert it to a Roman numeral.


function intToRoman(num) {
  const val = [
    1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
  ];
  const syms = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let roman = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      roman += syms[i];
    }
  }
  return roman;
}
// Example usage:
// console.log(`intToRoman:`, intToRoman(1994)); // "III"
// console.log(`intToRoman:`, intToRoman(58)); // "IV"
// console.log(`intToRoman:`, intToRoman(3749)); // "IX"



// Roman to Integer

// For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II.The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right.However, the numeral for four is not IIII.Instead, the number four is written as IV.Because the one is before the five we subtract it making four.The same principle applies to the number nine, which is written as IX.There are six instances where subtraction is used:

// I can be placed before V(5) and X(10) to make 4 and 9. 
// X can be placed before L(50) and C(100) to make 40 and 90. 
// C can be placed before D(500) and M(1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer.

function romanToInt(s) {
  const romanMap = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const currentVal = romanMap.get(s[i]);
    const nextVal = i + 1 < s.length ? romanMap.get(s[i + 1]) : 0;
    if (currentVal < nextVal) {
      total -= currentVal;
    } else {
      total += currentVal;
    }
  }
  return total;
}
// Example usage:
// console.log(`romanToInt:`, romanToInt("III")); // 3
// console.log(`romanToInt:`, romanToInt("IV")); // 4
// console.log(`romanToInt:`, romanToInt("IX")); // 9
// console.log(`romanToInt:`, romanToInt("LVIII")); // 58



// Longest Common Prefix

// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".



//   Example 1:

// Input: strs = ["flower", "flow", "flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog", "racecar", "car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.


//   Constraints:

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters if it is non - empty.



function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}
// Example usage:
// console.log(`longestCommonPrefix:`, longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
// console.log(`longestCommonPrefix:`, longestCommonPrefix(["dog", "racecar", "car"])); // ""
// console.log(`longestCommonPrefix:`, longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // "inters"


//  problem: 3Sum

// // Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.



//   Example 1:

// Input: nums = [-1, 0, 1, 2, -1, -4]
// Output: [[-1, -1, 2], [-1, 0, 1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are[-1, 0, 1] and[-1, -1, 2].
// Notice that the order of the output and the order of the triplets does not matter.
//   Example 2:

// Input: nums = [0, 1, 1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:

// Input: nums = [0, 0, 0]
// Output: [[0, 0, 0]]
// Explanation: The only possible triplet sums up to 0.


function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates
        while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// Example usage:
// console.log(`threeSum:`, threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
// console.log(`threeSum:`, threeSum([0, 1, 1])); // []
// console.log(`threeSum:`, threeSum([0, 0, 0])); // [[0, 0, 0]]



// 3Sum Closest


// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

// Return the sum of the three integers.

// You may assume that each input would have exactly one solution.



//   Example 1:

// Input: nums = [-1, 2, 1, -4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2.(-1 + 2 + 1 = 2).
//   Example 2:

// Input: nums = [0, 0, 0], target = 1
// Output: 0
// Explanation: The sum that is closest to the target is 0.(0 + 0 + 0 = 0).



function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];
      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestSum = currentSum;
      }
      if (currentSum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return closestSum;
}

// Example usage:
// console.log(`threeSumClosest:`, threeSumClosest([-1, 2, 1, -4], 1)); // 2
// console.log(`threeSumClosest:`, threeSumClosest([0, 0, 0], 1)); // 0


// problem: Letter Combinations of a Phone Number


// Given a string containing digits from 2 - 9 inclusive, return all possible letter combinations that the number could represent.Return the answer in any order.

// A mapping of digits to letters(just like on the telephone buttons) is given below.Note that 1 does not map to any letters.

// Example 1:

// Input: digits = "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
// Example 2:

// Input: digits = ""
// Output: []
// Example 3:

// Input: digits = "2"
// Output: ["a", "b", "c"]


function letterCombinations(digits) {
  if (digits.length === 0) return [];
  const digitToChar = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const result = [];
  const backtrack = (index, path) => {
    if (path.length === digits.length) {
      result.push(path);
      return;
    }
    const possibleChars = digitToChar[digits[index]];
    for (let char of possibleChars) {
      backtrack(index + 1, path + char);
    }
  };
  backtrack(0, "");
  return result;
}

// Example usage:
// console.log(`letterCombinations:`, letterCombinations("23")); // ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
// console.log(`letterCombinations:`, letterCombinations("")); // []
// console.log(`letterCombinations:`, letterCombinations("2")); // ["a", "b", "c"]




// Two Sum

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.



//   Example 1:

// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
//   Example 2:

// Input: nums = [3, 2, 4], target = 6
// Output: [1, 2]
// Example 3:

// Input: nums = [3, 3], target = 6
// Output: [0, 1]

function twoSum(nums, target) {
  const numMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return [];
}
// Example usage:
// console.log(`twoSum:`, twoSum([2, 7, 11, 15], 9)); // [0, 1]
// console.log(`twoSum:`, twoSum([3, 2, 4], 6)); // [1, 2]
// console.log(`twoSum:`, twoSum([3, 3], 6)); // [0, 1]



// Problem: 4Sum;

// Given an array nums of n integers, return an array of all the unique quadruplets[nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
//   nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.



//   Example 1:

// Input: nums = [1, 0, -1, 0, -2, 2], target = 0
// Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
// Example 2:

// Input: nums = [2, 2, 2, 2, 2], target = 8
// Output: [[2, 2, 2, 2]]


function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const result = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1;
      let right = n - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        }
        else if (sum < target) {
          left++;
        }
        else {
          right--;
        }
      }
    }
  }
  return result;
}

// Example usage:
// console.log(`fourSum:`, fourSum([1, 0, -1, 0, -2, 2], 0)); // [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
// console.log(`fourSum:`, fourSum([2, 2, 2, 2, 2], 8)); // [[2, 2, 2, 2]]



// TODO: Remove Nth Node From End of List

// Given the head of a linked list, remove the nth node from the end of the list and return its head.Input: head = [1,2,3,4,5], n = 2
// Output: [1, 2, 3, 5]
// Example 2:

// Input: head = [1], n = 1
// Output: []
// Example 3:

// Input: head = [1, 2], n = 1
// Output: [1]


// Constraints:

// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz


function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
}
// Example usage:
// Helper function to create a linked list from an array
function createLinkedList(arr) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummyHead.next;
}
// // Helper function to convert a linked list to an array
function linkedListToArray(head) {
  let arr = [];
  while (head !== null) {
    // arr.push(head.val);
    head = head.next;
  }
  return arr;
}
// Example usage:
// const head = createLinkedList([1, 2, 3, 4, 5]);
// const n11 = 2;
// const updatedHead = removeNthFromEnd(head, n11);
// console.log(`removeNthFromEnd:`, linkedListToArray(updatedHead)); // [1, 2, 3, 5]
// Example usage:
// const head1 = createLinkedList([1]);
// const n1 = 1;
// const updatedHead1 = removeNthFromEnd(head1, n1);
// console.log(`removeNthFromEnd:`, linkedListToArray(updatedHead1)); // []
// Example usage:
// const head2 = createLinkedList([1, 2]);
// const n2 = 1;
// const updatedHead2 = removeNthFromEnd(head2, n2);
// console.log(`removeNthFromEnd:`, linkedListToArray(updatedHead2)); // [1]
// Intuition
// The function uses a two-pointer technique to efficiently remove the nth node from the end of a linked list.
// A dummy node is introduced to handle edge cases, such as removing the head of the list.
// The first pointer is advanced n+1 steps ahead, creating a gap of n nodes between the first and second pointers.



// TODO:Valid Parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same typeof.

//   Example 1:

// Input: s = "()"

// Output: true

// Example 2:

// Input: s = "()[]{}"

// Output: true

// Example 3:

// Input: s = "(]"

// Output: false

// Example 4:

// Input: s = "([])"

// Output: true

// Example 5:

// Input: s = "([)]"

// Output: false



// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.



function isValid(s) {
  const stack = [];
  const bracketMap = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let char of s) {
    if (bracketMap[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (bracketMap[last] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// Example usage:
// console.log(`isValid:`, isValid("()")); // true
// console.log(`isValid:`, isValid("()[]{}")); // true
// console.log(`isValid:`, isValid("(]")); // false
// console.log(`isValid:`, isValid("([])")); // true
// console.log(`isValid:`, isValid("([)]")); // false



// TODO: Merge Two Sorted Lists.


// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted list.The list should be made by splicing together the nodes of the first two lists.

// Return the head of the merged linked list


// Example 1:

// Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
// Output: [1, 1, 2, 3, 4, 4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  if (list1 !== null) {
    current.next = list1;
  }
  if (list2 !== null) {
    current.next = list2;
  }
  return dummy.next;
}

// Example usage:
const list1 = createLinkedList([1, 2, 4]);
const list2 = createLinkedList([1, 3, 4]);
const mergedList = mergeTwoLists(list1, list2);
// console.log(`mergeTwoLists:`, linkedListToArray(mergedList)); // [1, 1, 2, 3, 4, 4]
// Example usage:
const list3 = createLinkedList([]);
const list4 = createLinkedList([]);
const mergedList1 = mergeTwoLists(list3, list4);
// console.log(`mergeTwoLists:`, linkedListToArray(mergedList1)); // []
// Example usage:
const list5 = createLinkedList([]);
const list6 = createLinkedList([0]);
const mergedList2 = mergeTwoLists(list5, list6);
// console.log(`mergeTwoLists:`, linkedListToArray(mergedList2)); // [0]



// TODO: Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well - formed parentheses.



//   Example 1:

// Input: n = 3
// Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]


// Constraints:

// 1 <= n <= 8


function generateParenthesis(n) {
  const result = [];
  const backtrack = (current, open, close) => {
    if (current.length === n * 2) {
      result.push(current);
      return;
    }
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  };
  backtrack("", 0, 0);
  return result;
}
// Example usage:
// console.log(`generateParenthesis:`, generateParenthesis(5)); // ["((()))", "(()())", "(())()", "()(())", "()()()"]
// console.log(`generateParenthesis:`, generateParenthesis(1)); // ["()"]


// TODO: Merge k Sorted Lists

// You are given an array of k linked - lists lists, each linked - list is sorted in ascending order.

// Merge all the linked - lists into one sorted linked - list and return it.



//   Example 1:

// Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
// Output: [1, 1, 2, 3, 4, 4, 5, 6]
// Explanation: The linked - lists are:
// [
//   1 -> 4 -> 5,
//   1 -> 3 -> 4,
//   2 -> 6
// ]
// merging them into one sorted linked list:
// 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
// Example 2:

// Input: lists = []
// Output: []
// Example 3:

// Input: lists = [[]]
// Output: []


// Constraints:

// k == lists.length
// 0 <= k <= 104
// 0 <= lists[i].length <= 500
//   - 104 <= lists[i][j] <= 104
// lists[i] is sorted in ascending order.
// The sum of lists[i].length will not exceed 104.

function mergeKLists(lists) {
  if (lists.length === 0) return null;
  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let current = dummy;
    while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    if (l1 !== null) {
      current.next = l1;
    }
    if (l2 !== null) {
      current.next = l2;
    }
    return dummy.next;
  }
  const merge = (lists, left, right) => {
    if (left === right) return lists[left];
    const mid = Math.floor((left + right) / 2);
    const l1 = merge(lists, left, mid);
    const l2 = merge(lists, mid + 1, right);
    return mergeTwoLists(l1, l2);
  }
  return merge(lists, 0, lists.length - 1);
}

// Example usage:
const list11 = createLinkedList([1, 4, 5]);
const list22 = createLinkedList([1, 3, 4]);
const list33 = createLinkedList([2, 6]);
const mergedKList = mergeKLists([list11, list22, list33]);
// console.log(`mergeKLists:`, linkedListToArray(mergedKList)); // [1, 1, 2, 3, 4, 4, 5, 6]
// Example usage:
const mergedKList1 = mergeKLists([]);
// console.log(`mergeKLists:`, linkedListToArray(mergedKList1)); // []
// Example usage:
const list44 = createLinkedList([]);
const mergedKList2 = mergeKLists([list44]);
// console.log(`mergeKLists:`, linkedListToArray(mergedKList2)); // []




// TODO: Swap Nodes in Pairs


// Given a linked list, swap every two adjacent nodes and return its head.You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
// Example 1:
// Input: head = [1, 2, 3, 4]
// Output: [2, 1, 4, 3]
// Explanation:
// Example 2:
// Input: head = []
// Output: []
// Example 3:
// Input: head = [1]
// Output: [1]
// Example 4:
// Input: head = [1, 2, 3]
// Output: [2, 1, 3]
// Constraints:

// The number of nodes in the list is in the range[0, 100].
// 0 <= Node.val <= 100


const swapPairs = function (head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;
  while (current.next !== null && current.next.next !== null) {
    const first = current.next;
    const second = current.next.next;
    first.next = second.next;
    current.next = second;
    current.next.next = first;
    current = current.next.next;
  }
  return dummy.next;
}


// Example usage:
const list111 = createLinkedList([1, 2, 3, 4]);
const swappedList = swapPairs(list111);
// console.log(`swapPairs:`, linkedListToArray(swappedList)); // [2, 1, 4, 3]
// Example usage:
const list222 = createLinkedList([]);
const swappedList1 = swapPairs(list222);
// console.log(`swapPairs:`, linkedListToArray(swappedList1)); // []
// Example usage:
const list333 = createLinkedList([1]);
const swappedList2 = swapPairs(list333);
// console.log(`swapPairs:`, linkedListToArray(swappedList2)); // [1]
// Example usage:




// TODO:Reverse Nodes in k-Group

// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list.If the number of nodes is not a multiple of k then left - out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

// Example 1:
// Input: head = [1, 2, 3, 4, 5], k = 2
// Output: [2, 1, 4, 3, 5]

// Example 2:
// Input: head = [1, 2, 3, 4, 5], k = 3
// Output: [3, 2, 1, 4, 5]

// Constraints:

// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000



const reverseKGroup = function (head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let groupPrev = dummy;
  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (kth === null) break;
    let groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;
    while (current !== groupNext) {
      const temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;
    }
    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp;
  }
  return dummy.next;
}
// Example usage:
const list11112 = createLinkedList([1, 2, 3, 4, 5]);
const k = 2;
const reversedKList22 = reverseKGroup(list11112, k);
console.log(`reverseKGroup:`, linkedListToArray(reversedKList22)); // [2, 1, 4, 3, 5]
// Example usage:
const list22221 = createLinkedList([1, 2, 3, 4, 5]);
const k1 = 3;
const reversedKList122 = reverseKGroup(list22221, k1);
console.log(`reverseKGroup:`, linkedListToArray(reversedKList122)); // [3, 2, 1, 4, 5]





// TODO:Remove Duplicates from Sorted Array

// Given an integer array nums sorted in non - decreasing order, remove the duplicates in -place such that each unique element appears only once.The relative order of the elements should be kept the same.Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially.The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.



//   Example 1:

// Input: nums = [1, 1, 2]
// Output: 2, nums = [1, 2, _]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k(hence they are underscores).
//   Example 2:

// Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
// Output: 5, nums = [0, 1, 2, 3, 4, _, _, _, _, _]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k(hence they are underscores).


//   Constraints:

// 1 <= nums.length <= 3 * 104
//   - 100 <= nums[i] <= 100
// nums is sorted in non - decreasing order.


function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let uniqueIndex = 0;  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[i];
    }
  }
  return uniqueIndex + 1;
}
// Example usage:
const nums1 = [1, 1, 2];
const k12 = removeDuplicates(nums1);
console.log(`removeDuplicates:`, k12, nums1.slice(0, k1));
// Example usage:
const nums21 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k21 = removeDuplicates(nums21);
console.log(`removeDuplicates:`, k21, nums21.slice(0, k21));

// Intuition
// The function uses a two-pointer technique to efficiently remove duplicates from a sorted array in place.
// One pointer (uniqueIndex) tracks the position of the last unique element, while the other pointer (i) iterates through the array.
// When a new unique element is found, it is moved to the position after the last unique element, effectively overwriting duplicates.









