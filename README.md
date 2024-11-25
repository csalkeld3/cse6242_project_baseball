# cse6242_project_baseball
Baseball Analytics Code Repository for CSE 6242<br>
Report Link: https://docs.google.com/document/d/1-rTle3RRmgyE7Xz_NOtWsTj7zD2ARxElgtZ8XDLGei0/edit?tab=t.0<br>
Poster Link: https://docs.google.com/presentation/d/1JUh7OZUweKOGnhkklK5NAfE5MOqxQtS-HNcv6swWElk/edit#slide=id.p

To begin, view "Data_processing.ipynb" to view the data cleaning script for this project.<br>
Using that code, we compressed 700MB raw data into 2.5MB "data_processed.csv".<br>
To see how we constructed analysis model for predicting "Runs per PA", view "PCA_updated_11-22.ipynb".<br>
The result of modeling is shown on "Result.csv".

For finding players with similar metrics, "Result.csv" contained too massive information.<br>
Therefore, we only used 4 advanced metrics from the most recent season for tanimoto coefficient analysis.<br>
The output csv "player_metrics_most_recent_season.csv" was used to create a graph... Chloe adding more soon
