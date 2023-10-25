## Hasbara.AI - Frontend Repo

AI in the service of truth.

Running live on:
[Hasbara.AI](https://hasbara.ai)

Hasbara.ai is an interactive project designed to educate, inform, and inspire dialogue around the devastating impacts of the 2023 Gaza war. This chatbot serves as a conversational agent, programmed to simulate insightful communication on the atrocities and consequences of this horrible attack and the following armed retaliation.


<p align="center">
  <img src="docs/examples/ex3.jpeg" alt="Real World Example" width="280"/>
  <p style="text-align: center"><a href="https://github.com/davidbench/hasbara-ai-FE/blob/main/docs/examples.md">See more real world examples</a></p>
</p>

### Get Involved
We believe in the power of community and welcome contributions from everyone who shares our vision of promoting peace through education. Here's how you can contribute:

- Contribute Content: Help us expand our database by contributing articles, personal stories, scholarly research, or any relevant content that fits our educational criteria and standards.
- Code Contributions: Improve the chatbot's functionality, user experience, or add new features.
- Feedback: Engage with our chat interface at [Hasbara.AI](https://hasbara.ai) and provide feedback, report bugs, or suggest improvements.
- Resources: This being a common good project, we rely on the community for support. Donating compute or cloud credits or contributing towards the project.
- Spread the Word: Share our project with your community, in educational settings, or social platforms to help us reach a wider audience.

### Model and Backend
- Llama 7b continuosly finetuned on self curated dataset using LoRA locally on RTX4090
- Hourly checkpoiints constantly served via HF
- Vercel Edge functions and dedicated container for embedding and finetuning

### Developers

Feel free to open PRs on main to implement the tasks below (or more).
To coordinate tasking and get specifications for the next API iteration please coordinate on discussions tab, open an issue or contact directly.

Install and run the frontend in front of our remote API endpoint:

1. Clone the repo locally
1. Run `npm install`
1. Run `npm run dev`

### Frontend Todos
TODO: migrate to Github Projects

- [x] color scheme and tailwind setup
- [x] serve files and DNS forward hasbara.ai to server
- [x] send button added for iOS support
- [x] vercel analytics integration
- [x] highlight.io session visibility on prod
- [x] mapping to messages and removal of system messages by API
- [x] prompt injection Server side on Next Edge function
- [x] user session ID generation and component
- [x] user ID persistance in local storage
- [x] user language and metadata relay
- [ ] buttons for predefined questions / random questions generation
- [ ] loading spinner on send and startup
- [ ] close conversation redirect and popup
- Metadata
  - [ ] message to support image display through metadata
  - [ ] referance links
  - [ ] advisory when clicking - harsh images
  - [ ] message video player support, small blobs (gif, mp4, etc.)
  - [ ] message online player support (youtube, vimeo, etc.)
  - [ ] send user metadata to chat API endpoint immediately to support assistant initiating conversation
- [ ] fix useChat isLoading condition to send to message immediately upon stream end
- [ ] middleware server with embed and DB access
- [ ] FE fallback for API timeouts and failures
- [ ] define CORS policy for API and relay to HF
- [ ] add snackbar alerts support
- [ ] session reload if inactivity on tab for >1hr
- [ ] add user statistics page visible to user (country histogram, word cloud, etc.)
- [ ] feedback support general link
- [ ] feedback support on single message level (requires backend dev)
- [ ] add support for multiple languages (RTL, Arabic, Spanish, French, Hebrew, Russian, etc.)
- [ ] add support for share this conversation on social media (requires session persistance)
