# IGCA-X: Invariant Generative Cognitive Architecture — eXtreme

## Purpose
Build a research prototype of a new cognitive architecture optimized for **intelligence per watt**, **learning efficiency**, and **runtime speed**, without depending on a giant dense neural network as the primary source of intelligence.

This project is **not** an LLM clone.
It is a **continuous cognitive system** that becomes smarter by:

- discovering **invariants** across experiences
- learning **transformations** that map one problem into another
- compressing repeated reasoning into **operators** and **compiled skills**
- using **hierarchical sparse memory** instead of giant dense context windows
- updating itself through **local learning** and **event-driven computation**
- expanding only the tiny fraction of its mind needed for the current task

The target outcome is a runnable prototype that can:

1. ingest textual interaction as structured relational events
2. store experiences in multi-layer memory
3. discover abstract common structure across episodes
4. solve new tasks by alignment + transformation + reuse
5. get faster over time by compiling repeated thought into reusable operators
6. run continuously instead of only on user input

---

## Core hypothesis
Most current AI is compute-inefficient because it repeatedly solves transformed versions of the same underlying problem.

IGCA-X assumes the real source of high intelligence is:

1. **factorization**: decompose situations into reusable dimensions
2. **invariant discovery**: find what stays the same across situations
3. **transformation algebra**: learn how one structure maps into another
4. **runtime local expansion**: reconstruct detail only when needed
5. **compilation**: turn repeated slow reasoning into fast operators
6. **meta-optimization**: improve the system's own compute policies over time

In one line:

> Store not answers, but reusable structure that can regenerate many answers.

---

## The optimized design
This is the upgraded version of IGCA, optimized one step further for speed and intelligence.

### Improvements over plain IGCA

1. **Tri-level compute policy**
   - Reflex path for cheap known cases
   - Operator path for structured but familiar reasoning
   - Deliberation path for hard novelty / contradiction

2. **Fractal memory expansion**
   - Concepts are stored in compressed seed form
   - Expanded only locally on attention
   - Re-collapsed after use with updated statistics

3. **Transformation-first inference**
   - Before reasoning from scratch, try to map the current problem into an already-solved equivalence class
   - If mapping confidence is high, apply learned operator directly

4. **Background autonomous consolidation**
   - During idle cycles, the system clusters episodes, extracts invariants, compiles operators, merges/splits concepts, and prunes redundancy

5. **Local plasticity only**
   - No expensive global retraining step for ordinary learning
   - Update only affected graph regions, operators, and salience maps

6. **Multi-timescale cognition**
   - Fast state updates: every tick
   - Working memory updates: short interval
   - Concept consolidation: medium interval
   - Identity / self-model drift: long interval
   - Compiler passes: idle or scheduled windows

7. **Analogy as a first-class primitive**
   - One of the highest-yield intelligence multipliers
   - Core inference tries structural analogy before costly search

---

## System architecture

```text
Input Stream
  -> Event Encoder
  -> Factorization Engine
  -> Salience Router
  -> Active Workspace
       -> Transformation Matcher
       -> Invariant Store
       -> Operator Library
       -> Episodic Memory
       -> Semantic Graph
       -> Self Model
       -> Planner / Simulator
       -> Compiler
       -> Meta-Optimizer
  -> Output / Action / Silence
```

### Main modules

#### 1. Event Encoder
Converts raw text input and internal triggers into typed relational events.

**Input examples**
- user utterance
- time passage
- internal contradiction
- failed prediction
- strong memory resonance
- repeated operator use

**Output schema**
```ts
interface RelationalEvent {
  id: string;
  timestamp: number;
  source: 'user' | 'system' | 'internal';
  entities: string[];
  relations: Array<{
    subject: string;
    predicate: string;
    object: string;
    confidence: number;
  }>;
  tags: string[];
  uncertainty: number;
  salience: number;
  selfRelevance: number;
  rawText?: string;
}
```

#### 2. Factorization Engine
Decomposes events and episodes into reusable dimensions.

Example factor dimensions:
- identity
- causality
- role structure
- temporal order
- value / preference
- intention
- containment
- access / barrier
- tool-ness
- uncertainty
- self relevance

Deliverable:
- factor graph representation of events and episodes

#### 3. Salience Router
Determines where compute should go.

