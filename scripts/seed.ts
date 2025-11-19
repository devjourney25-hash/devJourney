"use server";

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { dailyTips } from "../db/schema"; // Add this import
//import { lessonsPage } from "../db/schema";
const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("seeding database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
await db.delete(schema.dailyTips);            
await db.delete(schema.lessonModules);       
await db.delete(schema.unitDetails);      

    // Insert courses
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "JavaScript",
        imageSrc: "/js.png",
      },
      {
        id: 2,
        title: "Java",
        imageSrc: "/java.png",
      },
     
      {
        id: 3,
        title: "Python",
        imageSrc: "/python.png",
      },
      {
        id: 4,
        title: "C++",
        imageSrc: "/c++.png",
      },
    
    ]);

    
    // Insert units for courseId: 2
await db.insert(schema.units).values([
  {
    id: 1,
    title: "Variables - Storing and managing data",
        description: " Varibles hold values that can be used and updated in a program. They help store nubers, text and orher type of data",
         courseId: 1, 
    order: 1,
  },
  {
    id: 2,
    title: "Data Types - Different Kinds of Values in Javascript",
    description: "Javascript has different types of values, classified into two main categories",
  courseId: 1, 
    order: 2,
  },
  {
    id: 3,
    title: "Operator - Performing Actions on Values",
    description: " Operators allow us to manipulate and compare values in javascript ",
    courseId: 1,
    order: 3,
  },
  {
    id: 4,
    title: "Functions - Reusable code blocks",
        description: "Funcrions allows us to write reusable code that perform a specific task",
        courseId: 1,
    order: 4,
  },
  {
    id: 5,
    title: "Conditional Statement - Making decision in code",
        description: "Conditional statement allow programs to execute different code based on condition",
       courseId: 1, 
    order: 5,
  },
  {
    id: 6,
    title: "Loops - Repeating code efficiently",
    description: "Loops allow us to repeat actions multiple times without writing a code over and over",
    courseId: 1, 
    order: 6,
  },
  {
    id: 7,
    title: "Events - Hnadling User Interactions ",
        description: "Event allow javascripts to respond to user action like clicking, typing or submitting a form ",
        courseId: 1, 
    order: 7,
  },
  {
    id: 8,
    title: "DOM Manipulation - Changing Webpage content with javascript ",
    description: "DOM (Documentational Object Model) manipulation allows javascript to modify html and css dynamically",
    courseId: 1,
    order: 8,
  },
  // Insert units for Java (courseId: 2)
{
  id: 9,
  title: "Java Basics - Getting Started with Java",
  description: "Learn the fundamentals of Java including syntax, data types, and basic program structure",
  courseId: 2,
  order: 1,
},
{
  id: 10,
  title: "Object-Oriented Programming - Classes and Objects",
  description: "Master OOP concepts including classes, objects, inheritance, and polymorphism",
  courseId: 2,
  order: 2,
},
{
  id: 11,
  title: "Java Collections - Data Structures in Java",
  description: "Explore ArrayList, HashMap, Set, and other essential Java collections",
  courseId: 2,
  order: 3,
},
{
  id: 12,
  title: "Exception Handling - Managing Errors",
  description: "Learn how to handle errors gracefully using try-catch blocks and custom exceptions",
  courseId: 2,
  order: 4,
},
{
  id: 13,
  title: "File I/O - Reading and Writing Files",
  description: "Work with files and streams in Java for data persistence",
  courseId: 2,
  order: 5,
},
{
  id: 14,
  title: "Multithreading - Concurrent Programming",
  description: "Understand threads, synchronization, and parallel processing in Java",
  courseId: 2,
  order: 6,
},
{
  id: 15,
  title: "Java Streams API - Functional Programming",
  description: "Use modern Java features like streams, lambda expressions, and method references",
  courseId: 2,
  order: 7,
},
{
  id: 16,
  title: "Spring Boot - Building Enterprise Applications",
  description: "Create REST APIs and web applications using the Spring Boot framework",
  courseId: 2,
  order: 8,
},

]);


    // Insert lessons
    await db.insert(schema.lessons).values([
      //lesson 1
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "var, let, const",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "scope",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "hoisting",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "naming rules",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "reassignment",
      },


        //lesson 2
        {
          id: 6,
          unitId: 2,
          order: 1,
          title: "primitive types ",
        },
        {
          id: 7,
          unitId: 2,
          order: 2,
          title: "references type",
        },
        {
          id: 8,
          unitId: 2,
          order: 3,
          title: "type checking",
        },
        {
          id: 9,
          unitId: 2,
          order: 4,
          title: "type conversion",
        },
       
      //lesson 3
      {
        id: 10,
        unitId: 3,
        order: 1,
        title: "arithmetic ",
      },
      {
        id: 11,
        unitId: 3,
        order: 2,
        title: "comparison",
      },
      {
        id: 12,
        unitId: 3,
        order: 3,
        title: "logical",
      },
      {
        id: 13,
        unitId: 3,
        order: 4,
        title: "assignment",
      },
      {
        id: 14,
        unitId: 3,
        order: 5,
        title: "ternary operator",
      },
     

       
      //lesson 4
      {
        id: 15,
        unitId: 4,
        order: 1,
        title: "function declaration ",
      },
      {
        id: 16,
        unitId: 4,
        order: 2,
        title: "function expression",
      },
      {
        id: 17,
        unitId: 4,
        order: 3,
        title: "arrow function",
      },
      {
        id: 18,
        unitId: 4,
        order: 4,
        title: "parameter and return values",
      },
      {
        id: 19,
        unitId: 4,
        order: 5,
        title: "default parameter",
      },
      {
        id: 20,
        unitId: 4,
        order: 6,
        title: "callback function",
      },
      
   //lesson 5
   {
    id: 21,
    unitId: 5,
    order: 1,
    title: "if else ",
  },
  {
    id: 22,
    unitId: 5,
    order: 2,
    title: "switch statement",
  },
  {
    id: 23,
    unitId: 5,
    order: 3,
    title: "truth and false values",
  },
  {
    id: 24,
    unitId: 5,
    order: 4,
    title: "short-circuit evaluation",
  },

  //lesson 6
  {
    id: 25,
    unitId: 6,
    order: 1,
    title: "for loop ",
  },
  {
    id: 26,
    unitId: 6,
    order: 2,
    title: "while loop",
  },
  {
    id: 27,
    unitId: 6,
    order: 3,
    title: "do while loop",
  },
  {
    id: 28,
    unitId: 6,
    order: 4,
    title: "for of",
  },
  {
    id: 29,
    unitId: 6,
    order: 5,
    title: "for in",
  },
  {
    id: 30,
    unitId: 6,
    order: 6,
    title: "break and continue",
  },

  //lesson 7
  {
    id: 31,
    unitId: 7,
    order: 1,
    title: "add event listener",
  },
  {
    id: 32,
    unitId: 7,
    order: 2,
    title: "mouse event",
  },
  {
    id: 33,
    unitId: 7,
    order: 3,
    title: "keyboard event",
  },
  {
    id: 34,
    unitId: 7,
    order: 4,
    title: "form event",
  },

  //lesson 8
  {
    id: 35,
    unitId: 8,
    order: 1,
    title: "add event listener",
  },
  {
    id: 36,
    unitId: 8,
    order: 2,
    title: "mouse event",
  },
  {
    id: 37,
    unitId: 8,
    order: 3,
    title: "keyboard event",
  },
  {
    id: 38,
    unitId: 8,
    order: 4,
    title: "form event",
  },
  {
    id: 39,
    unitId: 8,
    order: 5,
    title: "form event",
  },

  {
    id: 40,
    unitId: 9,
    order: 1,
    title: "Introduction to Java",
  },
  {
    id: 41,
    unitId: 9,
    order: 2,
    title: "Java Syntax",
  },
  {
    id: 42,
    unitId: 9,
    order: 3,
    title: "Variables and Data Types",
  },
  
  // Java Unit 2: OOP lessons
  {
    id: 43,
    unitId: 10,
    order: 1,
    title: "Classes and Objects",
  },
  {
    id: 44,
    unitId: 10,
    order: 2,
    title: "Inheritance",
  },
  {
    id: 45,
    unitId: 10,
    order: 3,
    title: "Polymorphism",
  },
  
  // Java Unit 3: Collections lessons
  {
    id: 46,
    unitId: 11,
    order: 1,
    title: "ArrayList",
  },
  {
    id: 47,
    unitId: 11,
    order: 2,
    title: "HashMap",
  },
  {
    id: 48,
    unitId: 11,
    order: 3,
    title: "Set Interface",
  },
  
  // Java Unit 4: Exception Handling lessons
  {
    id: 49,
    unitId: 12,
    order: 1,
    title: "Try-Catch Blocks",
  },
  {
    id: 50,
    unitId: 12,
    order: 2,
    title: "Custom Exceptions",
  },
  
  // Add more lessons for other Java units as needed...
]);


    

    // Insert challenges
    await db.insert(schema.challenges).values([
      //varibles
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "Which of the following is true about let?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question: "Which keyword is recomended for declaring variablea that are reassigned frequently?",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "what happen if you declare a variable using const without assigning a value?",
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        question: "which keyword should you use for constants that are object but need proper updates?",
      },
      {
        id: 5,
        lessonId: 1,
        type: "SELECT",
        order: 5,
        question: "why is let prefered over var?",
      },
      {
        id: 6,
        lessonId: 1,
        type: "SELECT",
        order: 6,
        question: "which varibles declaration is blocked-scoped and cannot be declared within the same code ?",
      },
      {
        id: 7,
        lessonId: 1,
        type: "SELECT",
        order: 7,
        question: "what happen when you try to reassign a const variable?",
      },
      {
        id: 8,
        lessonId: 1,
        type: "SELECT",
        order: 8,
        question: "which keyword is function scoped and can be declared?",
      },
      {
        id: 9,
        lessonId: 1,
        type: "SELECT",
        order: 9,
        question: "which variable type should be used if you are storing data that wont be modified and prefer strict coding practice?",
      },
//scope

      {
        id: 10,
        lessonId: 2,
        type: "SELECT",
        order: 1,
     question: "which of the following is true regarding block scope",
     },
 {
        id: 11,
        lessonId: 2,
        type: "SELECT",
        order: 2,
        question: "what is the scope varibales declared using let inside a block?",
      },
      {
        id: 12,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: "which statement best descrribe for global scope ",
      },
      {
        id: 13,
        lessonId: 2,
        type: "SELECT",
        order: 4,
        question: "Which variables declaration would be accessible outside of a block ",
      },
      {
        id: 14,
        lessonId: 2,
        type: "SELECT",
        order: 5,
         question: "what is the global scope in javascript ",
       },
      {
        id: 15,
        lessonId: 2,
        type: "SELECT",
        order: 6,
        question: "which scope is created when a function is declared?",
      },
      {
        id: 16,
        lessonId: 2,
        type: "SELECT",
        order: 7,
         question: " what type of scope is does let created within a block of code ",
       },
      {
        id: 17,
        lessonId: 2,
        type: "SELECT",
        order: 8,
        question: "which variables are accessible inside a nested function",
      },
      {
        id: 18,
        lessonId: 2,
        type: "SELECT",
        order: 9,
        question: "what happen when a variable is declared without a var, let, const?",
      },
      {
        id: 19,
        lessonId: 2,
        type: "SELECT",
        order: 10,
       question: " which scope is the most restrictive",
      },


      {
        id: 20,
        lessonId: 2,
        type: "SELECT",
        order: 11,
       question: "can a variables declared inside a block using let be accessed outside of that block ",
      },



     


    ]);

    // Insert challenge options
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        correct: true,
        text: "it has a blocked code",
      },
      {
        id: 2,
        challengeId: 1,
        correct: false,
        text: "it can be redeclared within the same scope",
      },
      {
        id: 3,
        challengeId: 1,
        correct: false,
        text: "it is not hoisted",
      },
      {
        id: 4,
        challengeId: 1,
        correct: false,
        text: "it is function scoped",
      },



      {
        id: 5,
        challengeId: 2,
        correct: false,
        text: "const",
      },
      {
        id: 6,
        challengeId: 2,
        correct: true,
        text: "let",
      },
      {
        id: 7,
        challengeId: 2,
        correct: false,
        text: "var",
      },
      {
        id: 8,
        challengeId: 2,
        correct: false,
        text: "static",
      },


      {
        id: 9,
        challengeId: 3,
        correct: false,
        text: "it will defalaut to null",
      },
      {
        id: 10,
        challengeId: 3,
        correct: true,
        text: "it will throw an error",
      },
      {
        id: 11,
        challengeId: 3,
        correct: false,
        text: "it will be assigned undefined",
      },
      {
        id: 12,
        challengeId: 3,
        correct: false,
        text: "it will create an empty variable",
      },

      
      {
        id: 13,
        challengeId: 4,
        correct: false,
        text: "let",
      },
      {
        id: 14,
        challengeId: 4,
        correct: true,
        text: "const",
      },
      {
        id: 15,
        challengeId: 4,
        correct: false,
        text: "var",
      },
      {
        id: 16,
        challengeId: 4,
        correct: false,
        text: "final",
      },
     

      
      {
        id: 17,
        challengeId: 5,
        correct: false,
        text: "let is globally scoped",
      },
      {
        id: 18,
        challengeId: 5,
        correct: false,
        text: "let has better readability",
      },
      {
        id: 19,
        challengeId: 5,
        correct: false,
        text: "let support function level scoped",
      },
      {
        id: 20,
        challengeId: 5,
        correct: true,
        text: "let prevent accidental declaration",
      },

      
      {
        id: 21,
        challengeId: 6,
        correct: false,
        text: "var",
      },
      {
        id: 22,
        challengeId: 6,
        correct: false,
        text: "let",
      },
      {
        id: 23,
        challengeId: 6,
        correct: false,
        text: "const",
      },
      {
        id: 24,
        challengeId: 6,
        correct: true,
        text: "both b and c",
      },

      
      {
        id: 25,
        challengeId: 7,
        correct: true,
        text: "it throw an eror",
      },
      {
        id: 26,
        challengeId: 7,
        correct: false,
        text: "it update the value",
      },
      {
        id: 27,
        challengeId: 7,
        correct: false,
        text: "it set the value to undefined",
      },
      {
        id: 28,
        challengeId: 7,
        correct: false,
        text: "it create a new variable",
      },

      
      {
        id: 29,
        challengeId: 8,
        correct: true,
        text: "var",
      },
      {
        id: 30,
        challengeId: 8,
        correct: false,
        text: "let",
      },
      {
        id: 31,
        challengeId: 8,
        correct: false,
        text: "const",
      },
      {
        id: 32,
        challengeId: 8,
        correct: false,
        text: "none of the above",
      },

      
      {
        id: 33,
        challengeId: 9,
        correct: false,
        text: "var",
      },
      {
        id: 34,
        challengeId: 9,
        correct: false,
        text: "let",
      },
      {
        id: 35,
        challengeId: 9,
        correct: true,
        text: "const",
      },
      {
        id: 36,
        challengeId: 9,
        correct: false,
        text: "none of the above",
      },
      //button 2
       {
        id: 37,
        challengeId: 10,
        correct: false,
        text: "var is a blocked scope",
      },
      {
        id: 38,
        challengeId: 10,
        correct: false,
        text: "let and const are function scope",
      },
      {
        id: 39,
        challengeId: 10,
        correct: true,
        text: "const cannot be reassigned but its object properties can be mutated",
      },
      {
        id: 40,
        challengeId: 10,
        correct: false,
        text: "variables declared with letare hoisted and initialized with undefined",
      },

       {
        id: 41,
        challengeId: 11,
        correct: false,
        text: "global scope",
      },
      {
        id: 42,
        challengeId: 11,
        correct: true,
        text: "block scope",
      },
      {
        id: 43,
        challengeId: 11,
        correct: false,
        text: "function scope",
      },
      {
        id: 44,
        challengeId: 11,
        correct: false,
        text: "no scope",
      },

      {
        id: 45,
        challengeId: 12,
        correct: true,
        text: "variable can be accessed from any part of code ",
      },
      {
        id: 46,
        challengeId: 12,
        correct: false,
        text: "variable are accessibles only within a function",
      },
      {
        id: 47,
        challengeId: 12,
        correct: false,
        text: "varibles are limited to a block",
      },
      {
        id: 48,
        challengeId: 12,
        correct: false,
        text: "variables are cleared once a function end ",
      },

      {
        id: 49,
        challengeId: 13,
        correct: true,
        text: "only var",
      },
      {
        id: 50,
        challengeId: 13,
        correct: false,
        text: "only let",
      },
      {
        id: 51,
        challengeId: 13,
        correct: false,
        text: "both var and let",
      },
      {
        id: 52,
        challengeId: 13,
        correct: false,
        text: "neither var nor let",
      },

      {
        id: 53,
        challengeId: 14,
        correct: false,
        text: "the scope within a scope ",
      },
      {
        id: 54,
        challengeId: 14,
        correct: false,
        text: "the scope within a block",
      },
      {
        id: 55,
        challengeId: 14,
        correct: true,
        text: "the outermost scope where variables are accessible throughout the code",
      },
      {
        id: 56,
        challengeId: 14,
        correct: false,
        text: "the scope of variables declared using let ",
      },

      {
        id: 57,
        challengeId: 15,
        correct: false,
        text: "global scope",
      },
      {
        id: 58,
        challengeId: 15,
        correct: false,
        text: "block scope",
      },
      {
        id: 59,
        challengeId: 15,
        correct: true,
        text: "function scope",
      },
      {
        id: 60,
        challengeId: 15,
        correct: false,
        text: "module scope",
      },

      {
        id: 61,
        challengeId: 16,
        correct: false,
        text: "global scope ",
      },
      {
        id: 62,
        challengeId: 16,
        correct: true,
        text: "block scope",
      },
      {
        id: 63,
        challengeId: 16,
        correct: false,
        text: "function scope",
      },
      {
        id: 64,
        challengeId: 16,
        correct: false,
        text: "lexical scope",
      },

      {
        id: 65,
        challengeId: 17,
        correct: false,
        text: "variables declared globally ",
      },
      {
        id: 66,
        challengeId: 17,
        correct: false,
        text: "variable declared in the outer function",
      },
      {
        id: 67,
        challengeId: 17,
        correct: false,
        text: "variables declared using var",
      },
      {
        id: 68,
        challengeId: 17,
        correct: true,
        text: "all of the above",
      },

      {
        id: 69,
        challengeId: 18,
        correct: false,
        text: "it throw an error ",
      },
      {
        id: 70,
        challengeId: 18,
        correct: true,
        text: "it is declared globally",
      },
      {
        id: 71,
        challengeId: 18,
        correct: false,
        text: "it is declared within the current block scope",
      },
      {
        id: 72,
        challengeId: 18,
        correct: false,
        text: "it is ignore",
      },

      {
        id: 73,
        challengeId: 19,
        correct: false,
        text: "global scope ",
      },
      {
        id: 74,
        challengeId: 19,
        correct: false,
        text: "function scope",
      },
      {
        id: 75,
        challengeId: 19,
        correct: true,
        text: "block scope",
      },
      {
        id: 76,
        challengeId: 19,
        correct: false,
        text: "module scope",
      },

      {
        id: 77,
        challengeId: 20,
        correct: false,
        text: "yes ",
      },
      {
        id: 78,
        challengeId: 20,
        correct: true,
        text: "no",
      },
      {
        id: 79,
        challengeId: 20,
        correct: false,
        text: "only if it is a global variables",
      },
      {
        id: 80,
        challengeId: 20,
        correct: false,
        text: "only if it is a function variables",
      },
    ]);
// Insert daily coding tips
await db.insert(dailyTips).values([
  {
    title: "Write Clean Code",
    description: "Always format and indent your code properly. Clean code is easier to read, debug, and maintain.",
    category: "best-practice",
    priority: "HIGH",
    isActive: true,
  },
  {
    title: "Use Meaningful Names",
    description: "Choose clear and descriptive variable, function, and class names to make your code self-explanatory.",
    category: "best-practice",
    priority: "HIGH",
    isActive: true,
  },
  {
    title: "Practice Debugging",
    description: "Learn how to use debugging tools and read error messages carefully. Debugging is a core programming skill.",
    category: "learning",
    priority: "MEDIUM",
    isActive: true,
  },
  {
    title: "Read Documentation",
    description: "Get comfortable with reading official documentation. It helps you understand libraries, frameworks, and APIs better.",
    category: "learning",
    priority: "HIGH",
    isActive: true,
  },
  {
    title: "Break Problems Down",
    description: "Split large coding tasks into smaller steps. Solving small parts makes complex problems easier to manage.",
    category: "problem-solving",
    priority: "HIGH",
    isActive: true,
  },
  {
    title: "Use Version Control",
    description: "Always use Git for your projects. Commit often and write clear commit messages for better collaboration.",
    category: "tools",
    priority: "MEDIUM",
    isActive: true,
  },
  {
    title: "Avoid Over-Engineering",
    description: "Keep your solutions simple and avoid unnecessary complexity. Simpler code is easier to maintain.",
    category: "best-practice",
    priority: "LOW",
    isActive: true,
  },
  {
    title: "Learn by Building",
    description: "Practice coding by creating small projects. Applying concepts in real scenarios helps retain knowledge.",
    category: "learning",
    priority: "HIGH",
    isActive: true,
  },
  {
    title: "Write Comments Wisely",
    description: "Use comments to explain the 'why' behind complex code, not the 'what'—your code should explain itself.",
    category: "best-practice",
    priority: "LOW",
    isActive: true,
  },
  {
    title: "Stay Consistent",
    description: "Follow a consistent coding style across your project. Consistency improves readability and collaboration.",
    category: "best-practice",
    priority: "MEDIUM",
    isActive: true,
  }
]);

