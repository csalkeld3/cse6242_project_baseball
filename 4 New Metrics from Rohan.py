#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas as pd

# Load data
file_path = r"C:\Users\RohanKohli\Downloads\mlbbatting1901-2021.csv"
df = pd.read_csv(file_path)

# Filter for players with at least 100 at-bats
df_filtered = df.groupby('ID').filter(lambda x: x['AB'].sum() >= 100)

# 1. WPA in High-Leverage Situations
high_leverage_threshold = 1.5  # Define high-leverage threshold for leverage index (aLI)
high_leverage = df_filtered[df_filtered['aLI'] > high_leverage_threshold]  # Filter for high-leverage situations

# Calculate total WPA in high-leverage situations for each player
high_leverage_wpa = high_leverage.groupby('ID')['WPA'].sum().reset_index()
high_leverage_wpa.columns = ['ID', 'High-Leverage WPA']

# Optional: Normalize by total high-leverage plate appearances
high_leverage_pa = high_leverage.groupby('ID')['PA'].sum().reset_index()
high_leverage_wpa = high_leverage_wpa.merge(high_leverage_pa, on='ID')
high_leverage_wpa['WPA per High-Leverage PA'] = high_leverage_wpa['High-Leverage WPA'] / high_leverage_wpa['PA']

# 2. Streakiness Score
# Sort data by player and date for rolling calculations
df_filtered = df_filtered.sort_values(['ID', 'Date'])
# Calculate rolling standard deviation of hits over 10-game windows for each player
df_filtered['Hits_Rolling_Std'] = df_filtered.groupby('ID')['H'].transform(lambda x: x.rolling(10, min_periods=1).std())
# Calculate the average streakiness score per player
streakiness_score = df_filtered.groupby('ID')['Hits_Rolling_Std'].mean().reset_index()
streakiness_score.columns = ['ID', 'Streakiness Score']

# 3. Hard-Hit Efficiency
# Calculate Hard-Hit Efficiency as extra-base hits per at-bat
df_filtered['Extra_Base_Hits'] = df_filtered['2B'] + df_filtered['3B'] + df_filtered['HR']
hard_hit_efficiency = df_filtered.groupby('ID').apply(
    lambda x: x['Extra_Base_Hits'].sum() / x['AB'].sum() if x['AB'].sum() > 0 else 0
).reset_index()
hard_hit_efficiency.columns = ['ID', 'Hard-Hit Efficiency']

# 4. Speed Score
# Calculate Speed Score as (SB + 2B + 3B) per plate appearance
df_filtered['Speed_Components'] = df_filtered['SB'] + df_filtered['2B'] + df_filtered['3B']
speed_score = df_filtered.groupby('ID').apply(
    lambda x: x['Speed_Components'].sum() / x['PA'].sum() if x['PA'].sum() > 0 else 0
).reset_index()
speed_score.columns = ['ID', 'Speed Score']

# Combine all metrics into a single DataFrame for players with at least 100 at-bats
player_metrics = high_leverage_wpa[['ID', 'High-Leverage WPA', 'WPA per High-Leverage PA']].merge(
    streakiness_score, on='ID'
).merge(
    hard_hit_efficiency, on='ID'
).merge(
    speed_score, on='ID'
)

#PlayerMetrics Summarized 
print(player_metrics.head())


# In[ ]:




