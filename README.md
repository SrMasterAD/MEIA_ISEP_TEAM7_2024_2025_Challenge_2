<div align="center">

# Wine Pairing

A web app that suggests a wine for what you're eating. You pick the dish and it predicts the wine type, the grape and a fair price, then ranks real wines by what matters most to you.

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Vite-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

[Objectives](#objectives) · [Features](#features) · [Architecture](#architecture) · [Models and ranking](#models-and-ranking) · [Team](#team)

<sub>Challenge 2 · Master's in Artificial Intelligence Engineering · <a href="https://www.isep.ipp.pt">ISEP</a>, Porto · 2024–25</sub>

</div>


## Objectives

The challenge was to help someone choose a wine using machine learning and multi-criteria decision-making on real wine data. These were the goals:

- [x] Clean and prepare public wine datasets, including X-Wines with about 100,000 wines and the dishes each one goes with
- [x] Predict the wine type and the grape from the dish (classification), and a price from those two (regression)
- [x] Rank real wines by the buyer's own priorities with multi-criteria decision methods
- [x] Compare several models and methods for each step, and keep the ones that worked best
- [x] Serve the trained models through an API and a simple web app



## Features

| | Feature | What it does |
|:-:| --- | --- |
| 🍽️ | **Pairing prediction** | Pick one of nine food categories (meat, poultry, fish and seafood, cheese, pasta, spicy food and more) and get the wine type, the grape and an expected price |
| 📊 | **Wine ranking** | Give price, alcohol, acidity, body and rating a weight, choose whether each should be as high or as low as possible, and get a top 10 of real wines with their winery and price |

## Architecture

The notebooks are where the data was explored and the models were trained. The app only loads the finished models:

```
Jupyter notebooks  →  trained models (.pkl)
React web app  →  FastAPI  →  trained models  +  TOPSIS ranking
```

The web app is React and TypeScript built with Vite and Tailwind, and it calls two endpoints. `/prediction` takes the dish, runs the wine type and grape classifiers, then feeds both answers into the price model. `/ranking` takes the weights and directions for each criterion and returns the top 10 wines. Each endpoint has its own controller and service, so the models and the ranking method can change without touching the app.

## Models and ranking

The dishes in X-Wines are very specific, so we grouped them into nine food categories and one-hot encoded them. Grapes were binary-encoded to keep the number of columns down. Some wine types and grapes are far more common than others, so we tried SMOTE, undersampling, SMOTEENN and class weights to stop the models from always guessing the common ones.

For the wine type and the grape we compared gradient boosting, random forests and neural networks. Wine type reached about 72% accuracy. The grape stayed hard to predict from the dish alone, which makes sense: a dish says a lot about red or white, but little about the exact grape. For the price we compared linear, polynomial and support vector regression, and the app uses the polynomial model.

For the ranking we compared three decision methods: AHP, which turns pairwise comparisons into weights and checks they are consistent; ELECTRE, which compares wines two at a time; and TOPSIS, which scores each wine by how close it is to an ideal wine and how far from the worst one. The app uses TOPSIS because it handles any set of weights directly and gives a full ranking.

## Project structure

```
application/
├── api/               FastAPI app: prediction and ranking endpoints, services and trained models
└── frontend/          React + TypeScript web app
notebooks/
├── Classification/    wine type and grape models (gradient boosting, random forests, neural networks)
├── Regression/        price models (linear, polynomial, SVR)
└── MCDM/              AHP, TOPSIS and ELECTRE
datasets/              raw and cleaned wine datasets
```

## Team

<table align="center">
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/Marco-Nobrega-Andrade"><img src="https://github.com/Marco-Nobrega-Andrade.png?size=200" width="100" alt="Marco Andrade"/></a><br>
      <b>Marco Andrade</b><br>
      <a href="https://github.com/Marco-Nobrega-Andrade">@Marco-Nobrega-Andrade</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/SrMasterAD"><img src="https://github.com/SrMasterAD.png?size=200" width="100" alt="David Dias"/></a><br>
      <b>David Dias</b><br>
      <a href="https://github.com/SrMasterAD">@SrMasterAD</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/ricardoham"><img src="https://github.com/ricardoham.png?size=200" width="100" alt="Ricardo Manoel"/></a><br>
      <b>Ricardo Manoel</b><br>
      <a href="https://github.com/ricardoham">@ricardoham</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/1200833Rui"><img src="https://github.com/1200833Rui.png?size=200" width="100" alt="Rui Ribeiro"/></a><br>
      <b>Rui Ribeiro</b><br>
      <a href="https://github.com/1200833Rui">@1200833Rui</a>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/HS2000PT"><img src="https://github.com/HS2000PT.png?size=200" width="100" alt="Henrique Santos"/></a><br>
      <b>Henrique Santos</b><br>
      <a href="https://github.com/HS2000PT">@HS2000PT</a>
    </td>

  </tr>
</table>
