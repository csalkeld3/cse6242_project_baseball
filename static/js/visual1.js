function initializeD3Visual1() {

    // load data
    var stat_data = d3.csv("/data/data_processed.csv");
    var stat_data_team = d3.csv("/data/data_processed_team.csv");

    // define margin and dimensions for svg
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var width = 1100 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;
    var width_g = 500;
    var color = d3.scaleOrdinal(d3.schemeTableau10);
    var format = d3.format(",d");
    var RateStats = ["AVG", "OPS", "OBP", "SLG"]

    const player_name = d => d.Player
    const team = d => d.Tm

    // define svg & g & table
    var svg = d3.select("#board")
        .attr("width", width)
        .attr("height", height)

    var g_v = svg
        .append("g")
        .attr("id", "visualization")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("width", width_g)
        .attr("height", height)
        .attr("viewBox", [-margin, -margin, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
        .attr("text-anchor", "middle");

    var g_table = svg
        .append("g")
        .attr("id", "table")
        .attr("transform", "translate(" + (margin.left + width_g) + ", " + margin.top + ")")

    // select dropdowns
    var dropdown_player = d3.select("#player")
    var dropdown_stat = d3.select("#stat")

    var selected_player = "Henry Aaron"
    var selected_stat = "AVG"

    Promise.all([stat_data, stat_data_team]).then(function(value) {
            return ready(null, value[0], value[1]);
        }
    );

    function ready(error, stats, stats_team) {
        console.log(stats_team)

        // extract stat names
        var stats_names = stats.columns.slice(3);
        console.log(stats_names)

        // append player names and stats to dropdowns
        for (i = 0; i < stats.length; i++) {
            dropdown_player.append("option")
                .attr("value", stats[i]["Player"])
                .text(stats[i]["Player"]);
        }
        for (i = 0; i < stats_names.length; i++) {
            dropdown_stat.append("option")
                .attr("value", stats_names[i])
                .text(stats_names[i]);
        }

        // event listener for dropdowns
        dropdown_player.on('change', function() {
            selected_player = d3.select(this).property('value');
            updateVisualization(stats, stats_team, selected_player, selected_stat)
        });
        dropdown_stat.on('change', function() {
            selected_stat = d3.select(this).property('value');
            updateVisualization(stats, stats_team, selected_player, selected_stat)
        });

        // create default visualization
        updateVisualization(stats, stats_team, selected_player, selected_stat)
    };

    // function to update visualization
    function updateVisualization(d1, d2, selectedPlayer, selectedStat) {

        console.log(selectedStat)

        if (RateStats.includes(selectedStat)) {
            format = d3.format(".3f");
        }
        else {
            format = d3.format(",d");
        }

        var limited_data = d1.sort(function(a, b)  {
            if(parseFloat(a[selectedStat]) < parseFloat(b[selectedStat])) return 1;
            if(parseFloat(a[selectedStat]) > parseFloat(b[selectedStat])) return -1;
            else return 0;
        }).slice(0, 50);
        console.log(limited_data)

        var bubble = d3.pack()
            .size([width_g, height - margin.top - margin.bottom])
            .padding(3);
        var root = d3.hierarchy({"children": limited_data})
            .sum(d => d[selectedStat]);
        bubble(root);

        console.log(root.leaves())

        // Place each (leaf) node according to the layout’s x and y values.
        g_v.selectAll("g").remove()

        var nodes = g_v
            .selectAll(".node")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y) + ")"; });

        // Add a title
        nodes.append("text")
            .text(d => d.data.Player)
            .attr("font-size", 12)
            .attr("y", -10);
        nodes.append("text")
            .text(d => format(d.value))
            .attr("font-size", 12)
            .attr("y", 10);

        // Add a filled circle.
        nodes.append("circle")
            .attr("fill-opacity", 0.7)
            .attr("r", d => d.r)
            .attr("fill", "lightgray");

    };
    
}