// Insert lesson modules
// Remove 'id' (auto-increment) and 'imageSrc' (not in schema)
await db.insert(schema.lessonModules).values([
  {
    courseId: 1, // JavaScript
    title: "JavaScript Programming Fundamentals",
    description: "Welcome to the JavaScript lesson! 🚀\n\nThis comprehensive course will walk you through the fundamentals of JavaScript programming, including variables, data types, operators, functions, DOM manipulation, and modern ES6+ features.",
    tip: "Master JavaScript by building interactive web applications, learning frameworks like React/Vue/Angular, practicing algorithm challenges on Codewars or LeetCode, and contributing to open-source projects.",
    order: 1,
  },
  {
    courseId: 2, // Java
    title: "Java Programming Complete Guide",
    description: "Welcome to the Java lesson! 🚀\n\nThis course covers everything from Java basics to advanced concepts including OOP principles, collections, multithreading, and enterprise development with Spring Boot.",
    tip: "Master Java by building enterprise applications with Spring Boot, mobile apps with Android, practicing design patterns, and solving problems on HackerRank or LeetCode.",
    order: 2,
  },
  {
    courseId: 3, // Python
    title: "Python Programming Mastery",
    description: "Welcome to the Python lesson! 🚀\n\nLearn Python from scratch including syntax, data structures, OOP, web development with Django/Flask, data science libraries, and automation scripting.",
    tip: "Master Python by creating data analysis projects, web applications with Django/Flask, automation scripts, machine learning models, and contributing to Python open-source projects.",
    order: 3,
  },
  {
    courseId: 4, // C++
    title: "C++ Programming Deep Dive",
    description: "Welcome to the C++ lesson! 🚀\n\nExplore C++ from fundamentals to advanced topics including memory management, OOP, STL, templates, and system-level programming.",
    tip: "Master C++ by building game engines, system utilities, competitive programming on Codeforces, embedded systems projects, and studying STL algorithms thoroughly.",
    order: 4,
  },
]);



