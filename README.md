# cse6242_project_baseball
Baseball Analytics Code Repository for CSE 6242<br>
Report Link: https://docs.google.com/document/d/1-rTle3RRmgyE7Xz_NOtWsTj7zD2ARxElgtZ8XDLGei0/edit?tab=t.0<br>
Poster Link: https://docs.google.com/presentation/d/1JUh7OZUweKOGnhkklK5NAfE5MOqxQtS-HNcv6swWElk/edit#slide=id.p

To begin, view "Data_processing.ipynb" to view the data cleaning script for this project.<br>
Using that code, we compressed 700MB raw data into 2.5MB "data_processed.csv".<br>
To see how we constructed the analysis model for predicting "Runs per PA", view "PCA_updated_11-22.ipynb".<br>
The result of modeling is shown on "Result.csv". An extension to this modeling script can be seen in "ModelingCode_AdvancedBaseballStatistics_CSE6242".<br>

For finding players with similar metrics, "Result.csv" contained too much information to meaningfully create player pairs in a single visualization.<br>
Therefore, we only used 4 advanced metrics from the most recent season for Tanimoto Coefficient analysis, as seen in "player_metrics_most_recent_season.csv" (a filtered version of "data_processed.csv"). Please refer to "player_graph.ipynb" to see how the Tanimoto coefficient was calculated based on these metrics. <br>
This file output "player_graph.csv", which was used to make "player_similarity_matrix.png", "player_similarity_matrix_2.png", and "NodeGraph.png".

All other visualizations created are included in this repository in the form of PNG files: "DashboardView.PNG", "Player Game Stats.PNG", and "WeeklyPredictions.PNG". These files use the "Result.csv" and "data_processed.csv" as inputs.