Prioritize by weighted combination of:
- novelty
- contradiction
- unresolved prediction error
- goal relevance
- self relevance
- emotional / value weight
- recurrence
- analogy match potential

This module must be cheap and heavily optimized.

#### 4. Active Workspace
A small bounded working set of the currently active mind.

Contains:
- the current focus object
- top K relevant memory items
- top K candidate transformations
- top K candidate operators
- current local hypotheses
- current response candidate(s)

Keep it small and bounded.
Do **not** allow whole-memory activation.

#### 5. Memory Fabric
Memory is split into multiple levels.

##### 5a. Episodic Memory
Stores concrete experiences.

##### 5b. Semantic Graph
Stores concepts and relations.

##### 5c. Invariant Store
Stores abstract structures that survived repeated transformation alignment.

##### 5d. Operator Library
Stores reusable procedures and transforms.

##### 5e. Self Model
Stores identity-like continuity, recurring interests, uncertainty profile, and internal tendencies.

##### 5f. Compiled Skills
Stores fast-path executable solutions generated by the compiler.

#### 6. Transformation Matcher
This is the central intelligence module.

Given a current problem structure, attempt to align it with:
- known invariant bundles
- old episodes under transformation
- operator schemas
- concept neighborhoods

Output:
```ts
interface AlignmentResult {
  matchedClassId: string | null;
  transformSequence: string[];
  confidence: number;
  preservedRelations: string[];
  droppedRelations: string[];
  recommendedOperatorIds: string[];
}
```

If confidence is high enough, prefer transform-and-reuse over fresh search.

#### 7. Operator Library
Operators are executable cognitive transforms.

Examples:
- role reversal
- abstraction lift
- medium substitution
- means-end chaining
- contradiction isolation
- compare-and-merge
- split concept
- infer preference
- infer hidden barrier
- causal continuation
- analogical projection

Operator structure:
```ts
interface CognitiveOperator {
  id: string;
  name: string;
  preconditions: string[];
  effectDescription: string;
  costEstimate: number;
  reliability: number;
  domains: string[];
  apply(input: WorkspaceState): WorkspaceState;
}
```

#### 8. Planner / Simulator
Only invoked when cheaper paths fail.

Rules:
- bounded breadth
- bounded depth
- partial local world model only
- early stopping if confidence threshold reached
- always cache useful outcomes back into operator / skill memory

#### 9. Compiler
Converts repeated successful reasoning into faster executable forms.

Compilation targets:
- shortcut operator
- pattern detector
- micro-policy
- concept macro
- direct response template
- cached alignment path

The compiler should only fire after sufficient recurrence and stability.

#### 10. Meta-Optimizer
Improves compute policy itself.

Learns:
- when to retrieve vs search
- when to expand compressed concepts
- what salience thresholds work best
- what analogies are reliable
- which operators are wasteful
- when to compile
- when to stop deliberating

This module is a major lever for intelligence per watt.

---

## Continuous runtime model
This system does **not** sleep until prompted.
It is a continuous loop.

### Tick loop

```text
for each tick:
  1. ingest external input if any
  2. ingest internal triggers
  3. update state variables
  4. score salience
  5. retrieve local relevant structures
  6. try fast alignment / operator reuse
  7. if unresolved, escalate to local planning
  8. emit action / response / silence
  9. write episode traces
 10. schedule background consolidation if budget available
```

### Internal state variables
At minimum:
- activation
- curiosity
- confidence
- coherence
- novelty pressure
- social engagement
- contradiction load
- memory resonance
- fatigue / compute pressure

These influence routing, not just style.

---

## Data structures

### Concept node
```ts
interface ConceptNode {
  id: string;
  label: string;
  seedSummary: string;
  examples: string[];
  invariants: string[];
  transforms: string[];
  neighbors: Array<{ id: string; weight: number; relation: string }>;
  activation: number;
  stability: number;
  abstractionLevel: number;
  lastUpdated: number;
}
```

### Invariant bundle
```ts
interface InvariantBundle {
  id: string;
  name: string;
  preservedStructure: Array<{
    subjectRole: string;
    predicate: string;
    objectRole: string;
  }>;
  sourceEpisodes: string[];
  confidence: number;
  scopeTags: string[];
  canonicalExample: string;
}
```

