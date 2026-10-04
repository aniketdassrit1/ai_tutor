# Phase 1 Roadmap: The Knowledge Base (RAG & Vector DB)

The goal of this phase is to create a "Source of Truth" that allows users to upload PDFs or paste URLs to ground the AI's responses and eliminate hallucinations.

---

## 🗺️ Roadmap Overview

### Milestone 1: Project Architecture
**Goal:** Establish a clean monorepo structure to house both the Python backend and Angular frontend.
- **The "Why":** A structured monorepo ensures version consistency and simplifies deployment and local development.
- **Learning Objectives:** Virtual environments (`venv` or `conda`), `npm` workspaces or basic folder structuring, `../../../ai_tutor/project-bolt-sb1-ekeerghb/project/.gitignore` for Python/Node.
- **Success Criteria:** Both projects can be launched independently; backend dependencies are isolated from global Python packages.

### Milestone 2: The Data Pipeline (Ingestion)
**Goal:** Build a pipeline that converts raw PDFs and URLs into clean, manageable text chunks.
- **The "Why":** LLMs have "context windows" (limits on how much text they can read). **Chunking** breaks large documents into smaller, semantically meaningful pieces so the AI only receives the most relevant snippets.
- **Learning Objectives:** 
    - `pdfplumber` vs `PyPDF2` (handling layout/tables).
    - `BeautifulSoup` or `Trafilatura` for URL scraping.
    - **Recursive Character Text Splitting:** Understanding overlap (to prevent losing context at the edges of chunks).
- **Success Criteria:** A Python script that takes a PDF/URL and outputs a list of text strings (chunks) without losing critical data.

### Milestone 3: The Vector Store (Storage & Retrieval)
**Goal:** Implement ChromaDB to store embeddings and perform similarity searches.
- **The "Why":** Computers cannot "read" text; they process numbers. **Embeddings** convert text into high-dimensional vectors. **Vector DBs** allow us to find the "nearest neighbor" (the most similar text) using cosine similarity.
- **Learning Objectives:** 
    - `sentence-transformers` (Local embedding models like `all-MiniLM-L6-v2`).
    - ChromaDB Collections, IDs, and Metadata filtering.
    - The concept of "Distance Metrics" (Euclidean vs. Cosine).
- **Success Criteria:** You can query the DB with a natural language question and receive the top 3 most relevant chunks from your uploaded documents.

### Milestone 4: The API Layer (The Bridge)
**Goal:** Create a REST API (FastAPI or Flask) to expose the RAG logic to the frontend.
- **The "Why":** The frontend cannot talk to ChromaDB directly. An API layer handles authentication, request validation, and coordinates the flow between the DB and the LLM.
- **Learning Objectives:** 
    - FastAPI (Asynchronous endpoints, Pydantic models for request/response).
    - CORS (Cross-Origin Resource Sharing) to allow Angular to communicate with Python.
- **Success Criteria:** A `POST /upload` endpoint that processes a file and a `POST /query` endpoint that returns retrieved context.

### Milestone 5: The Frontend UI (User Interface)
**Goal:** Build a professional interface for document management using Angular Material.
- **The "Why":** Users need a way to manage their "Source of Truth" without touching the terminal.
- **Learning Objectives:** 
    - `MatStepper` or `MatTabs` for the upload flow.
    - `HttpClient` for API integration.
    - Reactive Forms for URL input and file upload handling.
- **Success Criteria:** A UI where a user can upload a PDF or paste a URL and see a "Processing..." state followed by a "Success" confirmation.

### Milestone 6: The RAG Integration (The Final Loop)
**Goal:** Implement the "Augmentation" part of RAG: `Prompt = Context + Question`.
- **The "Why":** This is where the magic happens. By injecting the retrieved chunks into the system prompt, you force the AI to answer *only* based on the provided data, eliminating hallucinations.
- **Learning Objectives:** 
    - **Prompt Engineering:** Creating "System Instructions" (e.g., *"Answer using only the provided context. If the answer isn't there, say 'I don't know'"*).
    - Integrating the LLM (via API or local Ollama).
- **Success Criteria:** The AI provides an answer that cites specific information from the uploaded PDF that was not part of its original training data.
