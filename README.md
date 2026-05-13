## Answers to Questions



### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?



### 2. How do you create and insert a new element into the DOM?



### 3. What is Event Bubbling? And how does it work?



### 4. What is Event Delegation in JavaScript? Why is it useful?



### 5. What is the difference between preventDefault() and stopPropagation() methods?



---



Answers

Answer #1

getElementByID('id') 

Selects a single element based on its unique id attribute & Returns a Single DOM Element obeject, or null if no match is found. Because IDs must be unique per page, this is generally the fastest selector.


getElementsByClassName('class')
Selects all elements that share a specific class name & Returns a HTMLCollection. This is a live collection, meaning if elements with this class are added or removed from the DOM later, the collection automatically updates.

querySelectorAll('selector'):

Uses CSS selectors, but selects all matching elements & Returns a NodeList. Unlike getElementsByClassName, this is a static collection, meaning it represents a snapshot of the DOM at the time it was called and will not update automatically if the DOM changes.


Answer #2

Creating a new DOM element uses document.createElement(), add content or attributes, then insert it using methods like appendChild() or append().

Example 

// 1. Create a new element
const newParagraph = document.createElement("p");

// 2. Add text/content
newParagraph.innerText = "Hello, I am a new paragraph!";

// 3. Insert it into the DOM
document.body.appendChild(newParagraph);

Answer #3


Event Bubbling means when an event happens on a child element, the event first runs on that child, then moves upward to its parent, then grandparent, and continues up the DOM tree.


Answer #4

Event Delegation means instead of adding event listeners to many child elements, you add one event listener to their parent and detect which child was clicked.

Because of event bubbling, when you click a child element, the event moves upward to the parent. So the parent can handle the click.



Answer #5

preventDefault() stops the browser’s default action.

For example, normally when you click a link, the browser opens that link.
If you use preventDefault(), the link will not open.


Example 
link.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Link clicked, but page did not change");
});

stopPropagation()

stopPropagation() stops the event from bubbling up to parent elements.

For example, if a button is inside a div, clicking the button can also trigger the div’s click event.
If you use stopPropagation(), only the button’s event will run.

const button = document.querySelector("button");

button.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Only button clicked");

});