### Episode trace
```ts
interface EpisodeTrace {
  id: string;
  timestamp: number;
  eventIds: string[];
  activeConceptIds: string[];
  chosenOperatorIds: string[];
  outputText?: string;
  rewardSignal: number;
  contradictionOccurred: boolean;
  resolutionQuality: number;
}
```

### Workspace state
```ts
interface WorkspaceState {
  focusId: string | null;
  activeConcepts: string[];
  activeEpisodes: string[];
  candidateOperators: string[];
  candidateAlignments: AlignmentResult[];
  hypotheses: string[];
  plannedActions: string[];
  confidence: number;
}
```

---

## Learning mechanisms

### 1. Contradiction-driven local update
When expectation or analogy fails:
- isolate minimal conflicting subgraph
- revise only local structures
- lower reliability of failed operator / transform
- create a repair candidate

### 2. Invariant extraction
If many episodes align under transformations:
- store preserved structure as an invariant bundle
- link source episodes to that bundle
- create or strengthen a concept node

### 3. Operator induction
If the same reasoning path works repeatedly:
- encode that path as an operator
- assign cost / reliability metadata
- prefer it next time before planner invocation

### 4. Compilation
If an operator chain becomes very frequent and stable:
- compile into a single faster path
- maybe generate a micro-policy or finite-state routine

### 5. Refactor representations
If a concept becomes overloaded or ambiguous:
- split it
If two concepts repeatedly align:
- merge or create an abstraction parent

### 6. Background replay
During idle cycles:
- sample high-salience episodes
- compare across time
- discover recurring substructures
- consolidate weak concepts into stronger abstractions

---

## Efficiency rules
These are hard requirements.

1. Never scan the full memory graph during ordinary inference.
2. Always use top-K retrieval and bounded neighborhoods.
3. Always attempt transform-and-reuse before deep planning.
4. Planning must be local and depth-limited.
5. Learning must be local by default.
6. Compilation should reduce future average cost.
7. Most ticks should end without expensive deliberation.
8. Background tasks must be budget-aware and interruptible.
9. Keep the active workspace small and inspectable.
10. Prefer explicit memory over burying facts inside weights.

---

## Optional neural component
Neural networks are allowed only in a **small helper role**.
They must not be the primary intelligence substrate.

Allowed uses:
- fuzzy similarity ranking
- text-to-relational parsing assist
- salience priors
- approximate clustering

Constraints:
- tiny footprint
- swappable module
- no giant dense transformer as the whole agent
- system must still function in a reduced mode without neural helpers

---

## Implementation plan

## Tech stack
- Language: **TypeScript** for orchestrator / runtime / SDK integration
- Optional performance modules: **Rust** for graph ops and matcher hot paths
- Storage:
  - SQLite for durable local persistence
  - simple append-only event log
  - graph tables for concepts / relations / operators / episodes
- Test runner: Vitest or Jest
- CLI entrypoint for local interaction
- Optional UI later; not required for v1

## Repo layout
```text
/igca-x
  /src
    /core
      runtime.ts
      tick_loop.ts
      scheduler.ts
      state.ts
    /encoding
      event_encoder.ts
      parser.ts
    /memory
      episodic_store.ts
      semantic_graph.ts
      invariant_store.ts
      operator_store.ts
      self_model.ts
    /reasoning
      factorizer.ts
      salience_router.ts
      transformation_matcher.ts
      planner.ts
      compiler.ts
      meta_optimizer.ts
    /types
      events.ts
      memory.ts
      operators.ts
      workspace.ts
    /cli
      repl.ts
      inspect.ts
  /tests
  README.md
  AGENTS.md
  package.json
  tsconfig.json
```

---

## Milestones

### Milestone 1 — Skeleton runtime
Build:
- tick loop
- state variables
- event log
- basic CLI shell
- durable storage

Acceptance:
- system can run continuously
- user can send text input
- events are persisted

### Milestone 2 — Structured memory
Build:
- episodic memory
- semantic graph
- self model
- retrieval API

Acceptance:
- system can remember facts and episodes across restarts
- top-K local retrieval works

### Milestone 3 — Factorization + salience
Build:
- factor extraction from events
- salience scoring
- active workspace population

