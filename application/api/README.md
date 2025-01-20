# API Documentation

## Overview

This API provides endpoints for wine classification and ranking. The classification endpoint uses a neural network model to classify wines based on the provided harmonize parameter. The ranking endpoint returns a mock ranking response based on the provided attributes.

## Requirements

- Python 3.8+
- FastAPI
- Uvicorn

## Running the API
Run this configurations in the root folder of project, e.g MEIA_ISEP_TEAM7_2024_2025_Challenge_2
1. Install the dependencies
    ```shell
    pip install fastapi uvicorn
    ```
2. Start the FastAPI server using Uvicorn:
    ```sh
    uvicorn application.api.main:app --reload
    ```

2. The API will be available at `http://localhost:8000`.

## Endpoints

### Classification Endpoint

- **URL:** `/classification`
- **Method:** `GET`
- **Query Parameter:**
  - `harmonize` (string): The parameter to classify the wine and grape.

- **Example Request:**
    ```sh
    curl --location 'http://localhost:8000/classification?harmonize=meat'
    ```

### Ranking Endpoint

- **URL:** `/ranking`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  - `attribute` (string): Example attribute.
  - `weight` (number): Example weight.
  - `option` (string): Example option.

- **Example Request:**
    ```sh
  curl --location 'http://localhost:8000/ranking' \
  --header 'Content-Type: application/json' \
  --data '[
      {
          "attribute": "Price",
          "weight": 4,
          "option": "higher"
      },
      {
          "attribute": "Rating",
          "weight": 1,
          "option": "higher"
      },
      {
          "attribute": "Score",
          "weight": 1,
          "option": "higher"
      }
  ]'
    ```

## Testing

Use the provided `curl` commands to test the API endpoints. Ensure the server is running before making the requests.