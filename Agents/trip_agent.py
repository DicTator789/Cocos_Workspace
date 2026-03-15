# AIzaSyBye31FzRdZkVapPotBhRU1jYLpWhPyeDgpy

# --- Import all necessary libraries for our entire adventure ---
import os
import re
import asyncio
from IPython.display import display, Markdown
import google.generativeai as genai_old
import google.genai as genai
from google.adk.agents import Agent
from google.adk.tools import google_search
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService, Session
from google.genai.types import Content, Part
from getpass import getpass

print("✅ All libraries are ready to go!")