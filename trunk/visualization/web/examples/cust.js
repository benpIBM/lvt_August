<script type="text/javascript">

var waterTreatmentLandingDonut   = dc.pieChart("#water-treatment-landing-donut"),
    waterTreatmentLandngStackedChart  = dc.barChart("#water-treatment-landing-stacked-chart"),
    waterTreatmentDeviceChart = dc.rowChart("#water-treatment-device-chart");

var waterTreatmentLandingDonut1   = dc.pieChart("#water-treatment-landing-donut1"),
    waterTreatmentLandngStackedChart1  = dc.barChart("#water-treatment-landing-stacked-chart1"),
    waterTreatmentDeviceChart1 = dc.rowChart("#water-treatment-device-chart1");

var waterTreatmentLandingDonut2   = dc.pieChart("#water-treatment-landing-donut2"),
    waterTreatmentLandngStackedChart2  = dc.barChart("#water-treatment-landing-stacked-chart2"),
    waterTreatmentDeviceChart2 = dc.rowChart("#water-treatment-device-chart2");

var waterTreatmentLandingDonut3   = dc.pieChart("#water-treatment-landing-donut3"),
    waterTreatmentLandngStackedChart3  = dc.barChart("#water-treatment-landing-stacked-chart3"),
    waterTreatmentDeviceChart3 = dc.rowChart("#water-treatment-device-chart3");

