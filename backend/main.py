#Start API -> uvicorn main:app --host 0.0.0.0 --port 8000 --reload
#Go Run -> go run main.go
#frint end -> npm run dev 
from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import pandas as pd
import json
from pydantic import BaseModel
import sqlite3
from sqlalchemy import create_engine

app = FastAPI(
    prefix="/Cabana",
    title="Cabana API",
    tags=["Cabana API"],
    responses={404: {"message": "Not found"}},
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DeleteReview(BaseModel):
    review_id: int

class EditReviews(BaseModel):
    review_id: int
    review_id: int
    rating: int
    comment: str
    booking_id: int
    passenger_id: int
    driver_id: int

database_path = "project-sa67.db"
engine = sqlite3.connect(database_path)

@app.get("/", include_in_schema=False)
async def index():
    try:
        return RedirectResponse("/docs")
    except:
        return { "message": "Unable to connect" }

    
@app.get("/get/reviews", tags=["Review"])
async def get_promo():
    sql = f"""
        SELECT 
            *
        FROM 
            reviews
        ORDER BY 
            review_id ASC
    """
    df = pd.read_sql(sql, engine)
    res = df.to_json(orient='records')
    parsed = json.loads(res)
    if len(df) > 0:
        return {'message': 'success', 'data': parsed}
    else:
        return {'message': 'error', 'data': []}

@app.get("/get/reviews/id", tags=["Review"])
async def get_promo2(id: str):
    sql = f"""
        SELECT 
            *
        FROM 
            reviews
        WHERE
            review_id = '{id}'
    """
    df = pd.read_sql(sql, engine)
    res = df.to_json(orient='records')
    parsed = json.loads(res)
    try:
        return {'message': 'success', 'data': parsed}
    except Exception as e:
        return {'message': 'error', 'data': e}

@app.delete("/delete/reviews", tags=["Review"])
async def del_review(item: DeleteReview):
    sql = f"""
        DELETE FROM reviews WHERE review_id = {item.review_id}
    """
    try:
        cursor = engine.cursor()
        cursor.execute(sql)
        last_id = cursor.lastrowid
        return {'message': 'success', 'id': last_id}
    except Exception as e:
        return {'message': e, 'sql': sql}
    
@app.put("/edit/reviews", tags=["Review"])
async def del_review(item: EditReviews):
    sql = f"""
        UPDATE
            reviews
        SET
            rating = {item.rating},
            comment = '{item.comment}',
            booking_id = {item.booking_id},
            passenger_id = {item.passenger_id},
            driver_id = {item.driver_id}
        WHERE
            review_id = {item.review_id}
    """
    try:
        cursor = engine.cursor()
        cursor.execute(sql)
        last_id = cursor.lastrowid
        return {'message': 'success', 'id': last_id}
    except Exception as e:
        return {'message': e}