// Replace the unitDetails insert section in your seed file with this:

// Insert unit details - NOW LINKED TO LESSON MODULES, NOT UNITS
await db.insert(schema.unitDetails).values([
  // Lesson Module 1: JavaScript Programming Fundamentals
  {
    id: 1,
    lessonModuleId: 1, // CHANGED from unitId: 1
    title: "Introduction to Variables",
    content: "Variables are containers for storing data values. In JavaScript, we use var, let, and const to declare variables. Each has different scoping rules and use cases.\n\nlet is block-scoped and can be reassigned, making it ideal for values that change. const is also block-scoped but cannot be reassigned, perfect for constants. var is function-scoped and should be avoided in modern JavaScript.",
    sampleCode: `// Using let - can be reassigned
let age = 25;
age = 26; // This works!

// Using const - cannot be reassigned
const name = "John";
// name = "Jane"; // This would cause an error!

// Variables can hold different types
let score = 100;        // Number
let playerName = "Alex"; // String
let isActive = true;    // Boolean

console.log(score, playerName, isActive);`,
    codeExplanation: "This example demonstrates the three ways to declare variables in JavaScript. Notice how let allows reassignment while const does not. Variables can store different data types like numbers, strings, and booleans.",
    keyPoints: JSON.stringify([
      "Use let for variables that will change",
      "Use const for variables that won't change",
      "Avoid using var in modern JavaScript",
      "Variables must be declared before use",
      "Choose meaningful variable names"
    ]),
    order: 1,
  },
  {
    id: 2,
    lessonModuleId: 1, // CHANGED from unitId: 1
    title: "Variable Scope and Hoisting",
    content: "Scope determines where variables can be accessed in your code. Block scope means the variable only exists within the curly braces {}. Function scope means the variable exists throughout the entire function.\n\nHoisting is JavaScript's behavior of moving declarations to the top of their scope. However, only declarations are hoisted, not initializations.",
    sampleCode: `// Block scope example
if (true) {
  let blockVar = "I'm block-scoped";
  console.log(blockVar); // Works!
}
// console.log(blockVar); // Error! Not accessible outside block

// Function scope example
function myFunction() {
  var functionVar = "I'm function-scoped";
  console.log(functionVar); // Works!
}
// console.log(functionVar); // Error! Not accessible outside function

// Hoisting example
console.log(hoistedVar); // undefined (not an error!)
var hoistedVar = "I'm hoisted";

// console.log(notHoisted); // Error! let/const are not hoisted
let notHoisted = "I'm not hoisted";`,
    codeExplanation: "This demonstrates how let and const are block-scoped while var is function-scoped. The hoisting example shows that var declarations are moved to the top, but their values are not.",
    keyPoints: JSON.stringify([
      "let and const are block-scoped",
      "var is function-scoped",
      "Block scope is more predictable and safer",
      "Hoisting can lead to unexpected behavior",
      "Always declare variables at the top of their scope"
    ]),
    order: 2,
  },
  {
    id: 3,
    lessonModuleId: 1, // JavaScript course details
    title: "Primitive Data Types",
    content: "JavaScript has 7 primitive data types: String, Number, Boolean, Undefined, Null, Symbol, and BigInt. Primitives are immutable (cannot be changed) and are compared by value.\n\nStrings represent text, Numbers represent numeric values, Booleans represent true/false, Undefined means a variable has been declared but not assigned, and Null represents the intentional absence of a value.",
    sampleCode: `// String - text data
let greeting = "Hello, World!";
let name = 'JavaScript';
let template = \`My name is \${name}\`; // Template literal

// Number - numeric data
let integer = 42;
let decimal = 3.14;
let negative = -10;
let scientific = 2.5e6; // 2,500,000

// Boolean - true or false
let isActive = true;
let hasPermission = false;

// Undefined - no value assigned
let notAssigned;
console.log(notAssigned); // undefined

// Null - intentionally empty
let emptyValue = null;

// typeof operator
console.log(typeof greeting);  // "string"
console.log(typeof integer);   // "number"
console.log(typeof isActive);  // "boolean"`,
    codeExplanation: "This code shows all primitive types in action. Notice how strings can use single quotes, double quotes, or template literals. The typeof operator helps identify the data type of a value.",
    keyPoints: JSON.stringify([
      "Primitives are immutable and compared by value",
      "Strings can use quotes or template literals",
      "JavaScript has only one Number type for all numbers",
      "undefined means 'not yet assigned'",
      "null means 'intentionally empty'",
      "Use typeof to check data types"
    ]),
    order: 3,
  },
  {
    id: 4,
    lessonModuleId: 1,
    title: "Reference Types (Objects and Arrays)",
    content: "Reference types (Objects, Arrays, Functions) are mutable and compared by reference, not value. When you assign a reference type to a variable, you're storing a reference to the location in memory, not the actual value.\n\nObjects store collections of key-value pairs, while Arrays store ordered lists of values. This makes them perfect for complex data structures.",
    sampleCode: `// Objects - collections of properties
let person = {
  name: "Alice",
  age: 30,
  city: "New York",
  hobbies: ["reading", "coding"]
};

console.log(person.name);        // "Alice"
console.log(person["age"]);      // 30
person.job = "Developer";        // Add new property

// Arrays - ordered lists
let colors = ["red", "green", "blue"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];

console.log(colors[0]);          // "red"
colors.push("yellow");           // Add to end
console.log(colors.length);      // 4

// Reference vs Value
let a = { value: 10 };
let b = a;                       // b references same object as a
b.value = 20;
console.log(a.value);            // 20 (both changed!)

let x = 10;
let y = x;                       // y gets a copy of x's value
y = 20;
console.log(x);                  // 10 (x unchanged)`,
    codeExplanation: "Objects use key-value pairs for storing data. Arrays use numeric indexes. The reference example shows how objects are shared between variables, while primitives are copied.",
    keyPoints: JSON.stringify([
      "Objects store key-value pairs",
      "Arrays store ordered collections",
      "Reference types are mutable",
      "Copying a reference type copies the reference, not the value",
      "Use square brackets [] for arrays, curly braces {} for objects",
      "Arrays have many built-in methods like push, pop, shift"
    ]),
    order: 4,
  },
  {
    id: 5,
    lessonModuleId: 1,
    title: "Arithmetic and Assignment Operators",
    content: "Arithmetic operators perform mathematical calculations. Assignment operators assign values to variables. JavaScript also has compound assignment operators that combine arithmetic and assignment.\n\nThe order of operations follows standard mathematical rules (PEMDAS): Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.",
    sampleCode: `// Arithmetic operators
let a = 10;
let b = 3;

console.log(a + b);   // 13 (addition)
console.log(a - b);   // 7  (subtraction)
console.log(a * b);   // 30 (multiplication)
console.log(a / b);   // 3.333... (division)
console.log(a % b);   // 1  (modulus - remainder)
console.log(a ** b);  // 1000 (exponentiation)

// Increment and decrement
let count = 5;
count++;              // count = 6 (increment)
count--;              // count = 5 (decrement)

// Assignment operators
let x = 10;
x += 5;               // x = x + 5  → 15
x -= 3;               // x = x - 3  → 12
x *= 2;               // x = x * 2  → 24
x /= 4;               // x = x / 4  → 6
x %= 4;               // x = x % 4  → 2

// Order of operations
let result = 2 + 3 * 4;           // 14 (not 20!)
let withParens = (2 + 3) * 4;     // 20`,
    codeExplanation: "This demonstrates all arithmetic operators and how compound assignment operators provide shortcuts. The modulus operator (%) is particularly useful for finding remainders.",
    keyPoints: JSON.stringify([
      "Use + - * / for basic math operations",
      "% gives the remainder after division",
      "** is the exponentiation operator",
      "++ and -- increment/decrement by 1",
      "Compound operators (+=, -=, etc.) are shortcuts",
      "Use parentheses to control order of operations"
    ]),
    order: 5,
  },

  // Add more unit details for other lesson modules (Java, Python, C++)
  {
    id: 6,
    lessonModuleId: 2, // Java course
    title: "Java Basics - Introduction",
    content: "Java is a powerful, object-oriented programming language. It's platform-independent, meaning code written once can run anywhere with a Java Virtual Machine (JVM).",
    sampleCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    codeExplanation: "This is the classic 'Hello World' program in Java. Every Java program needs a class and a main method to run.",
    keyPoints: JSON.stringify([
      "Java is object-oriented and platform-independent",
      "Every Java program needs a class",
      "The main method is the entry point",
      "Use System.out.println() to print output"
    ]),
    order: 1,
  },
]);

  

    console.log("seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

// Call the main function to execute the seeding
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
