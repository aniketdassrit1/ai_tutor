
---
title: Socratica AI Project Documentation
tags:
- project
- AI-Tutor
- Python
- RAG
- Engineering
  aliases:
- Socratica AI
---

# 🧠 Socratica AI

> [!abstract] **The Core Loop**
> 📥 **Upload** $\rightarrow$ 📚 **Curriculum** $\rightarrow$ 🎤 **Interview** $\rightarrow$ ⚙️ **Adapt** $\rightarrow$ 📊 **Knowledge Gap Report**

---

## 🏗️ Phase 1: The Knowledge Base (RAG & Vector DB)
**Goal:** Establish a "Source of Truth" to eliminate AI hallucinations.

### 🛠️ Implementation
- **The Task:** Allow users to upload a PDF or paste a URL (e.g., "Python Decorators" documentation).
- **Core Python:** Text extraction via `PyPDF2` or `pdfplumber`.
- **Vector DB (ChromaDB):**
    1. Split text into semantic chunks.
    2. Create embeddings (using local `sentence-transformers`).
    3. Store in `ChromaDB` for efficient retrieval.
- **RAG (Retrieval-Augmented Generation):** When the AI interviews the user, it queries the Vector DB to ensure questions are grounded in the provided context.

> [!success] **Interview Value**
> "I implemented a **RAG pipeline** to ground the AI in specific technical documentation, effectively eliminating hallucinations during the tutoring process."

---

## 🧠 Phase 2: The Adaptive Engine (FastAPI & Pydantic)
**Goal:** Build the "Brain" that dynamically manages student difficulty.

### 🛠️ Implementation
- **The Task:** Create a system that tracks the "Student State" in real-time.
- **Pydantic Models:** Defining a strict schema for user progress.
```python
class StudentState(BaseModel):
    current_level: str  # "Beginner", "Intermediate", "Expert"
    confidence_score: float # 0.0 to 1.0
    mastered_topics: List[str]
    struggling_topics: List[str]
````

- **FastAPI Endpoints:**
    - `POST /start-session`: Initializes the `StudentState`.
    - `POST /submit-answer`: Processes the answer  LLM Evaluation  Returns next question + updated state.
- **Adaptive Logic:**
    - **Perfect Answer:**  `current_level` to "Intermediate".
    - **Incorrect Answer:**  Add topic to `struggling_topics`.

**Interview Value**

"I designed a **stateful API using Pydantic** to track user progress in real-time, allowing the AI to dynamically adjust its questioning strategy based on performance."

---

## 📊 Phase 3: The Performance Analyst (Pandas)

**Goal:** Transform unstructured dialogue into a quantitative, data-driven report.

### 🛠️ Implementation

- **The Task:** Answer the critical question: _"Where exactly did I fail?"_
- **Storage:** Log every Q&A pair in a local `SQLite` database or `JSON` file.
- **Pandas Analysis:**
    - **Accuracy Rate:** Calculate proficiency per topic.
    - **Latency Tracking:** Identify "Time-to-Answer" via timestamps.
    - **Knowledge Mapping:** Generate a proficiency breakdown (e.g., _90% proficient in 'Asyncio', 20% in 'Context Managers'_).

**Interview Value**

"I used **Pandas to perform post-session analytics** on conversation logs, transforming unstructured dialogue into a quantitative progress report for the user."

---

## ⚡ Phase 4: The High-Performance Loop (Asyncio & HTTP)

**Goal:** Ensure the AI interaction feels instantaneous and fluid.

### 🛠️ Implementation

- **The Task:** Orchestrate the retrieval, evaluation, and state update steps without blocking.
- **Asyncio:** Utilize `asyncio.gather()` to handle multiple operations concurrently.
- **HTTP (httpx):** Use `httpx.AsyncClient` for non-blocking calls to LLM APIs (Groq/Gemini/Ollama).
- **Concurrency Pattern:** While the LLM is generating the next question, the system can update Pandas analytics in the background.

**Interview Value**

"To minimize latency, I implemented an **asynchronous pipeline using asyncio and httpx**, allowing for concurrent retrieval and inference to create a seamless user experience."


Prompt:
Design a comprehensive, ultra-modern AI Learning Management System (LMS) that integrates knowledge ingestion, real-time tutoring, and deep analytics. The platform should consist of the following integrated views:

- Knowledge Ingestion Dashboard: A clean, minimalist SaaS interface featuring drag-and-drop PDF uploads and URL inputs. Include a "Processing" state that visually demonstrates document chunking through a network of connected semantic nodes (Vector Map).
- Interactive Tutoring Interface: A split-screen layout using a soft glassmorphism effect. The left side is a high-fidelity chat interface featuring "streaming" text responses. The right side is a telemetry panel displaying a 0-100% Confidence Score gauge, a "Current Level" badge (e.g., Beginner $\rightarrow$ Intermediate), and categorized lists for 'Mastered Topics' (green checkmarks) and 'Struggling Topics' (amber warnings).
- Learning Analytics Suite: An executive-style report page on a professional white background. This must include a Radar (Spider) Chart for Python topic proficiency, a bar chart for response latency, and a heat map for knowledge gaps, using a blue and teal professional palette.
- System Infrastructure Overlay: A subtle, high-contrast dark mode indicator in the corner of the UI showing real-time background system status (e.g., 'Updating Analytics...', 'Querying Vector DB...') with micro-animations/loaders.

Visual Identity: The overall aesthetic should be a blend of deep indigo, slate grey, and electric blue accents, maintaining a minimalist, high-fidelity SaaS feel.