// use static or load via d3.csv("measurementData.csv", function(error, measurementData) {/* do stuff */});
var measurementData = [
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '10', Year: 2011, Month: 01, Day: 1, Hour: 0,Unit: 'ph'},  // low
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '20', Year: 2011, Month: 01, Day: 1, Hour: 6,Unit: 'ph'},  // low
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '30', Year: 2011, Month: 01, Day: 1, Hour: 12,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '35', Year: 2011, Month: 01, Day: 1, Hour: 18,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '40', Year: 2011, Month: 01, Day: 1, Hour: 24,Unit: 'ph'}, // high

    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '45', Year: 2011, Month: 01, Day: 2, Hour: 0,Unit: 'ph'},  // high
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '45', Year: 2011, Month: 01, Day: 2, Hour: 6,Unit: 'ph'},  // high 
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '30', Year: 2011, Month: 01, Day: 2, Hour: 12,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '25', Year: 2011, Month: 01, Day: 2, Hour: 18,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '28', Year: 2011, Month: 01, Day: 2, Hour: 24,Unit: 'ph'}, // ok

    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '25', Year: 2011, Month: 01, Day: 3, Hour: 0,Unit: 'ph'},  // high
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '35', Year: 2011, Month: 01, Day: 3, Hour: 6,Unit: 'ph'},  // high 
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '34', Year: 2011, Month: 01, Day: 3, Hour: 12,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '33', Year: 2011, Month: 01, Day: 3, Hour: 18,Unit: 'ph'}, // ok
    {Name: 'Ph Sensor e1',   Type: 'A', Measurement: '34', Year: 2011, Month: 01, Day: 3, Hour: 24,Unit: 'ph'}, // ok

    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '14.3', Year: 2011, Month: 01, Day: 1, Hour: 0,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '23.1', Year: 2011, Month: 01, Day: 1, Hour: 6,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '25.4', Year: 2011, Month: 01, Day: 1, Hour: 12,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '35.1', Year: 2011, Month: 01, Day: 1, Hour: 18,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '40.4', Year: 2011, Month: 01, Day: 1, Hour: 24,Unit: 'c'},

    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '41.4', Year: 2011, Month: 01, Day: 2, Hour: 0,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '42.4', Year: 2011, Month: 01, Day: 2, Hour: 6,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '46.3', Year: 2011, Month: 01, Day: 2, Hour: 12,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '43.3', Year: 2011, Month: 01, Day: 2, Hour: 18,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '40.3', Year: 2011, Month: 01, Day: 2, Hour: 24,Unit: 'c'},

    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '41.4', Year: 2011, Month: 01, Day: 3, Hour: 0,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '40.4', Year: 2011, Month: 01, Day: 3, Hour: 6,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '39.3', Year: 2011, Month: 01, Day: 3, Hour: 12,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '38.3', Year: 2011, Month: 01, Day: 3, Hour: 18,Unit: 'c'},
    {Name: 'Temp Sensor a1', Type: 'Temp', Measurement: '38.5', Year: 2011, Month: 01, Day: 3, Hour: 24,Unit: 'c'},

    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '0.1',   Year: 2011, Month: 01, Day: 1, Hour: 0,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '1.20', Year: 2011, Month: 01, Day: 1, Hour: 6,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '3.1',  Year: 2011, Month: 01, Day: 1, Hour: 12,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '6.20', Year: 2011, Month: 01, Day: 1, Hour: 18,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '8.20', Year: 2011, Month: 01, Day: 1, Hour: 24,Unit: 'psi'},

    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '9.1',  Year: 2011, Month: 01, Day: 2, Hour: 0,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '10.20', Year: 2011, Month: 01, Day: 2, Hour: 6,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '10.1',  Year: 2011, Month: 01, Day: 2, Hour: 12,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '8.20', Year: 2011, Month: 01, Day: 2, Hour: 18,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '7.20', Year: 2011, Month: 01, Day: 2, Hour: 24,Unit: 'psi'},

    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '6.1',  Year: 2011, Month: 01, Day: 3, Hour: 0,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '6.20', Year: 2011, Month: 01, Day: 3, Hour: 6,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '5.1',  Year: 2011, Month: 01, Day: 3, Hour: 12,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '5.20', Year: 2011, Month: 01, Day: 3, Hour: 18,Unit: 'psi'},
    {Name: 'Pressure Sensor a1', Type: 'Pressure', Measurement: '4.20', Year: 2011, Month: 01, Day: 3, Hour: 24,Unit: 'psi'},

    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '114.80', Year: 2011, Month: 01, Day: 1, Hour: 0,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '115.40', Year: 2011, Month: 01, Day: 1, Hour: 6,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '126.10', Year: 2011, Month: 01, Day: 1, Hour: 12,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '127.560', Year: 2011, Month: 01, Day: 1, Hour: 18,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '128.120', Year: 2011, Month: 01, Day: 1, Hour: 24,Unit: 'l'},

    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '128.80', Year: 2011, Month: 01, Day: 2, Hour: 0,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '128.40', Year: 2011, Month: 01, Day: 2, Hour: 6,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '138.10', Year: 2011, Month: 01, Day: 2, Hour: 12,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '136.560', Year: 2011, Month: 01, Day: 2, Hour: 18,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '236.120', Year: 2011, Month: 01, Day: 2, Hour: 24,Unit: 'l'},

    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '236.80', Year: 2011, Month: 01, Day: 3, Hour: 0,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '235.40', Year: 2011, Month: 01, Day: 3, Hour: 6,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '134.10', Year: 2011, Month: 01, Day: 3, Hour: 12,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '133.560', Year: 2011, Month: 01, Day: 3, Hour: 18,Unit: 'l'},
    {Name: 'Water Volume Sensor a1', Type: 'Volume', Measurement: '133.120', Year: 2011, Month: 01, Day: 3, Hour: 24,Unit: 'l'},


    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '4', Year: 2011, Month: 01, Day: 1, Hour: 0,Unit: 'mps'},    
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '6', Year: 2011, Month: 01, Day: 1, Hour: 6,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '7', Year: 2011, Month: 01, Day: 1, Hour: 12,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8', Year: 2011, Month: 01, Day: 1, Hour: 18,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8.1', Year: 2011, Month: 01, Day: 1, Hour: 24,Unit: 'mps'},

    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8.3', Year: 2011, Month: 01, Day: 2, Hour: 0,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8.5', Year: 2011, Month: 01, Day: 2, Hour: 6,Unit: 'mps'},    
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8.9', Year: 2011, Month: 01, Day: 2, Hour: 12,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '9.5', Year: 2011, Month: 01, Day: 2, Hour: 18,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '8.7', Year: 2011, Month: 01, Day: 2, Hour: 24,Unit: 'mps'},

    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '7.5', Year: 2011, Month: 01, Day: 3, Hour: 0,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '6.2', Year: 2011, Month: 01, Day: 3, Hour: 6,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '5.0', Year: 2011, Month: 01, Day: 3, Hour: 12,Unit: 'mps'},    
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '5.6', Year: 2011, Month: 01, Day: 3, Hour: 18,Unit: 'mps'},
    {Name: 'Flow Rate Sensor a1', Type: 'Flow', Measurement: '4.5', Year: 2011, Month: 01, Day: 3, Hour: 24,Unit: 'mps'}
    ];

    var ruleData = [
    {Name: 'Ph High',   Type: 'Range', From: '40',  To: '70', Unit: 'ph'},
    {Name: 'Ph Ok',     Type: 'Range', From: '50',  To: '40', Unit: 'ph'},
    {Name: 'Ph Low',    Type: 'Range', From: '0',   To: '50', Unit: 'ph'},

    {Name: 'Ph High',   Type: 'Range', From: '40',  To: '70', Unit: 'c'},
    {Name: 'Ph Ok',     Type: 'Range', From: '34',  To: '39', Unit: 'c'},
    {Name: 'Ph Low',    Type: 'Range', From: '0',   To: '34', Unit: 'c'},

    {Name: 'Ph High',   Type: 'Range', From: '200',  To: '400', Unit: 'l'},
    {Name: 'Ph Ok',     Type: 'Range', From: '100',  To: '200', Unit: 'l'},
    {Name: 'Ph Low',    Type: 'Range', From: '0',   To: '100', Unit: 'l'},

    {Name: 'Ph High',   Type: 'Range', From: '200',  To: '400', Unit: 'psi'},
    {Name: 'Ph Ok',     Type: 'Range', From: '100',  To: '200', Unit: 'psi'},
    {Name: 'Ph Low',    Type: 'Range', From: '0',   To: '100', Unit: 'ps1'},

    {Name: 'Ph High',   Type: 'Range', From: '9',  To: '15', Unit: 'mps'},
    {Name: 'Ph Ok',     Type: 'Range', From: '7',  To: '9', Unit: 'mps'},
    {Name: 'Ph Low',    Type: 'Range', From: '0',   To: '6', Unit: 'mps'}
    ];


