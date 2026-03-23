# AGENTS.md

## Project
IGCA-X — Invariant Generative Cognitive Architecture, optimized for intelligence per unit compute.

This repository is a **research prototype**, not a generic chatbot. Build a continuous cognitive system that uses structured memory, transformations, invariants, operators, and compilation of repeated reasoning into faster skills.

Read `README.md` first for the full architecture.

---

## Mission
Implement the smallest coherent version of IGCA-X that:
- runs continuously in a tick loop
- persists events and memory locally
- learns structured relational knowledge from text
- uses sparse retrieval and bounded reasoning
- tries transform-and-reuse before expensive planning
- compiles repeated reasoning into reusable operators
- remains inspectable and testable

Do **not** replace the design with a normal LLM wrapper.

---

## Build priorities
Optimize for:
1. correctness
2. inspectability
3. bounded compute
4. local learning
5. sparse activation
6. deterministic testability
7. incremental working milestones

Prefer a small working core over ambitious but vague modules.

---

## Non-negotiables
- TypeScript strict mode
- no giant dense ML model as the primary engine
- no unbounded graph traversals in the main loop
- no full-memory scans during ordinary inference
- planner must be local and depth-limited
- all core data structures must be serializable
- every reasoning/storage primitive must have tests
- deterministic behavior in test mode
- log enough traces to inspect runtime decisions
- keep active workspace small and bounded

---

## Architecture guardrails
The main intelligence should live in:
- event encoding
- factorization
- salience routing
- structured memory
- transformation matching
- operator reuse
- bounded planning
- compilation
- background consolidation
- meta-optimization

A tiny helper neural module is optional only for fuzzy ranking/parsing assistance. The system must still function without it.

---

## Required repo shape
Target structure:

```text
/igca-x
  /src
    /core
    /encoding
    /memory
    /reasoning
    /types
    /cli
  /tests
  README.md
  AGENTS.md
  package.json
  tsconfig.json
```

Suggested core files:
- `src/core/runtime.ts`
- `src/core/tick_loop.ts`
- `src/core/scheduler.ts`
- `src/encoding/event_encoder.ts`
- `src/memory/episodic_store.ts`
- `src/memory/semantic_graph.ts`
- `src/memory/invariant_store.ts`
- `src/memory/operator_store.ts`
- `src/memory/self_model.ts`
- `src/reasoning/factorizer.ts`
- `src/reasoning/salience_router.ts`
- `src/reasoning/transformation_matcher.ts`
- `src/reasoning/planner.ts`
- `src/reasoning/compiler.ts`
- `src/reasoning/meta_optimizer.ts`
- `src/cli/repl.ts`
- `src/cli/inspect.ts`

---

## Implementation order
Follow this order unless a very small dependency inversion is required:

1. scaffold project
2. define types/interfaces
3. runtime loop + scheduler
4. SQLite persistence + append-only event log
5. event encoder
6. episodic memory
7. semantic graph + self model
8. retrieval API
9. salience router
10. factorization engine
11. transformation matcher
12. operator library and execution
13. planner
14. compiler
15. background replay/consolidation
16. evaluation harness
17. CLI inspection polish

Do not jump ahead to “smart features” before persistence, retrieval, and tests are solid.

---

## Coding conventions
- use explicit interfaces and small modules
- avoid `any`
- prefer pure functions in reasoning code
- isolate side effects in storage/runtime modules
- dependency-inject stores/services where practical
- keep comments focused on invariants, constraints, and tradeoffs
- keep functions short when possible
- expose internal reasoning traces for debug inspection

---

## Testing requirements
Write tests as you go.

Minimum expectations:
- storage round-trip tests
- event encoding tests
- retrieval/top-K locality tests
- salience scoring tests
- transformation matching tests
- bounded planner tests
- compiler recurrence tests
- long-run tick stability smoke test

Add deterministic fixtures for:
- preference inference
- simple analogy
- contradiction repair
- operator reuse

---

## Runtime rules
Main loop should roughly do:
1. ingest external input
2. ingest internal triggers
3. update state variables
4. score salience
5. retrieve top-K local structures
6. attempt transform-and-reuse
7. escalate to planner only if unresolved
8. emit output or silence
9. write episode trace
10. schedule background work if budget allows

Hard limits:
- bounded workspace
- bounded retrieval fanout
- bounded planner depth/breadth
- background work interruptible and budget-aware

---

## Data model expectations
Implement and preserve clear types for at least:
- `RelationalEvent`
- `ConceptNode`
- `InvariantBundle`
- `CognitiveOperator`
- `EpisodeTrace`
- `WorkspaceState`
- runtime state variables

Prefer durable local storage for:
- events
- episodes
- concept graph nodes/edges
- invariant bundles
- operators
- compiled skills
- self-model state

---

## Evaluation
Track metrics early.

Intelligence-oriented:
- structural analogy success
- one-shot reuse success
- contradiction repair success
- operator reuse rate
- compilation hit rate

Efficiency-oriented:
- active nodes per tick
- retrieval fanout
- planner invocations
- planner depth
- average task cost/time
- cost reduction after compilation

Continuous-agent:
- long-run stability
- persistence quality
- background consolidation throughput

---

## First demo target
Build a CLI demo agent that can:
- learn simple relational facts
- infer user preferences from repeated conversation
- detect structural similarity between new and old tasks
- apply a learned operator to solve faster
- explain which invariant/transformation it used
- become cheaper over repeated trials

Keep the domain narrow at first:
- tools
- access/barriers
- containers
- role reversal
- simple social inference

---

## What to avoid
- monolithic “brain” class with everything inside
- hidden magic constants without explanation
- placeholder modules with no interface or tests
- generic prompt-engineering hacks standing in for architecture
- premature optimization before correctness/visibility
- turning the project into a standard chat assistant

---

## When in doubt
Choose the option that:
- keeps the architecture faithful
- reduces compute waste
- improves inspectability
- preserves bounded reasoning
- enables a runnable prototype sooner

If a feature threatens those goals, simplify it.