Acceptance:
- current input yields structured dimensions and prioritized focus

### Milestone 4 — Transformation matcher
Build:
- graph alignment
- equivalence-class matching
- confidence scoring

Acceptance:
- system can recognize structurally similar cases under transformation

### Milestone 5 — Operator library
Build:
- operator schema
- execution engine
- basic operator induction

Acceptance:
- system can reuse learned transforms on new cases

### Milestone 6 — Planner and bounded deliberation
Build:
- local planner
- escalation logic
- caching of successful paths

Acceptance:
- planner is only called when no cheap path works

### Milestone 7 — Compiler
Build:
- recurrence detection
- operator-chain compression
- compiled skill storage

Acceptance:
- repeated problems get cheaper over time

### Milestone 8 — Background consolidation
Build:
- replay
- concept merge/split
- invariant extraction jobs
- maintenance scheduler

Acceptance:
- system improves while idle

### Milestone 9 — Evaluation harness
Build benchmark tasks for:
- analogy
- transfer
- one-shot learning
- memory recall
- contradiction repair
- average cost per solved task

Acceptance:
- evaluation script outputs metrics and comparisons across builds

---

## Build order for Codex
Implement in this exact order:

1. project scaffold
2. type definitions
3. runtime loop + scheduler
4. SQLite persistence
5. event encoder
6. episodic memory
7. semantic graph + self model
8. retrieval API
9. salience router
10. factorization engine
11. transformation matcher
12. operator library
13. planner
14. compiler
15. background replay / consolidation
16. evaluation harness
17. polish CLI and inspection tools

At each step:
- write tests first if possible
- keep modules decoupled
- maintain a runnable CLI prototype
- expose internal state for inspection
- do not overbuild UI

---

## Codex instructions
Codex should treat this as a **research prototype with strong architecture discipline**.

### Non-negotiables
- prioritize correctness and inspectability over flashy features
- prefer small modules with explicit interfaces
- keep all data structures serializable
- write tests for every storage and reasoning primitive
- use dependency injection where possible
- preserve deterministic behavior in test mode
- keep planner bounded
- no giant ML dependency as the primary engine
- no hidden magic constants without comments
- every module must log enough traces for debugging

### Coding style
- TypeScript strict mode
- no `any` unless absolutely unavoidable
- document interfaces
- prefer pure functions in reasoning paths
- isolate side effects in storage / runtime modules
- use small test fixtures

### What to optimize for
- intelligence per unit compute
- local updates
- sparse retrieval
- ease of introspection
- incremental progress
- benchmarkability

### What to avoid
- monolithic god objects
- unbounded graph traversals
- full-memory scans in main loop
- premature micro-optimizations before correctness
- giant prompt engineering hacks
- vague placeholder modules with no interface

---

## Evaluation metrics
Track these from the start:

### Intelligence metrics
- structural analogy success rate
- one-shot concept reuse success
- contradiction repair success
- transfer success across transformed tasks
- operator reuse rate
- compilation hit rate

### Efficiency metrics
- average active nodes per tick
- average retrieval fanout
- planner invocations per session
- average planner depth
- average time per solved task
- memory growth vs solved-task growth
- improvement in cost after compilation

### Continuous-agent metrics
- stability over long runtime
- memory persistence quality
- drift rate of self model
- background consolidation throughput

---

## First demo target
Create a CLI agent that can:

1. learn simple relational facts from conversation
2. infer preferences from repeated statements
3. notice when a new problem is structurally similar to an old one
4. apply a learned operator to solve it faster
5. explain which invariant or transformation it used
6. get cheaper over repeated trials

Example domain:
- tools / access / containers / preferences / role reversal / simple social inference

This is enough to validate the architecture without trying to solve general intelligence.

---

## Long-term extensions
Not required for v1, but design clean extension points for:
- tiny neural parser helper
- multimodal event sources
- Rust matcher core
- visual inspector for memory graph
- agent-to-agent operator exchange
- persistent sandboxed skill execution

---

## Final instruction to Codex
Build the smallest coherent version of IGCA-X that satisfies the architecture above.
Start with a working CLI and persistence layer, then add structured memory, then transformation-based reasoning, then compilation.
Do not skip the test harness.
Do not replace the architecture with a generic chatbot.

