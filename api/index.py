from fastapi import FastAPI

app = FastAPI()

PROJECTS = [
    {"id": 1, "name": "AI_DATA_ENGINE", "cat": "RUST / ETL"},
    {"id": 2, "name": "SEC_CRAWLER", "cat": "PYTHON / SEC"},
    {"id": 3, "name": "UI_FRAMEWORK", "cat": "GSAP / NEXT.JS"}
]

@app.get("/api/projects")
async def get_projects():
    return PROJECTS

@app.get("/api/pricing")
async def get_pricing():
    return {
        "items": [
            {"name": "AUTOMATION", "price": 80, "original": 100},
            {"name": "SYSTEMS", "price": 160, "original": 200},
            {"name": "FRONTEND", "price": 120, "original": 150}
        ]
    }
