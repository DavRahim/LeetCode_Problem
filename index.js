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
  let start = 0, end = 0;

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
console.log(`longestPalindrome:`, longestPalindrome("babad")); // "bab" or "aba"
console.log(`longestPalindrome:`, longestPalindrome("cbbd")); // "bb"
console.log(`longestPalindrome:`, longestPalindrome("abdur")); //   "aba" (or "bab", depending on the implementation)


// TODO: Zigzag Conversion

function convert(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows = Array.from({ length: numRows }, () => '');
  let currentRow = 0;
  let goingDown = false;

  for (let char of s) {
    rows[currentRow] += char;
    if (currentRow === 0) goingDown = true;
    else if (currentRow === numRows - 1) goingDown = false;

    currentRow += goingDown ? 1 : -1;
  }

  return rows.join('');
}
// Example usage:
console.log(`convert:`, convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR" 
console.log(`convert:`, convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
console.log(`convert:`, convert("A", 1)); // "A"

//Intuition
// The zigzag conversion arranges characters in a zigzag pattern across multiple rows, then reads them row by row.
// The function constructs an array of strings for each row, iterating through the input string and determining the current row based on the direction of traversal (down or up). 
// Finally, it joins the rows to form the final converted string.
// The time complexity is O(n), where n is the length of the input string, as each character is processed once.
// The space complexity is O(n) as well, due to the storage of characters in the rows array.
