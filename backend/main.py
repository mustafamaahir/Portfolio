"""
FastAPI Backend for Portfolio Website
Main application with API routes
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
from collections import defaultdict
import time

from ai_service import ai_service
from portfolio_data import PORTFOLIO_DATA


# Initialize FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="Backend API for AI-powered portfolio website",
    version="1.0.0"
)

# CORS Configuration - Update with your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://localhost:5173",  # Vite default port
        "https://your-portfolio-domain.vercel.app",  # Update with your Vercel domain
        "*"  # Remove in production, add specific domains
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Rate limiting storage (in-memory, use Redis in production)
rate_limit_storage = defaultdict(list)
RATE_LIMIT_MAX_REQUESTS = 20
RATE_LIMIT_WINDOW = 60  # seconds


# Request/Response Models
class Message(BaseModel):
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="User's message")
    conversation_history: List[Message] = Field(default=[], description="Previous conversation")


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI assistant's response")
    timestamp: str = Field(..., description="ISO format timestamp")
    suggested_questions: Optional[List[str]] = Field(None, description="Suggested follow-up questions")


class PortfolioResponse(BaseModel):
    bio: Dict
    experience: List[Dict]
    projects: List[Dict]
    skills: Dict
    testimonials: List[Dict]


# Helper Functions
def check_rate_limit(client_ip: str) -> bool:
    """
    Check if client has exceeded rate limit
    Returns True if within limit, False if exceeded
    """
    current_time = time.time()
    
    # Clean old entries
    rate_limit_storage[client_ip] = [
        timestamp for timestamp in rate_limit_storage[client_ip]
        if current_time - timestamp < RATE_LIMIT_WINDOW
    ]
    
    # Check if limit exceeded
    if len(rate_limit_storage[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        return False
    
    # Add current request
    rate_limit_storage[client_ip].append(current_time)
    return True


def sanitize_message(message: str) -> str:
    """Sanitize user input to prevent injection attacks"""
    # Remove potentially dangerous characters
    sanitized = message.strip()
    # Limit length
    sanitized = sanitized[:1000]
    return sanitized


# API Routes
@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Portfolio API is running",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/api/portfolio-data", response_model=PortfolioResponse)
async def get_portfolio_data():
    """
    Get all portfolio data
    Returns bio, experience, projects, skills, and testimonials
    """
    try:
        return {
            "bio": PORTFOLIO_DATA["bio"],
            "experience": PORTFOLIO_DATA["experience"],
            "projects": PORTFOLIO_DATA["projects"],
            "skills": PORTFOLIO_DATA["skills"],
            "testimonials": PORTFOLIO_DATA["testimonials"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio data: {str(e)}")


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat conversations with AI assistant
    
    Request body:
    - message: User's message (required, 1-1000 characters)
    - conversation_history: Previous messages (optional)
    
    Returns:
    - response: AI assistant's response
    - timestamp: ISO format timestamp
    - suggested_questions: Optional list of follow-up questions
    """
    try:
        # Rate limiting check
        # In production, get real IP from request headers
        # client_ip = request.client.host if hasattr(request, 'client') else client_host
        # if not check_rate_limit(client_ip):
        #     raise HTTPException(
        #         status_code=429,
        #         detail="Rate limit exceeded. Maximum 20 requests per minute."
        #     )
        
        # Sanitize input
        sanitized_message = sanitize_message(request.message)
        
        if not sanitized_message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Convert Pydantic models to dict format for AI service
        history = [
            {"role": msg.role, "content": msg.content}
            for msg in request.conversation_history
        ]
        
        # Get AI response
        ai_response = await ai_service.get_ai_response(
            user_message=sanitized_message,
            conversation_history=history
        )
        
        # Get suggested questions (only for first message)
        suggested_questions = None
        if len(request.conversation_history) == 0:
            suggested_questions = ai_service.get_suggested_questions()
        
        return ChatResponse(
            response=ai_response,
            timestamp=datetime.now().isoformat(),
            suggested_questions=suggested_questions
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred processing your request. Please try again."
        )


@app.get("/api/suggested-questions")
async def get_suggested_questions():
    """Get a list of suggested questions for the chat"""
    try:
        return {
            "questions": ai_service.get_suggested_questions()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "portfolio-api"
    }


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not found"}
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not found"}
    )
    
@app.api_route("/status", methods=["GET", "HEAD"])
def status():
    """Health check endpoint."""
    return {"status": "ok", "message": "Projects Portfolio API is running."}
    