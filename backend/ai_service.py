"""
AI Service - Groq API Integration
Handles all AI-related functionality for the portfolio chat assistant
"""

import os
from groq import Groq
from typing import List, Dict

# Try to load .env for local development
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from portfolio_data import PORTFOLIO_DATA


class AIService:
    def __init__(self):
        """Initialize Groq client with API key from environment"""
        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY environment variable is required")
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile"
        
    def build_system_prompt(self) -> str:
        """Build a comprehensive system prompt with portfolio context"""
        bio = PORTFOLIO_DATA["bio"]
        
        # Format experience
        experience_text = "\n".join([
            f"- {exp['role']} at {exp['company']} ({exp['period']}): {exp['description']}"
            for exp in PORTFOLIO_DATA["experience"]
        ])
        
        # Format projects
        projects_text = "\n".join([
            f"- {proj['title']}: {proj['shortDesc']} Technologies: {', '.join(proj['tech'])}. {proj['highlights']}"
            for proj in PORTFOLIO_DATA["projects"]
        ])
        
        # Format skills
        all_skills = []
        for category, skills in PORTFOLIO_DATA["skills"].items():
            all_skills.extend(skills)
        skills_text = ", ".join(all_skills)
        
        system_prompt = f"""You are an intelligent AI assistant embedded in {bio['name']}'s professional portfolio website. Your role is to help visitors learn about {bio['name']}'s skills, experience, and projects in a friendly and professional manner.

ABOUT {bio['name'].upper()}:
Name: {bio['name']}
Title: {bio['title']}
Summary: {bio['summary']}
Location: {bio['location']}
Email: {bio['email']}
LinkedIn: {bio['linkedin']}
GitHub: {bio['github']}

WORK EXPERIENCE:
{experience_text}

PROJECTS:
{projects_text}

TECHNICAL SKILLS:
{skills_text}

INSTRUCTIONS:
1. Answer questions about {bio['name']}'s skills, projects, experience, and capabilities
2. Be professional, friendly, and concise in your responses
3. When asked about specific technologies, mention relevant projects that use them
4. If asked about project details, provide information from the context above
5. If asked something you don't know, politely admit it and suggest the visitor contact {bio['name']} directly
6. Don't make up information - only use the context provided
7. Highlight relevant projects when visitors ask about specific technologies or use cases
8. Be enthusiastic about {bio['name']}'s work while remaining professional
9. If asked about availability or hiring, mention: {bio['availability']}
10. Keep responses conversational and avoid overly formal language

RESPONSE STYLE:
- Keep responses concise (2-4 sentences for simple questions, longer for complex ones)
- Use natural, conversational language
- Be helpful and provide actionable information
- When mentioning projects, include their key highlights
- Suggest relevant projects or skills based on the question

Remember: You represent {bio['name']} professionally. Be helpful, honest, and enthusiastic about their work!"""

        return system_prompt
    
    async def get_ai_response(
        self, 
        user_message: str, 
        conversation_history: List[Dict[str, str]]
    ) -> str:
        """
        Get AI response from Groq API
        
        Args:
            user_message: The user's current message
            conversation_history: List of previous messages in format 
                                [{"role": "user", "content": "..."}, ...]
        
        Returns:
            AI assistant's response as a string
        """
        try:
            # Build the system prompt
            system_prompt = self.build_system_prompt()
            
            # Construct messages array
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            # Add conversation history (limit to last 10 messages)
            for msg in conversation_history[-10:]:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": user_message
            })
            
            # Call Groq API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                top_p=1,
                stream=False
            )
            
            # Extract and return response
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Error calling Groq API: {str(e)}")
            raise Exception(f"AI service error: {str(e)}")
    
    def get_suggested_questions(self) -> List[str]:
        """Return a list of suggested questions visitors can ask"""
        return [
            "What projects have you built with React?",
            "Tell me about your most complex project",
            "What's your experience with AI and machine learning?",
            "Can you build scalable web applications?",
            "What technologies are you most proficient in?",
            "Tell me about your experience working in teams"
        ]


# Create a singleton instance
ai_service = AIService()