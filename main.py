from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import sys

app = FastAPI()

# 动态项目数据
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

# 挂载静态文件
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    print(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
