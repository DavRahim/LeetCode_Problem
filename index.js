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
console.log(`twoSum:`, twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(`twoSum:`, twoSum([3, 2, 4], 6)); // [1, 2]
console.log(`twoSum:`, twoSum([3, 3], 6)); // [0, 1]

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
console.log(`addTwoNumbers:`, linkedListToArray(result)); // [7, 0, 8] which represents the number 807

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
console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("abcabcbb")); // 3
console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("bbbbb")); // 1
console.log(`lengthOfLongestSubstring:`, lengthOfLongestSubstring("pwwkew")); // 3

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
console.log(`findMedianSortedArrays:`, findMedianSortedArrays([1, 3], [2])); // 2.0
console.log(`findMedianSortedArrays:`, findMedianSortedArrays([1, 2], [3, 4])); // 2.5

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
console.log(`maxArea:`, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(`maxArea:`, maxArea([1, 1])); // 1
console.log(`maxArea:`, maxArea([4, 3, 2, 1, 4])); // 16
console.log(`maxArea:`, maxArea([1, 2, 1])); // 2
