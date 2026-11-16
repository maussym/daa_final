export default {
  "lessons": [
    {
      "id": 1,
      "name": "Algorithm design",
      "title": "Thinking like an algorithm designer",
      "group": "Foundations",
      "description": "Algorithm specifications and Karatsuba multiplication.",
      "blocks": [
        {
          "kind": "heading",
          "text": "From a problem statement to a method"
        },
        {
          "kind": "paragraph",
          "text": "An algorithm is a finite sequence of precise, executable steps that transforms allowed inputs into the required outputs. A problem can ask a decision (yes/no), search (find a witness), optimization (best feasible solution), or enumeration (list all solutions)."
        },
        {
          "kind": "bullet",
          "text": "Specify inputs, permitted values, output and edge cases before writing code."
        },
        {
          "kind": "bullet",
          "text": "Outline the steps, argue correctness, estimate time and space, implement, then test and measure. A growth bound requires an argument that covers the stated class of inputs."
        },
        {
          "kind": "bullet",
          "text": "Compare the number of operations as the input grows. Count significant resources separately, such as comparisons, memory, recursion frames, or copied elements."
        },
        {
          "kind": "heading",
          "text": "Worked example from the Week 1 practice"
        },
        {
          "kind": "paragraph",
          "text": "Split 23 = 2·10 + 3 and 76 = 7·10 + 6. The four-product method computes ac = 14, ad = 12, bc = 21 and bd = 18. The final result is 14·100 + (12 + 21)·10 + 18 = 1748."
        },
        {
          "kind": "paragraph",
          "text": "Karatsuba computes ac = 14, bd = 18, and (a+b)(c+d) = 5·13 = 65. The middle term is 65 − 14 − 18 = 33. This replaces two cross-products with one larger product and some additions and subtractions."
        },
        {
          "kind": "paragraph",
          "text": "For n digits, with a linear-time split/combine and suitably handled carries, the recurrence changes from 4T(n/2) + Θ(n) = Θ(n²) to 3T(n/2) + Θ(n) = Θ(n^log₂3), about Θ(n^1.585). The savings recur at every level."
        },
        {
          "kind": "heading",
          "text": "Trace and explain"
        },
        {
          "kind": "table",
          "rows": [
            [
              "Question",
              "Answer"
            ],
            [
              "18 × 27 by Karatsuba",
              "ac = 2, bd = 56, middle = 9·9 − 2 − 56 = 23. The result is 200 + 230 + 56 = 486."
            ],
            [
              "Why keep a small-input cutoff?",
              "Recursion overhead and constants can outweigh a better asymptotic bound on short inputs."
            ],
            [
              "What makes a base case correct?",
              "It directly solves every input it covers. The recursive branch must shrink toward it."
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "Practice cue. When explaining a new algorithm in English, name the input and output first. Then identify the operation you are counting and the condition that makes the method finish."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27636"
    },
    {
      "id": 2,
      "name": "Divide & conquer",
      "title": "Recursion and recurrences",
      "group": "Foundations",
      "description": "Recurrences, recursion trees and the Master Theorem.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Write the recurrence from the code"
        },
        {
          "kind": "paragraph",
          "text": "For T(n) = aT(n/b) + f(n), a is the number of calls, n/b is each subproblem size, and f(n) is work outside recursion. A balanced tree reaches size 1 after log_b n levels. Level i costs a^i·f(n/b^i). Depth is the length of a single root-to-leaf path, independent of the total number of calls."
        },
        {
          "kind": "paragraph",
          "text": "For T(n) = aT(n/b) + Θ(n^d), compare d with log_b a. When d is smaller, leaves give Θ(n^log_b a). When equal, the levels sum to Θ(n^d log n). When d is larger, the root dominates and the total is Θ(n^d). For a more general root-heavy f(n), check polynomial domination and regularity before invoking that Master Theorem case."
        },
        {
          "kind": "table",
          "rows": [
            [
              "Recurrence",
              "Reason and solution"
            ],
            [
              "T(n) = 2T(n/2) + Θ(n)",
              "Each level costs Θ(n). There are Θ(log n) levels. Merge Sort costs Θ(n log n)."
            ],
            [
              "T(n) = T(n−1) + Θ(1)",
              "There are n−1 constant-work steps and a constant base. Θ(n)."
            ],
            [
              "T(n) = 8T(n/2) + O(n²)",
              "Θ(n³) for constant positive base costs and nonnegative work. There are n³ leaves."
            ],
            [
              "T(n) = 2T(n/2) + (n log n)²",
              "Θ(n² log² n). Level i costs n²·(log₂ n−i)² / 2^i for base-2 logs. The root gives the lower bound and a geometric series gives the upper bound."
            ]
          ]
        },
        {
          "kind": "heading",
          "text": "Unequal splits and Java recursion"
        },
        {
          "kind": "paragraph",
          "text": "Akra–Bazzi for unequal fractions bᵢ chooses p so that Σ aᵢbᵢ^p = 1, then applies Θ(n^p(1 + ∫₁ⁿ g(u)/u^(p+1) du)) under the usual regularity assumptions. For T(n/3)+T(2n/3)+n, p=1 exactly since 1/3+2/3=1, and the solution is Θ(n log n). The same reasoning applies to n/4 and 3n/4. The practice hint suggesting otherwise for thirds is inconsistent with its equation."
        },
        {
          "kind": "paragraph",
          "text": "With 4T(n/2)+O(n²), an upper bound alone gives O(n² log n). The leaf lower bound is Ω(n²). If the combine work is Θ(n²), the tight answer is Θ(n² log n)."
        },
        {
          "kind": "paragraph",
          "text": "Java recursion creates stack frames. Java gives no general tail-call-elimination guarantee. In A1 QuickSort, recurse on the smaller partition and iterate over the larger one. This bounds stack depth by O(log n) even on a sequence of poor splits that costs Θ(n²) time."
        },
        {
          "kind": "heading",
          "text": "Assignment 1 recall"
        },
        {
          "kind": "paragraph",
          "text": "Merge Sort uses one reusable buffer. Randomized QuickSort has expected Θ(n log n) time, with Θ(n²) worst-case partitions. Median-of-medians uses groups of five and leaves at most about 7n/10 in the selected side, giving T(n) ≤ T(n/5)+T(7n/10+O(1))+O(n) and Θ(n) worst-case time. Closest pair reaches Θ(n log n) when you preserve y-order and scan the dividing strip in linear time."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27637"
    },
    {
      "id": 3,
      "name": "Complexity & correctness",
      "title": "Bounds and correctness",
      "group": "Foundations",
      "description": "Asymptotic bounds, invariants and benchmarking.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Asymptotic bounds"
        },
        {
          "kind": "table",
          "rows": [
            [
              "Notation",
              "Formal meaning for sufficiently large n"
            ],
            [
              "O(g(n))",
              "There are constants c > 0 and n₀ with 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀."
            ],
            [
              "Ω(g(n))",
              "There are constants c > 0 and n₀ with 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀."
            ],
            [
              "Θ(g(n))",
              "Both bounds hold for positive constants. The rates agree up to constant factors."
            ],
            [
              "o(g(n)) and ω(g(n))",
              "Strictly smaller and strictly larger asymptotic growth, respectively."
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "For n ≥ 1, 3n² ≤ 3n² + 5n + 2 ≤ 10n², so the expression is Θ(n²). It also belongs to O(n³), but that upper bound is looser. To disprove n² ∈ O(n), assume n² ≤ c·n eventually and divide by n. This would force arbitrarily large n to be ≤ c."
        },
        {
          "kind": "paragraph",
          "text": "Best and worst cases take the minimum and maximum over inputs of size n. Average case requires an input distribution. Expected time may come from random choices inside the algorithm, as in randomized QuickSort. Amortized time bounds the total cost of a sequence divided across its operations without assuming a probability distribution."
        },
        {
          "kind": "heading",
          "text": "Prove linear search with a loop invariant"
        },
        {
          "kind": "paragraph",
          "text": "Invariant before examining a[i]. Every element in a[0..i) differs from the target. Initially i=0 and the interval is empty. If a[i] matches, return i. Otherwise increment i and the examined interval still has no match. If the loop finishes at i=n, every element has been ruled out. The loop terminates because i increases and is bounded by n."
        },
        {
          "kind": "paragraph",
          "text": "A recursive proof follows the same idea at a different scale. For Merge Sort, prove each call returns a sorted permutation of its input. The base case is immediate. Both halves satisfy the claim by induction. Merging picks the smallest remaining head and consumes every element once, so the combined output has the required order and preserves multiplicities."
        },
        {
          "kind": "heading",
          "text": "Benchmark and explain mismatches"
        },
        {
          "kind": "paragraph",
          "text": "Use identical inputs when comparing algorithms. Warm up the JVM, use a fixed seed, generate input outside timing, and keep I/O out. Measure time and logical work such as comparisons or copies. Compare normalized curves T(n)/(n log₂ n) and T(n)/n^1.5 over growing n. On a log–log plot, n log n approaches slope 1 slowly, whereas n^1.5 has slope 1.5. Cache effects and JVM warm-up can distort short runs."
        },
        {
          "kind": "paragraph",
          "text": "Self-check. Insertion Sort takes Θ(n) on an already sorted array and Θ(n²) on a strictly reverse-sorted array. Even so, it can be the faster option on very short arrays."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27638"
    },
    {
      "id": 4,
      "name": "Linear collections & heaps",
      "title": "Arrays linked lists and heaps",
      "group": "Data structures",
      "description": "Arrays, linked lists, heaps and amortized costs.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Match the operation to the structure"
        },
        {
          "kind": "table",
          "rows": [
            [
              "Operation",
              "Dynamic array",
              "Linked list"
            ],
            [
              "get(i)",
              "Θ(1) by index",
              "Θ(1) at a reachable endpoint, Θ(n) worst case"
            ],
            [
              "contains(x)",
              "Θ(1) best, Θ(n) worst",
              "Θ(1) best, Θ(n) worst"
            ],
            [
              "append(x)",
              "Θ(1) amortized, Θ(n) on a resize",
              "Θ(1) with a tail pointer"
            ],
            [
              "insert/remove at front",
              "Θ(n) shifts, with n elements",
              "Θ(1) by a head update"
            ],
            [
              "insert/remove in middle",
              "Θ(n) shifts",
              "Θ(n) to find position by index. Relinking is Θ(1) once required nodes are known."
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "For Java LinkedList, a doubly linked list, indexed traversal can begin at the nearer end. Removing the tail is Θ(1). In a singly linked list, removing the tail generally needs a scan to find its predecessor. Iterate over a linked list directly. A loop that calls get(i) for every i may become Θ(n²)."
        },
        {
          "kind": "paragraph",
          "text": "Array traversal and iterator-based list traversal both take Θ(n). The array keeps elements or references in contiguous slots, improving locality. A linked list follows pointers between nodes, often increasing cache misses and allocation overhead. Primitive int[] also avoids Integer boxing."
        },
        {
          "kind": "heading",
          "text": "Why doubling gives constant amortized append"
        },
        {
          "kind": "paragraph",
          "text": "With initial capacity 2, resizing through capacities 2 → 4 → 8 → 16 copies 2+4+8 = 14 elements by the ninth append, in addition to the nine new writes. In general the copies are a geometric series bounded by O(n) over n appends. An append that triggers a resize still costs Θ(n). The argument assumes append, since insertion in the middle still shifts elements."
        },
        {
          "kind": "paragraph",
          "text": "A stack is LIFO. A queue is FIFO. A deque supports both ends. An array-backed deque typically gives amortized O(1) operations at both ends. Stack or queue semantics describe allowed operations. The backing data structure determines the costs."
        },
        {
          "kind": "heading",
          "text": "Binary min-heap"
        },
        {
          "kind": "paragraph",
          "text": "Heap order requires every parent to be ≤ its children. The complete-tree shape gives height Θ(log n). In zero-based storage the children are 2i+1 and 2i+2, and the parent for i>0 is floor((i−1)/2)."
        },
        {
          "kind": "bullet",
          "text": "peekMin reads the root in Θ(1). insert appends then sifts up. extractMin moves the last item to the root then sifts down through the smaller child. Each sift is O(log n) in the worst case. An already-correct replacement can stop in Θ(1)."
        },
        {
          "kind": "bullet",
          "text": "Bottom-up heap construction costs Θ(n), since most nodes are near leaves. Starting from a heap of n items, n root removals cost Θ(n log n) in the worst case. A special input can be cheaper if comparisons stop early."
        },
        {
          "kind": "bullet",
          "text": "A2 asks you to compare random access, search, front/middle updates and priority processing. Verify extraction order, and distinguish structural repair from the cost of a backing-array resize."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27639"
    },
    {
      "id": 5,
      "name": "Hashing, trees & tries",
      "title": "Hash tables search trees and tries",
      "group": "Data structures",
      "description": "Hash tables, balanced search trees and prefix lookup.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Hash tables and load factor"
        },
        {
          "kind": "paragraph",
          "text": "Let α = number of stored keys / number of buckets. With well-distributed hashing and separate chaining, expected lookup examines O(1+α) work. A bucket containing all keys gives Θ(n) worst-case lookup for a basic chained implementation. With bounded load and geometric resizing, insertion is commonly expected amortized O(1). Resizing allocates a new table and reinserts entries because the bucket mapping depends on table size."
        },
        {
          "kind": "paragraph",
          "text": "Chaining stores a collection per bucket and can support α>1. Open addressing keeps keys inside the table, so α must stay below 1. Linear probing clusters adjacent runs. A deletion normally leaves a tombstone so a lookup can pass the old slot. A double-hash step should be compatible with the table size so probing can reach every slot."
        },
        {
          "kind": "paragraph",
          "text": "Universal hashing picks a function from a family with a controlled collision probability per distinct pair. With h(x)=((3x+2) mod 11) mod 4, the practice keys 5, 8, 9 map to 2, 0, 3. No collisions occur for those three keys. Collisions somewhere in a finite table are expected with enough keys. The birthday effect explains how a first collision can occur at around the square root of the bucket count."
        },
        {
          "kind": "heading",
          "text": "BSTs and balancing"
        },
        {
          "kind": "paragraph",
          "text": "A BST orders keys around each node. Search, insert and delete cost O(h) for height h. A sorted insertion order can create a chain in a plain BST. Deletion handles a leaf, a node with one child, or a node with two children by replacing it with its successor or predecessor and deleting that replacement from its original position."
        },
        {
          "kind": "paragraph",
          "text": "A red-black tree keeps the root and null leaves black, forbids adjacent reds, and requires equal black height on paths to null leaves. Recoloring and rotations restore these conditions after updates. Rotations preserve the in-order traversal and take O(1). Height is O(log n), giving O(log n) search, insert, and delete. B-trees use high branching for fewer page accesses. Treaps combine BST key order with heap priority order and use randomized priorities for expected balance."
        },
        {
          "kind": "heading",
          "text": "Trie operations"
        },
        {
          "kind": "paragraph",
          "text": "Follow one edge per character. With O(1) transition access, search for a key of length L costs O(L), even when the dictionary contains many keys. A terminal marker distinguishes an exact key from a path for an existing prefix. With {cat, car, cart, dog, do}, mark cat, car, cart, dog and do as terminals, including internal nodes car and do."
        },
        {
          "kind": "paragraph",
          "text": "Self-check. For keys [5, 2, 8, 1, 3, 7, 9], the plain BST is perfect with height 2 edges. An all-black coloring is valid because every root-to-null path has the same black count."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27640"
    },
    {
      "id": 6,
      "name": "Union–Find & MSTs",
      "title": "Union Find and spanning trees",
      "group": "Graphs",
      "description": "Disjoint sets, Kruskal and Prim.",
      "blocks": [
        {
          "kind": "heading",
          "text": "What a spanning tree minimizes"
        },
        {
          "kind": "paragraph",
          "text": "A spanning tree of a connected undirected graph connects all V vertices, has V−1 edges, and has no cycle. Its total edge weight is the sum of the chosen edges. An MST minimizes that sum. If the graph is disconnected, no single spanning tree exists. Kruskal can return a minimum spanning forest. Negative edge weights are allowed for MST algorithms."
        },
        {
          "kind": "paragraph",
          "text": "For a cut that respects the edges chosen so far, any lightest crossing edge is safe. If an MST consistent with existing choices omits it, adding it creates a cycle with another edge crossing the cut. Swapping out that edge keeps the graph a spanning tree with no increase in weight. This is the exchange argument behind Kruskal and Prim."
        },
        {
          "kind": "heading",
          "text": "How the algorithms choose edges"
        },
        {
          "kind": "table",
          "rows": [
            [
              "Method",
              "Rule",
              "Time bound"
            ],
            [
              "Kruskal",
              "Sort all edges by weight. Add an edge only if union of its endpoints joins two different sets.",
              "O(E log E) sorting plus near-linear DSU work, with O(V) setup."
            ],
            [
              "Prim with indexed heap",
              "Start from any vertex. Use the smallest key among outside vertices and update each neighbor’s best edge into the tree.",
              "O((V+E) log V), which becomes O(E log V) on connected adjacency lists."
            ],
            [
              "Prim with lazy edge heap",
              "Push edges going to unvisited vertices and discard entries leading to a visited vertex when popped.",
              "O(V + E log(E+1)), with O(V+E) auxiliary space. On connected simple graphs the usual answer is O(E log V)."
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "DSU starts with each vertex in its own set. find gives a representative. union uses representatives, joins smaller trees beneath larger ones, and returns false if already connected. Path compression shortcuts a traversed path to the root. With both heuristics, the amortized cost per operation is O(α(V)), where α is inverse Ackermann."
        },
        {
          "kind": "heading",
          "text": "Trace Prim using the instructor’s sample"
        },
        {
          "kind": "paragraph",
          "text": "Edges are 1–2(2), 1–3(3), 2–3(1), 2–4(4), and 3–4(5). Start with tree {1}. Choose 1–2 because 2 < 3. With {1,2}, choose 2–3 at cost 1. Then only vertex 4 remains outside, and 2–4 costs less than 3–4. The sequence is 1–2, 2–3, 2–4, total weight 7."
        },
        {
          "kind": "paragraph",
          "text": "Practice variation. On A–B(3), A–C(1), B–C(2), B–D(4), C–D(5), Kruskal keeps A–C, B–C and B–D for cost 7. Prim from A makes the same choices in this case. Equal-weight alternatives can yield different MST edge sets with equal total weight."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27641"
    },
    {
      "id": 7,
      "name": "SCCs & topological order",
      "title": "Components orders and paths",
      "group": "Graphs",
      "description": "Kosaraju, Kahn and shortest paths in DAGs.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Directed connectivity"
        },
        {
          "kind": "paragraph",
          "text": "A strongly connected component is a maximal set whose vertices are mutually reachable along directed paths. Weak connectivity concerns the graph obtained by ignoring directions. For A→B→C→A, C→D and D↔E, the SCCs are {A,B,C} and {D,E}. Contracting them leaves one directed edge. Any cycle among distinct components would make them mutually reachable and therefore part of one SCC. The condensation graph is always a DAG."
        },
        {
          "kind": "paragraph",
          "text": "A DFS finish time records when a vertex has processed all outgoing edges and all descendants in its DFS tree have returned. Append the vertex at that moment to collect postorder. In Kosaraju’s algorithm, run DFS on the original graph, reverse the edges, and process vertices in descending original finish order on the transpose. Each new DFS in the second pass labels one SCC. Time is Θ(V+E), including transposition."
        },
        {
          "kind": "paragraph",
          "text": "Tarjan finds SCCs in one DFS. Store each vertex’s discovery index and low link, plus a stack of discovered vertices still awaiting assignment. Use a back edge to update a low link only if its endpoint is still on the SCC stack. When low[u] equals index[u], pop through u to form one SCC. Time is Θ(V+E)."
        },
        {
          "kind": "heading",
          "text": "Topological order and cycle detection"
        },
        {
          "kind": "paragraph",
          "text": "Kahn’s algorithm computes indegrees, queues all zero-indegree vertices, and repeatedly emits one and removes its outgoing edges. Enqueue a neighbor when its indegree reaches zero. If fewer than V vertices are emitted, a directed cycle exists. Reverse DFS finish order also gives a topological order for a DAG. To handle arbitrary input with DFS, detect a back edge to an active vertex before accepting the order. Both algorithms are Θ(V+E)."
        },
        {
          "kind": "paragraph",
          "text": "For shirt→tie→jacket, trousers→belt→jacket, and trousers→shoes, socks→shoes, one order is [shirt, trousers, socks, tie, belt, shoes, jacket]. Multiple orders are possible because independent vertices can be emitted in different orders."
        },
        {
          "kind": "heading",
          "text": "Shortest paths on a DAG"
        },
        {
          "kind": "paragraph",
          "text": "Set d[source]=0 and all other distances to infinity. Process vertices in topological order and relax each outgoing edge once: if d[u] is finite, set d[v] to min(d[v], d[u]+w). Store the predecessor on improvement to reconstruct paths. Time is Θ(V+E), and negative edges are allowed since no directed cycle can revisit an earlier vertex."
        },
        {
          "kind": "paragraph",
          "text": "For S→A(1), S→B(4), A→B(2), A→C(6), B→C(3), distances in order are [0,1,3,6]. To find longest DAG paths, start unreachable vertices at −∞ and use max. A3 also uses Dijkstra for general graphs with nonnegative edges. A negative edge can lower the distance to an already-finalized vertex. MST weight minimizes total construction cost. Shortest paths minimize individual route lengths."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27642"
    },
    {
      "id": 8,
      "name": "Dynamic programming",
      "title": "Dynamic programming patterns",
      "group": "Patterns",
      "description": "LIS, edit distance, interval DP and tree DP.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Define the state before writing the loops"
        },
        {
          "kind": "paragraph",
          "text": "DP reuses overlapping subproblems. The recurrence must be able to build an optimal answer from smaller states. Define the state in a sentence, write base cases, list transitions, schedule dependencies, and identify the answer state. Time is the number of computed states times transition work per state. Memoization computes states on demand and keeps recursion frames. Tabulation iterates in dependency order."
        },
        {
          "kind": "table",
          "rows": [
            [
              "Problem",
              "State and transition"
            ],
            [
              "LIS",
              "dp[i] = 1 + max(dp[j]) over j<i with a[j]<a[i], default 1. Answer is max(dp). Θ(n²) time and Θ(n) space."
            ],
            [
              "LCS",
              "Prefix state L[i][j]. Use 1+L[i−1][j−1] when the last characters match and max(L[i−1][j], L[i][j−1]) otherwise. Empty prefixes give 0. Θ(nm) time and table space for positive lengths."
            ],
            [
              "Edit distance",
              "Prefix state D[i][j]. Base D[i][0]=i, D[0][j]=j. Min of delete, insert and match/substitute from neighboring cells. See Java reference."
            ],
            [
              "0/1 knapsack",
              "State is best value for first i items and capacity c. Compare skipping with taking if weight≤c. O(nW) time. With one row, iterate capacity downward to use each item once."
            ]
          ]
        },
        {
          "kind": "heading",
          "text": "LIS in O(n log n)"
        },
        {
          "kind": "paragraph",
          "text": "tails[k] is the smallest possible final value for a strictly increasing subsequence of length k+1 in the prefix processed so far. For each x, binary-search the first tail ≥ x. Replace it, or append when all tails are smaller. For a nondecreasing subsequence, use the first tail > x. The length of tails is the answer. Track predecessor indices to reconstruct an actual subsequence."
        },
        {
          "kind": "paragraph",
          "text": "Trace [3,1,4,1,5,9,2,6]. The final tails array is [1,2,5,6], length 4. The values in tails may have been taken from incompatible indices. One valid subsequence is [1,4,5,6]."
        },
        {
          "kind": "heading",
          "text": "Interval and tree patterns"
        },
        {
          "kind": "paragraph",
          "text": "Matrix chain multiplication splits interval [i,j] at k and minimizes left cost + right cost + p[i−1]·p[k]·p[j]. Single matrices cost zero. Fill shorter intervals first. With n matrices this costs Θ(n³) time and Θ(n²) space. Dimensions 10,30,5,60 give (AB)C = 4500 operations versus A(BC) = 27000."
        },
        {
          "kind": "paragraph",
          "text": "For a maximum-weight independent set on a tree, take[u]=w[u]+Σ skip[child] and skip[u]=Σ max(take[child],skip[child]). Evaluate in postorder. Root 10 with children 3 and 8, and 3 with children 6 and 5, gives take[root]=21 and skip[root]=19. For unweighted tree diameter, combine the two largest child branch heights at each vertex and keep the maximum path length."
        },
        {
          "kind": "paragraph",
          "text": "Self-check. LCS(AGGTAB,GXTXAYB) is GTAB, length 4. Edit distance kitten → sitting is 3: substitute k→s and e→i, then insert g. LCS avoids charging for skips. Edit distance charges for each edit."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27643"
    },
    {
      "id": 9,
      "name": "KMP & rolling hash",
      "title": "KMP and rolling hash",
      "group": "Strings",
      "description": "Pattern preprocessing and constant-time window updates.",
      "blocks": [
        {
          "kind": "heading",
          "text": "KMP remembers a prefix"
        },
        {
          "kind": "paragraph",
          "text": "For p[0..i], lps[i] is the length of its longest proper prefix that is also a suffix. On mismatch after len matched characters, try lps[len−1]. Keep falling back until the next character extends a border or len=0. A proper prefix is shorter than the full prefix under consideration."
        },
        {
          "kind": "paragraph",
          "text": "For ABABAC, LPS = [0,0,1,2,3,0]. At C after ABABA, the previous border length 3 falls to 1 and then to 0. No border can extend with C. In the search, after consuming a full match, reset the matched length to lps[m−1]. Pattern ABA in ABABABA matches at 0, 2, 4 because overlapping matches reuse the border A."
        },
        {
          "kind": "paragraph",
          "text": "Preprocessing takes Θ(m) time and space. Search takes O(n) time because each fallback reduces the current matched length and previous successful advances pay for those decreases. Naive matching can compare Θ(nm) characters, for example on a long all-a text and a shorter pattern ending in b."
        },
        {
          "kind": "heading",
          "text": "Polynomial hash and updates"
        },
        {
          "kind": "paragraph",
          "text": "For x₀ … xₘ₋₁, H = (x₀p^(m−1) + x₁p^(m−2) + … + xₘ₋₁) mod M. Prefix recurrence H[i+1]=(H[i]·p+code(s[i])) mod M. Substring hash on [l,r) is (H[r]−H[l]·p^(r−l)) mod M, normalized into [0,M). Build the powers and prefix hashes in Θ(n), then each substring query takes Θ(1)."
        },
        {
          "kind": "paragraph",
          "text": "For a fixed window, remove out·p^(m−1), multiply by p, and add in, reducing modulo M. The next hash is Θ(1) once the old hash and the power are known. For 592→926 in base 10, (592−5·100)·10+6=926."
        },
        {
          "kind": "paragraph",
          "text": "Rabin–Karp compares a window fingerprint with the pattern fingerprint and verifies matching characters when fingerprints coincide. With q windows verified and positive pattern length m, time is O(n+m+qm), and the worst case can be Θ(nm). Hash equality alone admits collisions. With p=1 only the sum matters, so anagrams such as ab and ba always collide under this polynomial convention. Two moduli reduce accidental collision risk. Direct comparison resolves equality exactly."
        },
        {
          "kind": "heading",
          "text": "Assignment 4 recall"
        },
        {
          "kind": "paragraph",
          "text": "Use the same text and pattern for naive search, KMP, and Rabin–Karp. Test absent and present patterns, overlapping occurrences, an empty pattern, and a pattern longer than the text. Define the empty-pattern convention consistently, such as a match at every boundary 0..n. Use long for modular products in Java and ensure the selected modulus keeps these products in range."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27644"
    },
    {
      "id": 10,
      "name": "Suffix arrays & LCP",
      "title": "Suffix arrays LCP and multiple patterns",
      "group": "Strings",
      "description": "Prefix doubling, Kasai and Aho–Corasick.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Suffix array and prefix doubling"
        },
        {
          "kind": "paragraph",
          "text": "SA stores starting indices of suffixes in lexicographic order. All suffixes beginning with a pattern occupy one contiguous interval. Binary search can locate its boundaries in O(m log n) character work using comparisons that treat a pattern prefix match appropriately. Listing the positions adds O(number of matches)."
        },
        {
          "kind": "paragraph",
          "text": "Initialize ranks using single characters. In a round of block length k, sort by (rank[i], rank[i+k]), using −1 for a missing block in the suffix-pair formulation. Equal pairs receive equal new ranks. Double k until all ranks are unique or every suffix is covered. General comparison sorting yields O(n log² n) across rounds. Counting/radix sorting integer ranks yields O(n log n) after suitable initial ranking."
        },
        {
          "kind": "heading",
          "text": "LCP and Kasai"
        },
        {
          "kind": "paragraph",
          "text": "This guide uses lcp[0]=0 and lcp[r]=LCP(suffix at SA[r], suffix at SA[r−1]) for r>0. Build the inverse rank array. Visit suffixes by original starting index i. Compare with the lexicographic predecessor from the current shared length k. After advancing i, reuse max(k−1,0). Reset k when the suffix has no predecessor. k only increases O(n) times overall, yielding Θ(n) time and Θ(n) space including the arrays. SA construction is separate."
        },
        {
          "kind": "table",
          "rows": [
            [
              "String",
              "SA",
              "LCP"
            ],
            [
              "banana$",
              "[6,5,3,1,0,4,2]",
              "[0,0,1,3,0,0,2]"
            ],
            [
              "abaab$",
              "[5,2,3,0,4,1]",
              "[0,0,1,2,0,1]"
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "Longest repeated substring length is max(lcp). For the original string of length n, distinct nonempty substrings = n(n+1)/2 − Σ lcp over its suffixes. With aaa this gives 6−(0+1+2)=3: a, aa, aaa. For two strings, concatenate with separators outside their alphabets and maximize adjacent LCP across different source strings."
        },
        {
          "kind": "heading",
          "text": "Aho–Corasick automaton"
        },
        {
          "kind": "paragraph",
          "text": "Insert the patterns in a trie. A failure link points to the longest proper suffix of the current trie string that is also a trie prefix. Construct links breadth-first so shorter states are ready. At each text character, take a valid edge or follow failures until you can advance or reach the root. Use output links to report terminal suffix patterns as well as any pattern ending at the current state."
        },
        {
          "kind": "paragraph",
          "text": "With a full transition table, for S trie states and alphabet size σ, construction after inserting the patterns takes O(Sσ) time and space. Searching with efficient output links takes O(n+z) for n text characters and z reported occurrences. With sparse edges and constant-time lookups, the search bound follows by charging failure steps to past depth increases. Avoid copying output lists indiscriminately."
        },
        {
          "kind": "paragraph",
          "text": "Practice trace. For patterns {a, ab, bab, bc} and text xbabcx, the matches are bab at 1, a and ab at 2, and bc at 3. Failure from bab to ab explains why both length-three and length-two patterns can be reported at the same ending position."
        }
      ],
      "source": "https://lms.astanait.edu.kz/course/section.php?id=27645"
    }
  ],
  "implementations": [
    {
      "id": 1,
      "name": "Merge Sort",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Sort [lo,mid) and [mid,hi), then merge into one reusable buffer. Before each write, tmp[lo..k) contains the smallest consumed elements in order. On ties take the left value to preserve stability. Time Θ(n log n), buffer Θ(n), recursion depth Θ(log n)."
        },
        {
          "kind": "code",
          "text": "static void mergeSort(int[] a) {\n    sort(a, new int[a.length], 0, a.length);\n}\n\nstatic void sort(int[] a, int[] tmp, int lo, int hi) {\n    if (hi - lo <= 1) return;\n    int mid = lo + (hi - lo) / 2;\n    sort(a, tmp, lo, mid);\n    sort(a, tmp, mid, hi);\n    int i = lo, j = mid;\n    for (int k = lo; k < hi; k++) {\n        if (i < mid && (j == hi || a[i] <= a[j])) {\n            tmp[k] = a[i++];\n        } else {\n            tmp[k] = a[j++];\n        }\n    }\n    System.arraycopy(tmp, lo, a, lo, hi - lo);\n}"
        }
      ]
    },
    {
      "id": 2,
      "name": "Disjoint Set Union",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Only roots are linked. size is read at the roots. find compresses its path and union keeps the larger root. The boolean result says whether two distinct sets were joined. Initialization Θ(n), storage Θ(n), operations amortized O(α(n))."
        },
        {
          "kind": "code",
          "text": "static class DSU {\n    final int[] parent, size;\n\n    DSU(int n) {\n        parent = new int[n];\n        size = new int[n];\n        for (int i = 0; i < n; i++) {\n            parent[i] = i;\n            size[i] = 1;\n        }\n    }\n\n    int find(int x) {\n        if (parent[x] != x) parent[x] = find(parent[x]);\n        return parent[x];\n    }\n\n    boolean union(int a, int b) {\n        int ra = find(a), rb = find(b);\n        if (ra == rb) return false;\n        if (size[ra] < size[rb]) {\n            int old = ra;\n            ra = rb;\n            rb = old;\n        }\n        parent[rb] = ra;\n        size[ra] += size[rb];\n        return true;\n    }\n}"
        }
      ]
    },
    {
      "id": 3,
      "name": "Kosaraju",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "First-pass DFS records exit order. Reverse the edges and label each new component from that list backwards. The returned component IDs are equality labels. Time and auxiliary space Θ(V+E), including the transpose. Deep DFS can use an explicit stack."
        },
        {
          "kind": "code",
          "text": "static int[] kosaraju(List<List<Integer>> g) {\n    int n = g.size();\n    List<List<Integer>> rev = new ArrayList<>();\n    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());\n    for (int u = 0; u < n; u++)\n        for (int v : g.get(u)) rev.get(v).add(u);\n\n    boolean[] seen = new boolean[n];\n    List<Integer> finish = new ArrayList<>();\n    for (int u = 0; u < n; u++)\n        if (!seen[u]) finishDfs(g, u, seen, finish);\n\n    int[] component = new int[n];\n    Arrays.fill(component, -1);\n    int id = 0;\n    for (int i = n - 1; i >= 0; i--) {\n        int u = finish.get(i);\n        if (component[u] == -1) labelDfs(rev, u, id++, component);\n    }\n    return component;\n}\n\nstatic void finishDfs(List<List<Integer>> g, int u,\n                      boolean[] seen, List<Integer> finish) {\n    seen[u] = true;\n    for (int v : g.get(u))\n        if (!seen[v]) finishDfs(g, v, seen, finish);\n    finish.add(u);\n}\n\nstatic void labelDfs(List<List<Integer>> g, int u, int id, int[] comp) {\n    comp[u] = id;\n    for (int v : g.get(u))\n        if (comp[v] == -1) labelDfs(g, v, id, comp);\n}"
        }
      ]
    },
    {
      "id": 4,
      "name": "Prim with a lazy edge heap",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Store both directions of each undirected edge in g. The initial zero-weight entry starts the tree. Skip stale edges and reject disconnected input. On connected simple graphs, time O(E log V). The lazy heap can hold O(E) entries. Keep the source vertex in each queue entry if the question asks for the edge list."
        },
        {
          "kind": "code",
          "text": "record Edge(int to, int weight) {}\n\nstatic long primWeight(List<List<Edge>> g) {\n    int n = g.size();\n    if (n == 0) return 0;\n    var heap = new PriorityQueue<Edge>(\n            Comparator.comparingInt(Edge::weight));\n    boolean[] used = new boolean[n];\n    heap.add(new Edge(0, 0));\n    long total = 0;\n    int count = 0;\n\n    while (!heap.isEmpty() && count < n) {\n        Edge e = heap.remove();\n        int v = e.to();\n        if (used[v]) continue;\n        used[v] = true;\n        count++;\n        total += e.weight();\n        for (Edge next : g.get(v))\n            if (!used[next.to()]) heap.add(next);\n    }\n    if (count != n) throw new IllegalArgumentException(\"Disconnected\");\n    return total;\n}"
        }
      ]
    },
    {
      "id": 5,
      "name": "Edit distance",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "D[i][j] compares prefixes of lengths i and j. Deletion comes from above, insertion from the left, and substitution or match from the diagonal. The initialization handles empty prefixes. Table time and space Θ((n+1)(m+1)). Two rows reduce storage to O(min(n,m)+1) when only the distance is needed."
        },
        {
          "kind": "code",
          "text": "static int editDistance(String a, String b) {\n    int n = a.length(), m = b.length();\n    int[][] dp = new int[n + 1][m + 1];\n    for (int i = 0; i <= n; i++) dp[i][0] = i;\n    for (int j = 0; j <= m; j++) dp[0][j] = j;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            int cost = a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1;\n            int replace = dp[i - 1][j - 1] + cost;\n            int delete = dp[i - 1][j] + 1;\n            int insert = dp[i][j - 1] + 1;\n            dp[i][j] = Math.min(replace, Math.min(delete, insert));\n        }\n    }\n    return dp[n][m];\n}"
        }
      ]
    },
    {
      "id": 6,
      "name": "KMP prefix table",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "len is the best candidate border length carried from the previous position. Follow shorter borders on mismatch. pi[len−1] is strictly smaller than len. The loop advances or decreases the matched length, so preprocessing is Θ(m) time and Θ(m) space."
        },
        {
          "kind": "code",
          "text": "static int[] lps(String p) {\n    int[] pi = new int[p.length()];\n    int len = 0;\n    for (int i = 1; i < p.length(); i++) {\n        while (len > 0 && p.charAt(i) != p.charAt(len)) {\n            len = pi[len - 1];\n        }\n        if (p.charAt(i) == p.charAt(len)) len++;\n        pi[i] = len;\n    }\n    return pi;\n}"
        }
      ]
    },
    {
      "id": 7,
      "name": "Polynomial rolling hash",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Precompute prefix values and powers in Θ(n) time and space. range(l,r) uses an exclusive right endpoint. slide assumes width ≥ 1 and a previous hash computed with the same base and modulus. Both queries take Θ(1). If implementing Rabin–Karp, verify equal hashes against the actual text."
        },
        {
          "kind": "code",
          "text": "static class RollingHash {\n    static final long BASE = 911_382_323, MOD = 1_000_000_007;\n    final long[] pref, power;\n\n    RollingHash(String s) {\n        pref = new long[s.length() + 1];\n        power = new long[s.length() + 1];\n        power[0] = 1;\n        for (int i = 0; i < s.length(); i++) {\n            pref[i + 1] = (pref[i] * BASE + code(s.charAt(i))) % MOD;\n            power[i + 1] = power[i] * BASE % MOD;\n        }\n    }\n\n    static long code(char c) { return c + 1L; }\n\n    long range(int l, int r) {\n        long removed = pref[l] * power[r - l] % MOD;\n        return (pref[r] - removed + MOD) % MOD;\n    }\n\n    long slide(long hash, char out, char in, int width) {\n        long removed = code(out) * power[width - 1] % MOD;\n        long rest = (hash - removed + MOD) % MOD;\n        return (rest * BASE + code(in)) % MOD;\n    }\n}"
        }
      ]
    },
    {
      "id": 8,
      "name": "Kasai’s LCP array",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Accept the suffix array as an input containing the n starts in sorted order. rank[sa[r]]=r maps a text index to its lexicographic position. The first ranked suffix has no predecessor, so clear k. The scan is Θ(n) time and Θ(n) storage including its output."
        },
        {
          "kind": "code",
          "text": "static int[] kasai(String s, int[] sa) {\n    int n = s.length();\n    int[] rank = new int[n], lcp = new int[n];\n    for (int r = 0; r < n; r++) rank[sa[r]] = r;\n    int k = 0;\n    for (int i = 0; i < n; i++) {\n        int r = rank[i];\n        if (r == 0) {\n            k = 0;\n            continue;\n        }\n        int j = sa[r - 1];\n        while (i + k < n && j + k < n\n                && s.charAt(i + k) == s.charAt(j + k)) k++;\n        lcp[r] = k;\n        if (k > 0) k--;\n    }\n    return lcp;\n}"
        }
      ]
    }
  ],
  "samples": [
    {
      "id": "s1",
      "num": 1,
      "week": 9,
      "text": "When using a fixed-length rolling window, the current window’s hash is already known. What is the time complexity of computing the hash of the next window?",
      "choices": [
        "O(n)",
        "O(1)",
        "O(m)",
        "O(log n)"
      ],
      "answer": 1,
      "why": "With the needed power precomputed, remove the outgoing character’s contribution, multiply by the base, and add the incoming character. The number of operations stays constant as the window grows.",
      "source": "sample"
    },
    {
      "id": "s2",
      "num": 2,
      "week": 5,
      "text": "For a standard trie, what is the time complexity of searching for a key of length L, assuming each transition can be accessed in O(1) time?",
      "choices": [
        "O(n), where n is the number of stored keys",
        "O(L)",
        "O(log n)",
        "O(nL)"
      ],
      "answer": 1,
      "why": "A successful search follows one edge per character and checks the terminal marker at the end. The number of stored keys does not enter this bound.",
      "source": "sample"
    },
    {
      "id": "s3",
      "num": 3,
      "week": 3,
      "text": "Which asymptotic notation represents an asymptotic upper bound on a function?",
      "choices": [
        "Theta",
        "O",
        "Omega",
        "Small omega"
      ],
      "answer": 1,
      "why": "Big O bounds growth from above up to a constant factor for sufficiently large inputs. Big Ω is a lower bound, and Θ gives both bounds.",
      "source": "sample"
    },
    {
      "id": "s4",
      "num": 4,
      "week": 7,
      "text": "After every strongly connected component is contracted into a single vertex, the resulting condensation graph is always:",
      "choices": [
        "Strongly connected",
        "Undirected",
        "Cyclic",
        "A DAG"
      ],
      "answer": 3,
      "why": "A directed cycle across several components would make those components mutually reachable. They would then form a single SCC, contradicting their separation.",
      "source": "sample"
    },
    {
      "id": "s5",
      "num": 5,
      "week": 10,
      "text": "The Aho-Corasick algorithm is primarily used for which type of problem?",
      "choices": [
        "Finding the longest repeated substring in a text",
        "Matching a single pattern against a text",
        "Matching many patterns simultaneously against a text",
        "Sorting substrings of a text"
      ],
      "answer": 2,
      "why": "Build one automaton from all the patterns. Trie transitions and failure links let the algorithm scan the text once and report every match, including overlaps.",
      "source": "sample"
    },
    {
      "id": "s6",
      "num": 6,
      "week": 10,
      "text": "In prefix-doubling suffix-array construction, each iteration sorts suffixes using:",
      "choices": [
        "The complete suffix strings",
        "Pairs of ranks representing two consecutive blocks",
        "Only one character",
        "Randomized QuickSort"
      ],
      "answer": 1,
      "why": "In a round with block length k, the pair (rank[i], rank[i+k]) represents up to the first 2k characters of the suffix starting at i. Sorting the pairs gives ranks for the next round.",
      "source": "sample"
    },
    {
      "id": "s7",
      "num": 7,
      "week": 8,
      "text": "In the standard O(n log n) algorithm for the Longest Increasing Subsequence, binary search is used to:",
      "choices": [
        "Find the position where each value should be placed in the tails array",
        "Skip elements that cannot belong to any increasing subsequence",
        "Hash the indices of selected elements",
        "Calculate prefix sums"
      ],
      "answer": 0,
      "why": "For a strictly increasing subsequence, find the first tail ≥ x and replace it with x. If all tails are smaller than x, append it. Keeping the smallest tail for each length leaves more room for future values.",
      "source": "sample"
    },
    {
      "id": "s8",
      "num": 8,
      "week": 9,
      "text": "What is a typical disadvantage of choosing a very small base p, particularly p = 1, in polynomial rolling hashing?",
      "choices": [
        "It increases the asymptotic running time",
        "It makes precomputation of powers impossible",
        "It substantially increases the probability of collisions",
        "It requires the use of multiple moduli"
      ],
      "answer": 2,
      "why": "With p = 1, all powers of p are 1. The hash becomes the sum of the character codes modulo M, so different permutations such as ab and ba have the same hash.",
      "source": "sample"
    },
    {
      "id": "s9",
      "num": 9,
      "week": 5,
      "text": "In a dynamically resized hash table, what typically happens when the load factor exceeds its configured upper threshold?",
      "choices": [
        "The table is resized and its elements are rehashed",
        "Collisions are ignored",
        "The table permanently stops accepting insertions",
        "All hash values become unique"
      ],
      "answer": 0,
      "why": "A larger bucket count lowers the load factor. Each entry is placed according to the new bucket mapping, which typically depends on the table capacity.",
      "source": "sample"
    },
    {
      "id": "s10",
      "num": 10,
      "week": 4,
      "text": "Starting with a binary heap containing n elements, what is the total time complexity of removing all elements one by one using the standard root-removal operation?",
      "choices": [
        "Theta(n)",
        "Theta(log n)",
        "Theta(n log n)",
        "Theta(n^2)"
      ],
      "answer": 2,
      "why": "This is the standard worst-case bound. Summing O(log k) across shrinking heap sizes gives O(n log n). A matching worst case exists, since linear-time heap construction followed by draining the heap sorts arbitrary inputs by comparisons.",
      "source": "sample"
    },
    {
      "id": "s11",
      "num": 11,
      "week": 5,
      "text": "Assuming a well-distributed hash function and separate chaining, expected lookup time is commonly expressed as:",
      "choices": [
        "O(1 + alpha), where alpha is the load factor",
        "O(log n)",
        "O(n log n)",
        "O(n^2)"
      ],
      "answer": 0,
      "why": "The constant term covers finding the bucket. Expected chain work is proportional to α, the number of stored keys divided by the number of buckets.",
      "source": "sample"
    },
    {
      "id": "s12",
      "num": 12,
      "week": 4,
      "text": "Why is sequential traversal of a LinkedList commonly slower than traversal of an ArrayList?",
      "choices": [
        "A linked list requires pointer chasing and generally has poorer cache locality",
        "A linked list performs binary search for every next element",
        "A linked list recursively visits its elements",
        "A linked list sorts its elements during traversal"
      ],
      "answer": 0,
      "why": "Both sequential traversals are Θ(n). ArrayList keeps its reference slots contiguous, whereas LinkedList follows references between nodes that may be scattered in memory.",
      "source": "sample"
    },
    {
      "id": "s13",
      "num": 13,
      "week": 2,
      "text": "Solve the recurrence T(n) = T(n - 1) + Theta(1), with T(1) = Theta(1).",
      "choices": [
        "Theta(log n)",
        "Theta(n)",
        "Theta(n log n)",
        "Theta(n^2)"
      ],
      "answer": 1,
      "why": "Expanding the recurrence takes n−1 steps before reaching T(1). Every step contributes constant work, giving linear total time.",
      "source": "sample"
    },
    {
      "id": "s14",
      "num": 14,
      "week": 4,
      "text": "When a dynamic array uses geometric resizing, such as doubling its capacity when full, what is the amortized cost of an insertion?",
      "choices": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      "answer": 0,
      "why": "The question assumes appending. Over n appends, resizing copies a geometric series of capacities for O(n) total work. An individual resize or an indexed insertion that shifts elements can still cost Θ(n).",
      "source": "sample"
    },
    {
      "id": "s15",
      "num": 15,
      "week": 2,
      "text": "What is the recursion depth of a balanced divide-and-conquer algorithm such as Merge Sort?",
      "choices": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "answer": 2,
      "why": "Along one path from the root to a base case, each call roughly halves the input. After about log₂ n calls, the subproblem size reaches one.",
      "source": "sample"
    },
    {
      "id": "s16",
      "num": 16,
      "week": 2,
      "text": "What is the asymptotic solution of the recurrence T(n) = 2T(n/2) + (n log n)^2?",
      "choices": [
        "Theta(n^2)",
        "Theta(n^2 log^2 n)",
        "Theta(n^2 log^3 n)",
        "Theta(n^3)"
      ],
      "answer": 1,
      "why": "The root alone costs n² log² n. At depth i, all 2^i subproblems together cost at most n² log² n / 2^i. Summing this geometric upper bound gives the same order as the root.",
      "source": "sample"
    },
    {
      "id": "s17",
      "num": 17,
      "week": 7,
      "text": "Which algorithm can produce a topological ordering of a DAG?",
      "choices": [
        "Kosaraju’s algorithm",
        "Bellman-Ford algorithm",
        "Kahn’s algorithm",
        "Dijkstra’s algorithm"
      ],
      "answer": 2,
      "why": "Repeatedly output a vertex with zero remaining indegree, then remove its outgoing edges. Each vertex is emitted only after its predecessors.",
      "source": "sample"
    },
    {
      "id": "s18",
      "num": 18,
      "week": 6,
      "text": "Consider the connected undirected weighted graph with edges 1-2(2), 1-3(3), 2-3(1), 2-4(4), and 3-4(5). If Prim’s algorithm starts at vertex 1, in what order are the MST edges selected?",
      "choices": [
        "(1-2), (2-3), (3-4)",
        "(1-2), (2-3), (2-4)",
        "(1-2), (1-3), (2-4)",
        "(1-3), (3-4), (2-4)"
      ],
      "answer": 1,
      "why": "From {1}, select 1-2 at cost 2. From {1,2}, select 2-3 at cost 1. To connect vertex 4, choose 2-4 at cost 4 over 3-4 at cost 5. The MST costs 7 in total.",
      "source": "sample"
    },
    {
      "id": "s19",
      "num": 19,
      "week": 7,
      "text": "In a standard depth-first search, what does the finish time of a vertex represent?",
      "choices": [
        "The time when the vertex is first discovered",
        "The time when the vertex and all its DFS descendants have been completely processed",
        "The time when the vertex is inserted into the DFS stack",
        "The time when all ancestors of the vertex have been processed"
      ],
      "answer": 1,
      "why": "Record the finish time as DFS exits the vertex, after examining its outgoing edges and returning from all child calls.",
      "source": "sample"
    },
    {
      "id": "s20",
      "num": 20,
      "week": 6,
      "text": "For a connected graph represented using adjacency lists, what is the running time of Prim’s algorithm when implemented with a binary heap?",
      "choices": [
        "O(V^2)",
        "O(E log V)",
        "O(V log E)",
        "O(E + V)"
      ],
      "answer": 1,
      "why": "With an indexed binary heap, there are at most V extractions and O(E) key updates, each costing O(log V). For a connected graph, V ≤ E+1, giving O(E log V).",
      "source": "sample"
    }
  ],
  "practice": [
    {
      "id": "p1",
      "week": 1,
      "text": "When 23 × 76 is split into digits, what is the Karatsuba middle term?",
      "choices": [
        "33",
        "65",
        "14",
        "18"
      ],
      "answer": 0,
      "why": "Compute (2+3)(7+6) − 2·7 − 3·6 = 65 − 14 − 18 = 33.",
      "source": "practice"
    },
    {
      "id": "p2",
      "week": 1,
      "text": "Which step directly solves the smallest allowed instances?",
      "choices": [
        "The base case",
        "The combine step",
        "Random pivot selection",
        "The asymptotic proof"
      ],
      "answer": 0,
      "why": "A recursive algorithm must specify a correct direct solution for inputs where recursion stops.",
      "source": "practice"
    },
    {
      "id": "p3",
      "week": 1,
      "text": "What recurrence describes Karatsuba when non-recursive work is linear?",
      "choices": [
        "T(n)=3T(n/2)+Θ(n)",
        "T(n)=4T(n/2)+Θ(n)",
        "T(n)=T(n−1)+Θ(n)",
        "T(n)=2T(n/2)+Θ(n²)"
      ],
      "answer": 0,
      "why": "Two endpoint products and one combined product replace four half-size multiplications.",
      "source": "practice"
    },
    {
      "id": "p4",
      "week": 2,
      "text": "Solve T(n)=4T(n/2)+Θ(n²) with a constant base.",
      "choices": [
        "Θ(n² log n)",
        "Θ(n²)",
        "Θ(n log n)",
        "Θ(n³)"
      ],
      "answer": 0,
      "why": "Level i has 4^i nodes, each with cost Θ((n/2^i)²). Every level costs Θ(n²).",
      "source": "practice"
    },
    {
      "id": "p5",
      "week": 2,
      "text": "Which QuickSort change limits stack depth on unbalanced partitions?",
      "choices": [
        "Recurse on the smaller side and loop on the larger side.",
        "Recurse on the larger side first.",
        "Always pick the first element as pivot.",
        "Compare children after both calls return."
      ],
      "answer": 0,
      "why": "Every nested recursive call has at most half as many elements as its parent. The large side is processed without another stack frame.",
      "source": "practice"
    },
    {
      "id": "p6",
      "week": 2,
      "text": "What is the solution to T(n)=T(n/3)+T(2n/3)+Θ(n)?",
      "choices": [
        "Θ(n log n)",
        "Θ(n)",
        "Θ(n²)",
        "Θ(log n)"
      ],
      "answer": 0,
      "why": "The Akra–Bazzi exponent is one, since 1/3+2/3=1. The integral contributes the logarithmic factor.",
      "source": "practice"
    },
    {
      "id": "p7",
      "week": 3,
      "text": "What is a tight bound for 3n²+5n+2?",
      "choices": [
        "Θ(n²)",
        "Θ(n)",
        "Θ(n³)",
        "Θ(log n)"
      ],
      "answer": 0,
      "why": "For n≥1 the expression lies between 3n² and 10n².",
      "source": "practice"
    },
    {
      "id": "p8",
      "week": 3,
      "text": "Before checking a[i] in linear search, what does the invariant guarantee?",
      "choices": [
        "Every earlier element has been checked and differs from the target.",
        "Every later element has been checked.",
        "The array is sorted.",
        "The target occurs at a[i]."
      ],
      "answer": 0,
      "why": "At i=0 the prefix is empty. Every mismatch grows the known nonmatching prefix by one.",
      "source": "practice"
    },
    {
      "id": "p9",
      "week": 3,
      "text": "Which operation should stay outside the timed portion of a benchmark?",
      "choices": [
        "Generating the test inputs",
        "The algorithm’s comparisons",
        "The algorithm’s heap operations",
        "The algorithm’s output-array allocation"
      ],
      "answer": 0,
      "why": "Preparing inputs beforehand helps isolate the work the algorithm itself performs.",
      "source": "practice"
    },
    {
      "id": "p10",
      "week": 4,
      "text": "What is the worst-case cost of get(i) on a linked list?",
      "choices": [
        "Θ(n)",
        "Θ(1)",
        "Θ(log n)",
        "Θ(n²)"
      ],
      "answer": 0,
      "why": "A middle element can require walking through a linear number of links, even if traversal starts from the nearer end.",
      "source": "practice"
    },
    {
      "id": "p11",
      "week": 4,
      "text": "How many old elements are copied by the ninth append if an empty dynamic array starts at capacity 2 and doubles?",
      "choices": [
        "14",
        "9",
        "8",
        "16"
      ],
      "answer": 0,
      "why": "Resizes copy 2, then 4, then 8 existing elements. The nine new writes are separate.",
      "source": "practice"
    },
    {
      "id": "p12",
      "week": 4,
      "text": "What is the tight time bound for bottom-up build-heap?",
      "choices": [
        "Θ(n)",
        "Θ(n log n)",
        "Θ(log n)",
        "Θ(n²)"
      ],
      "answer": 0,
      "why": "Most nodes are within a small distance of a leaf. Summing the possible sift distances over the tree gives Θ(n).",
      "source": "practice"
    },
    {
      "id": "p13",
      "week": 5,
      "text": "What does a tombstone preserve in a probing hash table?",
      "choices": [
        "The search path to keys inserted farther along the probe sequence",
        "The old key’s value as a valid entry",
        "The sorted order of the keys",
        "A guarantee that all future insertions collide"
      ],
      "answer": 0,
      "why": "Clearing a removed key’s slot entirely could cause a later search to stop too early.",
      "source": "practice"
    },
    {
      "id": "p14",
      "week": 5,
      "text": "What condition keeps a red-black tree’s paths within the logarithmic height bound?",
      "choices": [
        "Equal black height and no adjacent red nodes",
        "Every node has two children",
        "Smaller keys always use red nodes",
        "The order of insertion is random"
      ],
      "answer": 0,
      "why": "Equal black height fixes the number of black nodes per root-to-leaf path. The red rule limits how many extra red nodes can appear.",
      "source": "practice"
    },
    {
      "id": "p15",
      "week": 5,
      "text": "If keys car and cart exist in a trie, where are their terminal markers?",
      "choices": [
        "On both the car node and the cart node",
        "Only on cart",
        "Only on the root",
        "Only on car"
      ],
      "answer": 0,
      "why": "An internal node can mark an exact key even when it also has children.",
      "source": "practice"
    },
    {
      "id": "p16",
      "week": 6,
      "text": "When does Kruskal reject an edge?",
      "choices": [
        "Its endpoints are already in the same DSU set.",
        "It crosses a cut.",
        "It has negative weight.",
        "It is cheaper than the previous edge."
      ],
      "answer": 0,
      "why": "Vertices already in the same set have a path between them in the current forest. Adding their edge would form a cycle.",
      "source": "practice"
    },
    {
      "id": "p17",
      "week": 6,
      "text": "How many edges does any spanning tree on V vertices have?",
      "choices": [
        "V−1",
        "V",
        "E−1",
        "At most log₂ V"
      ],
      "answer": 0,
      "why": "A connected acyclic graph has exactly one fewer edge than vertices.",
      "source": "practice"
    },
    {
      "id": "p18",
      "week": 6,
      "text": "Can two MSTs of the same connected graph use different edges?",
      "choices": [
        "Yes, and their total weights are equal.",
        "Yes, and their total weights must differ.",
        "Only if the graph has a directed cycle.",
        "No, an MST is always unique."
      ],
      "answer": 0,
      "why": "Ties can allow safe alternatives. All minimum spanning trees share the same optimal total weight.",
      "source": "practice"
    },
    {
      "id": "p19",
      "week": 7,
      "text": "What are the SCCs of A→B→C→A, C→D, and D↔E?",
      "choices": [
        "{A,B,C} and {D,E}",
        "{A,B,C,D,E}",
        "{A,B} and {C,D,E}",
        "Five singleton components"
      ],
      "answer": 0,
      "why": "Each group is mutually reachable within itself. The edge from C to D has no return path between groups.",
      "source": "practice"
    },
    {
      "id": "p20",
      "week": 7,
      "text": "What event tells Kahn’s algorithm that a graph has a cycle?",
      "choices": [
        "Its queue is empty after emitting fewer than V vertices.",
        "Its queue contains more than one vertex.",
        "The first emitted vertex is a sink.",
        "Two nodes have equal indegree."
      ],
      "answer": 0,
      "why": "Remaining vertices still depend on predecessors among the remaining vertices. In a finite graph that requires a cycle.",
      "source": "practice"
    },
    {
      "id": "p21",
      "week": 7,
      "text": "What is the running time of topological relaxation for shortest paths in a DAG?",
      "choices": [
        "Θ(V+E)",
        "Θ(E log V)",
        "Θ(V²)",
        "Θ(VE)"
      ],
      "answer": 0,
      "why": "Finding the topological order and relaxing each edge once both take linear time in the adjacency-list graph size.",
      "source": "practice"
    },
    {
      "id": "p22",
      "week": 8,
      "text": "What is the edit distance from kitten to sitting?",
      "choices": [
        "3",
        "2",
        "4",
        "5"
      ],
      "answer": 0,
      "why": "Substitute k→s and e→i, then insert g. The DP table gives a minimum of three operations.",
      "source": "practice"
    },
    {
      "id": "p23",
      "week": 8,
      "text": "Which base case is correct for edit distance D[i][j] between prefixes?",
      "choices": [
        "D[i][0]=i",
        "D[i][0]=0",
        "D[0][j]=0 for every j",
        "D[i][i]=0 for every i"
      ],
      "answer": 0,
      "why": "Turning a prefix of i characters into an empty string requires deleting all i characters.",
      "source": "practice"
    },
    {
      "id": "p24",
      "week": 8,
      "text": "What order is used in interval DP for matrix-chain multiplication?",
      "choices": [
        "Increasing interval length",
        "Arbitrary order",
        "Decreasing interval length",
        "Increasing matrix dimension"
      ],
      "answer": 0,
      "why": "A split uses answers from strictly shorter subintervals, which must already be known.",
      "source": "practice"
    },
    {
      "id": "p25",
      "week": 9,
      "text": "What is the LPS table for ABABAC?",
      "choices": [
        "[0,0,1,2,3,0]",
        "[0,0,1,2,3,4]",
        "[1,1,2,2,3,0]",
        "[0,1,0,1,0,1]"
      ],
      "answer": 0,
      "why": "ABABA has border ABA of length 3. Adding C fails to extend that border or any shorter one.",
      "source": "practice"
    },
    {
      "id": "p26",
      "week": 9,
      "text": "Where does ABA match ABABABA using zero-based starts?",
      "choices": [
        "0, 2, 4",
        "0, 3",
        "2, 4 only",
        "1, 3, 5"
      ],
      "answer": 0,
      "why": "The matches overlap. KMP follows the final LPS value after each match so the shared A can be reused.",
      "source": "practice"
    },
    {
      "id": "p27",
      "week": 9,
      "text": "Why does Rabin–Karp verify equal hashes against the actual characters?",
      "choices": [
        "Different strings can share a hash.",
        "Hashes cannot determine window boundaries.",
        "Rolling hash compares only the last character.",
        "Verification builds the suffix array."
      ],
      "answer": 0,
      "why": "Hash equality is a fast filter. Direct comparison confirms that every character matches.",
      "source": "practice"
    },
    {
      "id": "p28",
      "week": 10,
      "text": "Given the suffix array, how long does Kasai take?",
      "choices": [
        "Θ(n)",
        "Θ(n log n)",
        "Θ(n²)",
        "Θ(log n)"
      ],
      "answer": 0,
      "why": "It builds inverse ranks and reuses the previous LCP minus at most one character. The total number of length increments is linear.",
      "source": "practice"
    },
    {
      "id": "p29",
      "week": 10,
      "text": "What is the suffix array of banana$ with 0-based indices and $ the smallest symbol?",
      "choices": [
        "[6,5,3,1,0,4,2]",
        "[0,1,2,3,4,5,6]",
        "[5,3,1,0,4,2,6]",
        "[6,1,3,5,0,2,4]"
      ],
      "answer": 0,
      "why": "The sorted suffixes are $, a$, ana$, anana$, banana$, na$, and nana$.",
      "source": "practice"
    },
    {
      "id": "p30",
      "week": 10,
      "text": "Which structure lets Aho–Corasick report a shorter pattern ending at the same position?",
      "choices": [
        "Output links or their equivalent",
        "Array capacity doubling",
        "An MST edge",
        "A stack frame for each text position"
      ],
      "answer": 0,
      "why": "A terminal suffix may be reached from a longer matched state. Output links surface those terminal suffixes.",
      "source": "practice"
    }
  ],
  "cards": [
    {
      "id": 1,
      "week": 1,
      "front": "What are four qualities of a good algorithm?",
      "back": "Correctness, efficiency, economy of resources, and simplicity."
    },
    {
      "id": 2,
      "week": 1,
      "front": "How does Karatsuba get ad + bc from three products?",
      "back": "Compute ac, bd and (a+b)(c+d). Subtract ac and bd from the third product."
    },
    {
      "id": 3,
      "week": 1,
      "front": "What must every recursive algorithm do?",
      "back": "Solve base cases directly and make each recursive branch progress toward a base case."
    },
    {
      "id": 4,
      "week": 1,
      "front": "What is the running time of Karatsuba with linear combination work?",
      "back": "Θ(n^log₂3), about Θ(n^1.585), from 3T(n/2) + Θ(n)."
    },
    {
      "id": 5,
      "week": 2,
      "front": "What are the three main parts of T(n) = aT(n/b) + f(n)?",
      "back": "Number of recursive calls, size of each subproblem, and work outside recursion, respectively."
    },
    {
      "id": 6,
      "week": 2,
      "front": "Why does Merge Sort cost Θ(n log n)?",
      "back": "There are Θ(log n) levels. Each level merges a combined total of n elements in Θ(n)."
    },
    {
      "id": 7,
      "week": 2,
      "front": "What is smaller-side recursion in QuickSort for?",
      "back": "Recurse on the smaller side and iterate over the other. This bounds stack depth by O(log n) even if time is quadratic."
    },
    {
      "id": 8,
      "week": 2,
      "front": "What tool handles T(n/4) + T(3n/4) + n?",
      "back": "Akra–Bazzi or a suitable recursion tree. Here p=1 and the solution is Θ(n log n)."
    },
    {
      "id": 9,
      "week": 3,
      "front": "What do O, Ω, and Θ mean?",
      "back": "Eventual upper bound, eventual lower bound, and matching upper and lower bounds."
    },
    {
      "id": 10,
      "week": 3,
      "front": "Name the three parts of a loop invariant proof.",
      "back": "Initialization, maintenance, and termination."
    },
    {
      "id": 11,
      "week": 3,
      "front": "What invariant works for linear search?",
      "back": "Before checking index i, all positions in [0,i) have been checked and differ from the target."
    },
    {
      "id": 12,
      "week": 3,
      "front": "How is amortized analysis different from average-case analysis?",
      "back": "Amortized analysis bounds cost across an operation sequence. Average-case analysis takes an expectation over an input distribution."
    },
    {
      "id": 13,
      "week": 4,
      "front": "Why is array append amortized Θ(1) with doubling?",
      "back": "The costs of copying at capacity changes add up as a geometric series, giving O(n) total copies for n appends."
    },
    {
      "id": 14,
      "week": 4,
      "front": "Why can indexed traversal of a linked list take Θ(n²)?",
      "back": "Every get(i) may traverse many links. Doing it repeatedly rescans nodes. A direct iterator traversal is Θ(n)."
    },
    {
      "id": 15,
      "week": 4,
      "front": "What are peekMin, extractMin and heapify costs?",
      "back": "Θ(1), worst-case Θ(log n), and Θ(n) for bottom-up heapify."
    },
    {
      "id": 16,
      "week": 4,
      "front": "Where are node i's children in a zero-based binary heap?",
      "back": "At 2i+1 and 2i+2 when those indices exist."
    },
    {
      "id": 17,
      "week": 5,
      "front": "Define α for a hash table.",
      "back": "Number of stored entries divided by the bucket count."
    },
    {
      "id": 18,
      "week": 5,
      "front": "What is expected lookup with separate chaining and good hashing?",
      "back": "O(1+α), including the bucket lookup and expected chain work."
    },
    {
      "id": 19,
      "week": 5,
      "front": "Why does a trie need terminal markers?",
      "back": "A prefix path can exist even when the exact string was never inserted."
    },
    {
      "id": 20,
      "week": 5,
      "front": "What controls the cost of operations in a plain BST?",
      "back": "Tree height h. Search, insertion and deletion are O(h), and a skewed tree can have height Θ(n)."
    },
    {
      "id": 21,
      "week": 6,
      "front": "What does DSU find return?",
      "back": "A representative of the set, typically its root. Path compression shortens future lookups."
    },
    {
      "id": 22,
      "week": 6,
      "front": "How do Kruskal and Prim choose the next edge?",
      "back": "Kruskal scans globally sorted edges, joining separate components. Prim chooses the cheapest edge leaving its growing tree."
    },
    {
      "id": 23,
      "week": 6,
      "front": "State the MST cut property.",
      "back": "A lightest edge crossing a cut that respects the already chosen edges is safe to add."
    },
    {
      "id": 24,
      "week": 6,
      "front": "What is the amortized cost of DSU with compression and union by size?",
      "back": "O(α(n)) per operation, where α is the inverse Ackermann function."
    },
    {
      "id": 25,
      "week": 7,
      "front": "When does DFS finish a vertex?",
      "back": "After all its outgoing edges have been examined and all DFS descendants have returned."
    },
    {
      "id": 26,
      "week": 7,
      "front": "What is the order of passes in Kosaraju?",
      "back": "DFS on the original graph for finish order. DFS on the transpose in decreasing original finish order."
    },
    {
      "id": 27,
      "week": 7,
      "front": "How does Kahn identify a cycle?",
      "back": "The zero-indegree queue empties before all V vertices are emitted."
    },
    {
      "id": 28,
      "week": 7,
      "front": "Why can DAG shortest paths handle negative edges?",
      "back": "Topological order arranges all possible predecessors before each vertex. Each outgoing edge needs only one relaxation."
    },
    {
      "id": 29,
      "week": 8,
      "front": "What five pieces define a DP solution?",
      "back": "Meaning of the state, base cases, transitions, evaluation order, and which state gives the answer."
    },
    {
      "id": 30,
      "week": 8,
      "front": "What does tails[k] mean for strict LIS?",
      "back": "Minimum final value of a strictly increasing subsequence of length k+1 found so far."
    },
    {
      "id": 31,
      "week": 8,
      "front": "What three neighbors feed an edit-distance cell?",
      "back": "Above for deletion, left for insertion, and diagonal for match or substitution."
    },
    {
      "id": 32,
      "week": 8,
      "front": "Why iterate one-row 0/1 knapsack capacity downward?",
      "back": "To read values from the previous item’s state. Upward iteration could reuse an item in the same pass."
    },
    {
      "id": 33,
      "week": 9,
      "front": "What does LPS[i] store in KMP?",
      "back": "Length of the longest proper prefix of pattern[0..i] that is also its suffix."
    },
    {
      "id": 34,
      "week": 9,
      "front": "What does KMP do after a full match to preserve overlaps?",
      "back": "Reset the matched length to lps[m−1] and continue the scan."
    },
    {
      "id": 35,
      "week": 9,
      "front": "How do you update a fixed polynomial rolling hash?",
      "back": "Remove the leading coefficient times p^(m−1), multiply by p, add the incoming coefficient, and normalize modulo M."
    },
    {
      "id": 36,
      "week": 9,
      "front": "How do you make Rabin–Karp report only exact matches?",
      "back": "Compare the actual pattern and text characters when their hashes match."
    },
    {
      "id": 37,
      "week": 10,
      "front": "What does a suffix array store?",
      "back": "The starting indices of all suffixes, ordered lexicographically."
    },
    {
      "id": 38,
      "week": 10,
      "front": "How does prefix doubling represent length-2k prefixes?",
      "back": "As pairs of ranks (rank[i], rank[i+k]) for the two length-k blocks."
    },
    {
      "id": 39,
      "week": 10,
      "front": "What information does Kasai reuse?",
      "back": "An LCP length k can retain at least k−1 matching positions after dropping one character."
    },
    {
      "id": 40,
      "week": 10,
      "front": "What does an Aho–Corasick failure link represent?",
      "back": "The longest proper suffix of a trie state’s string that is also a prefix in the pattern trie."
    }
  ],
  "assignments": [
    {
      "name": "A1 · Divide and conquer",
      "description": "Write a reusable-buffer Merge Sort. Explain randomized QuickSort, smaller-side recursion, median-of-medians and the linear closest-pair strip step. Test against known outputs.",
      "link": "https://lms.astanait.edu.kz/mod/assign/view.php?id=75317"
    },
    {
      "name": "A2 · Data structure analysis",
      "description": "Compare dynamic-array and linked-list workloads, justify two invariants, trace heap repair and separate amortized cost from measured speed.",
      "link": "https://lms.astanait.edu.kz/mod/assign/view.php?id=82839"
    },
    {
      "name": "A3 · City network graphs",
      "description": "Compare Kruskal and Prim by weight, detect a disconnected graph, find SCCs, reject a cyclic topological ordering and reconstruct Dijkstra paths.",
      "link": "https://lms.astanait.edu.kz/mod/assign/view.php?id=90712"
    },
    {
      "name": "A4 · Text algorithms",
      "description": "Define LCS and edit-distance states, compare naive/KMP/Rabin–Karp on identical inputs, and run Kasai from a supplied suffix array.",
      "link": "https://lms.astanait.edu.kz/mod/assign/view.php?id=94392"
    }
  ]
};
