# YouTube Shorts Automation - Project Overview

**Goal:** Generate automated food facts YouTube Shorts → monetize → financial independence

**Current Status:** Halfway built using n8n workflow

## Workflow Overview (from n8n export)

### Flow:
1. **Schedule Trigger** → Every 12 hours
2. **AI Agent** → Generates text-to-video prompts about food
   - Intelligent food selection (healthy vs unhealthy)
   - Scene inside human body showing organ effects
   - Anthropomorphic food characters (Pixar-style 3D)
   - One-line Hindi dialogue for lip-sync
3. **Gemini 2.5 Flash** → Generate title + hashtags
   - Under 20 char title
   - Hashtags: #viralshort #shorts #Viral #short #indianviralshort
4. **Replicate API** → Generate video from prompt
   - Model: text-to-video (ID in workflow)
   - Polling loop until complete
5. **Telegram Bot** → Send notification with video link

## What's Working
- ✅ Prompt generation logic (detailed system prompt)
- ✅ AI agent for content creation
- ✅ Replicate video generation integration
- ✅ Telegram notification setup
- ✅ Hindi voice + lip-sync requirements defined

## What's Missing (to complete)

### 1. **YouTube Upload Integration**
- Need YouTube Data API setup
- Upload the generated video to shorts
- Add title, description, tags
- Schedule or publish immediately

### 2. **Video Download & Processing**
- Replicate outputs a URL; need to download video
- Verify format (9:16 vertical)
- Check duration (6-10 seconds ideal)
- Quality check (1080p preferred)

### 3. **Audio/Background Music**
- Hindi voice generation (TTS)
- Background music (royalty-free)
- Audio mixing with video

### 4. **Content Management**
- Track which foods have been used
- Avoid repetition
- Store prompt history
- Analytics tracking

### 5. **Monetization Strategy**
- Understand YouTube Shorts monetization requirements
- Track views, engagement
- Optimize posting schedule

### 6. **Credentials Configuration**
- YouTube Data API credentials needed
- Replicate API key already in workflow (placeholder)
- Telegram bot credentials needed

## Tech Stack Used
- **n8n**: Workflow orchestration
- **Google Gemini 2.5 Flash**: Content generation
- **Replicate**: Text-to-video generation
- **Telegram**: Notifications

## Next Steps Priority Order
1. Set up YouTube Data API credentials
2. Add YouTube upload node to n8n workflow
3. Add video download step from Replicate
4. Add Hindi TTS for the dialogue line
5. Add background music overlay
6. Test full end-to-end flow
7. Launch channel and iterate based on analytics

## Notes from Workflow
- Food must be anthropomorphic (eyes, lips, hands, legs)
- Scene inside human body (medical interior)
- Static camera (no pan/zoom/tilt)
- Hindi lip-sync required
- Dialogue format: "Main [FOOD NAME] hoon, main aapka [PROBLEM] [ACTION] karta hoon."
- No on-screen text, no watermark