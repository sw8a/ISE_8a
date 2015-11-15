var data1 = {
labels: ["January", "February", "March", "April", "May", "June", "July"],
datasets: [
    {
        label: "Ideal Weight",
        fillColor: "rgba(206,245,206,0.2)",
        strokeColor: "rgba(133,230,133,1)",
        pointColor: "rgba(0,204,0,1)",
        pointStrokeColor: "#FFF",
        pointHighlightFill: "#FFF",
        pointHighlightStroke: "rgba(0,204,0,1)",
        data: [100, 90, 81, 72.9, 65.6, 59.1, 53.1]
    },
    {
        label: "Patient Progress",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "#6399CC",
        pointColor: "#6399CC",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#6399CC",
        data: [100, 88, 84, 80, 74, 66, 60]
    }
]
};

var lineOptions = {
	animationEasing: "linear",
	scaleStartValue: 50,
	//tooltipTemplate: "<%=label%>: %><%= value %>"
	multiTooltipTemplate: "<%=datasetLabel%> : <%= value %> lbs"

};

var canvas = document.getElementById("testChartLine");
var ctx = canvas.getContext("2d");
var lineChart = new Chart(ctx).Line(data1, lineOptions);


var data2 = [
	{
		value: 6.9, 
		color: "#1A4B68"
	},
	
	{
		value: 40,
		color: "#6399CC"
	}

];

var canvas2 = document.getElementById("testChartDoughnut");
var ctx2 = canvas2.getContext("2d");
new Chart(ctx2).Doughnut(data2);