// normalize/parse data
measurementData.forEach(function(d) {
    d.Measurement = d.Measurement.match(/\d+/);
});

// set crossfilter
var ndx = crossfilter(measurementData),
    yearDim  = ndx.dimension(function(d) {return +d.Year;}),
    monthDim  = ndx.dimension(function(d) {return +d.Month;}),
    dayDim  = ndx.dimension(function(d) {return +d.Day;}),
    hourDim  = ndx.dimension(function(d) {return +d.Hour;}),

    measurementDim = ndx.dimension(function(d) {return Math.floor(d.Measurement/10);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),

    measurementPerYear = yearDim.group().reduceSum(function(d) {return +d.Measurement;}),
    measurementPerMonth = monthDim.group().reduceSum(function(d) {return +d.Measurement;}),
    measurementPerDay = dayDim.group().reduceSum(function(d) {return +d.Measurement;}),
    measurementPerHour = hourDim.group().reduceSum(function(d) {return +d.Measurement;}),

    measurementPerName = nameDim.group().reduceSum(function(d) {return +d.Measurement;}),
    measurementHist    = measurementDim.group().reduceCount();


// landing page 
waterTreatmentLandingDonut
    .width(200).height(200)
    .dimension(yearDim)
    .group(measurementPerYear)
    .innerRadius(50);

waterTreatmentLandngStackedChart
    .width(300).height(200)
    .dimension(measurementDim)
    .group(measurementHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true);

waterTreatmentLandngStackedChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
waterTreatmentLandngStackedChart.yAxis().ticks(2);

waterTreatmentDeviceChart
    .width(350).height(200)
    .dimension(nameDim)
    .group(measurementPerName)
    .elasticX(true);


/// month 


waterTreatmentLandingDonut1
    .width(200).height(200)
    .dimension(monthDim)
    .group(measurementPerMonth)
    .innerRadius(50);

waterTreatmentLandngStackedChart1
    .width(300).height(200)
    .dimension(measurementDim)
    .group(measurementHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true);

waterTreatmentLandngStackedChart1.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
waterTreatmentLandngStackedChart1.yAxis().ticks(2);

waterTreatmentDeviceChart1
    .width(350).height(200)
    .dimension(nameDim)
    .group(measurementPerName)
    .elasticX(true);


// day

waterTreatmentLandingDonut2
    .width(200).height(200)
    .dimension(dayDim)
    .group(measurementPerDay)
    .innerRadius(50);

waterTreatmentLandngStackedChart2
    .width(300).height(200)
    .dimension(measurementDim)
    .group(measurementHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true);

waterTreatmentLandngStackedChart2.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
waterTreatmentLandngStackedChart2.yAxis().ticks(2);

waterTreatmentDeviceChart2
    .width(350).height(200)
    .dimension(nameDim)
    .group(measurementPerName)
    .elasticX(true);

// hour

waterTreatmentLandingDonut3
    .width(200).height(200)
    .dimension(hourDim)
    .group(measurementPerHour)
    .innerRadius(50);

waterTreatmentLandngStackedChart3
    .width(300).height(200)
    .dimension(measurementDim)
    .group(measurementHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true);

waterTreatmentLandngStackedChart3.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
waterTreatmentLandngStackedChart3.yAxis().ticks(2);

waterTreatmentDeviceChart3
    .width(350).height(200)
    .dimension(nameDim)
    .group(measurementPerName)
    .elasticX(true);


dc.renderAll();

</script>