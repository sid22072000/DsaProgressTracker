const mongoose = require("mongoose");
const Chapter = require("./models/Chapter");
const Topic = require("./models/Topic");
const Problem = require("./models/Problem");

mongoose.connect(
  "mongodb+srv://siddhant0722_db_user:l2bGhfbrBvrYSpI7@websheetcl.cfyxwoj.mongodb.net/dsawebsheet?retryWrites=true&w=majority&appName=WebsheetCL",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function seed() {
  await Chapter.deleteMany({});
  await Topic.deleteMany({});
  await Problem.deleteMany({});

  // Linked List Problems
  const llProblems = await Problem.create([
    {
      title: "Reverse a Linked List",
      description: "Reverse a singly linked list.",
      youtubeLink: "https://youtu.be/sYcOK51hl-A",
      leetCodeLink: "https://leetcode.com/problems/reverse-linked-list/",
      codeforcesLink: "",
      articleLink: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
      level: "Easy",
    },
    {
      title: "Detect Cycle in Linked List",
      description: "Check if a cycle exists in a linked list.",
      youtubeLink: "https://youtu.be/FKbfU2zv4dk",
      leetCodeLink: "https://leetcode.com/problems/linked-list-cycle/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
      level: "Medium",
    },
    {
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists.",
      youtubeLink: "https://youtu.be/XIdigk956u0",
      leetCodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
      level: "Easy",
    },
  ]);

  // Array Problems
  const arrProblems = await Problem.create([
    {
      title: "Find the Missing Number",
      description: "Find the missing number in an array.",
      youtubeLink: "https://youtu.be/8o7dd6c6Q0E",
      leetCodeLink: "https://leetcode.com/problems/missing-number/",
      codeforcesLink: "",
      articleLink: "https://www.geeksforgeeks.org/find-the-missing-number/",
      level: "Easy",
    },
    {
      title: "Maximum Subarray Sum",
      description: "Find the contiguous subarray with the largest sum.",
      youtubeLink: "https://youtu.be/2MmGzdiKR9Y",
      leetCodeLink: "https://leetcode.com/problems/maximum-subarray/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
      level: "Medium",
    },
    {
      title: "Sort an Array",
      description: "Sort an array using merge sort.",
      youtubeLink: "https://youtu.be/TzeBrDU-JaY",
      leetCodeLink: "https://leetcode.com/problems/sort-an-array/",
      codeforcesLink: "",
      articleLink: "https://www.geeksforgeeks.org/merge-sort/",
      level: "Medium",
    },
  ]);

  // Tree Problems
  const treeProblems = await Problem.create([
    {
      title: "Binary Tree Inorder Traversal",
      description: "Inorder traversal of a binary tree.",
      youtubeLink: "https://youtu.be/5dyE4lYv3nE",
      leetCodeLink:
        "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/",
      level: "Easy",
    },
    {
      title: "Height of Binary Tree",
      description: "Find the height of a binary tree.",
      youtubeLink: "https://youtu.be/eD3tmO66aBA",
      leetCodeLink:
        "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/write-a-c-program-to-find-the-height-or-depth-of-a-tree/",
      level: "Easy",
    },
    {
      title: "Check Balanced Tree",
      description: "Check if a binary tree is height-balanced.",
      youtubeLink: "https://youtu.be/Yt50Jfbd8Po",
      leetCodeLink: "https://leetcode.com/problems/balanced-binary-tree/",
      codeforcesLink: "",
      articleLink:
        "https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/",
      level: "Medium",
    },
  ]);

  // Topics
  const topicLL = await Topic.create({
    title: "Linked List Basics",
    description: "Basic operations and problems on linked lists.",
    problems: llProblems.map((p) => p._id),
  });
  const topicArr = await Topic.create({
    title: "Array Basics",
    description: "Fundamental array problems.",
    problems: arrProblems.map((p) => p._id),
  });
  const topicTree = await Topic.create({
    title: "Binary Tree Basics",
    description: "Basic binary tree problems.",
    problems: treeProblems.map((p) => p._id),
  });

  // Chapters
  await Chapter.create([
    {
      title: "Linked Lists",
      description: "All about linked lists.",
      topics: [topicLL._id],
    },
    {
      title: "Arrays",
      description: "All about arrays.",
      topics: [topicArr._id],
    },
    {
      title: "Binary Trees",
      description: "All about binary trees.",
      topics: [topicTree._id],
    },
  ]);

  console.log("More sample data seeded!");
  mongoose.connection.close();
}

seed();
