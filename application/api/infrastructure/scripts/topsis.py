import numpy as np
import pandas as pd
from ftfy import fix_text


def get_ranking (weights, is_benefit):
    weights = np.array(weights)
    weights = (weights - 1) / 8

    for i in range(len(weights)):
        if weights[i] == 0:
            weights[i] = 0.0001

    is_benefit = np.array(is_benefit)

    df = pd.read_csv('datasets/ranking_pre_processed_dataset.csv')

    decision_matrix = df[['Price', 'ABV', 'Acidity', 'Body', 'Ratings']].values

    weights = weights / sum(weights)
    weighted_matrix = decision_matrix * weights


    ideal_solution = np.where(is_benefit, np.max(weighted_matrix, axis=0),
                            np.min(weighted_matrix, axis=0))

    negative_ideal_solution = np.where(is_benefit, 
                                    np.min(weighted_matrix, axis=0),
                                    np.max(weighted_matrix, axis=0))

    distances_to_ideal = np.sqrt(np.sum((weighted_matrix - ideal_solution)**2, axis=1))
    distances_to_negative = np.sqrt(np.sum((weighted_matrix - negative_ideal_solution)**2, axis=1))

    closeness_coefficient = distances_to_negative / (distances_to_ideal + distances_to_negative)

    df['TOPSIS_Score'] = closeness_coefficient
    df['Rank'] = df['TOPSIS_Score'].rank(ascending=False)
    df = df.sort_values(by='Rank')

    return match_datasets(df)


def match_datasets(topsis_dataset):
    original_dataset = pd.read_csv('datasets/PLNTD_dataset.csv')

    for column in original_dataset.columns:
        if original_dataset[column].dtype == 'object':
            original_dataset[column] = original_dataset[column].apply(lambda x: fix_text(x) if isinstance(x, str) else x)
    

    matched_entries = pd.merge(
        topsis_dataset,
        original_dataset,
        left_index=True, right_index=True
    )
    filtered_entries = matched_entries[['WineName_x', 'WineryName_x', 'ABV_y', 'Ratings_y', 'Body_y', 'Price_y', 'Acidity_y', 'Rank']]
    filtered_entries.rename(columns=lambda x: x.replace('_y', '') if '_y' in x else x, inplace=True)
    filtered_entries.rename(columns=lambda x: x.replace('_x', '') if '_x' in x else x, inplace=True)


    filtered_entries['Price'] = filtered_entries['Price'].str.replace('£', '', regex=False)
    filtered_entries['Price'] = filtered_entries['Price'].str.replace(' per bottle', '', regex=False)
    filtered_entries['Price'] = filtered_entries['Price'].astype(float) * 1.15
    filtered_entries['Price'] = filtered_entries['Price'].apply(lambda x: f"{x:.2f}€") 
    filtered_entries['ABV'] = filtered_entries['ABV'].str.replace('ABV ', '', regex=False)
    filtered_entries['Rank'] = filtered_entries['Rank'].astype(int)

    return filtered_entries
