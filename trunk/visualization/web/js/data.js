var g;

// load data from a csv file
d3.csv("data/2015-all.csv", function(data) {
    // format the data a bit
    var dateFormat = d3.time.format("%Y");
    var parseDate = d3.time.format("%d-%m-%Y %H:%M:%S").parse;
    var numberFormat = d3.format(",f");
});
// feed it through crossfilter
var ndx = crossfilter(data);

var all = ndx.groupAll();

var operationDim = ndx.dimension(function(d) {
    return d.operation;
});

var operationDimGroup = operationDim.group().reduceSum(function(d) {
    return d.amount;
});

var serviceDim = ndx.dimension(function(d) {
    return d.service;
});
var serviceDimGroup = serviceDim.group().reduceSum(function(d) {
    return d.amount;
});


var dateDim = ndx.dimension(function(d) {
    return d.year;
});

var DateDimGroup = dateDim.group().reduceSum(function(d) {
    return d.amount;
});

var failure = dateDim.group().reduceSum(function(d) {
    if (d.status === 'failure') {
        return d.amount;
    } else {
        return 0;
    }
});
var success = dateDim.group().reduceSum(function(d) {
    if (d.status === 'success') {
        return d.amount;
    } else {
        return 0;
    }
});


// TODO clean up this part
// tooltips for row chart
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<span style='color: #f0027f'>" + d.key + "</span> : " + numberFormat(d.value);
    });

// tooltips for pie chart
var pieTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<span style='color: #f0027f'>" + d.data.key + "</span> : " + numberFormat(d.value);
    });

// tooltips for bar chart
var barTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<span style='color: #f0027f'>" + d.data.key + "</span> : " + numberFormat(d.y);
    });


operationPieChart.width(300)
    .height(450)
    .transitionDuration(750)
    .radius(80)
    .innerRadius(40)
    .dimension(operationDim)
    .legend(dc.legend().x(0).y(200).itemHeight(13).gap(5))
    .group(operationDimGroup)
    .colors(operationColorScale)
    .renderLabel(false);
d3.select("#operation-pie-chart > svg > g").attr("transform", "translate(150,100)");

servicePieChart.width(300)
    .height(450)
    .transitionDuration(750)
    .radius(80)
    .innerRadius(40)
    .dimension(serviceDim)
    .group(serviceDimGroup)
    .legend(dc.legend().x(0).y(200).itemHeight(13).gap(5))
    .colors(serviceColorScale)
    .filter(function(d) {
        return d.year = 2015
    })
    .renderLabel(false);

timeDetailsChart.width(900)
    .height(450)
    .transitionDuration(750)
    .margins({
        top: 20,
        right: 20,
        bottom: 50,
        left: 30
    })
    .dimension(dateDim)
    .group(success, "Success")
    .stack(failure, "Failure")
    .x(d3.scale.linear().domain([0, 24]))
    .elasticY(true)
    .centerBar(true)
    .brushOn(false)
    .legend(dc.legend().x(0).y(400).itemHeight(13).gap(5))
    .gap(6)
    .colors(detailColorScale)
    .xUnits(function() {
        return 24;
    })
    .elasticX(false)
    .renderHorizontalGridLines(true)
    .xAxis().ticks(4).tickFormat(d3.format("d"));


timeDetailsChart.yAxis().ticks(3).tickFormat(d3.format("s"));


dc.dataCount(".dc-data-count", "year")
    .dimension(ndx)
    .group(all);


timeDetailsChart.filter(function(d) {
    return d.year = 2015
});
dc.renderAll();

// rotate the x Axis labels

d3.select("#service-pie-chart > svg > g")
    .attr("transform", "translate(150,100)");

d3.select("#operation-pie-chart > svg > g")
    .attr("transform", "translate(150,100)");

d3.selectAll("g.x text")
    .attr("class", "serviceLabel")
    .style("text-anchor", "end")
    .attr("transform", "translate(-10,0)rotate(315)");

d3.selectAll("g.row").call(tip);
d3.selectAll("g.row").on('mouseover', tip.show)
    .on('mouseout', tip.hide);

d3.selectAll(".pie-slice").call(pieTip);
d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
    .on('mouseout', pieTip.hide);

d3.selectAll(".bar").call(barTip);
d3.selectAll(".bar").on('mouseover', barTip.show)
    .on('mouseout', barTip.hide);


resetAllFilters = function() {
    valueDimension.filterAll();
    countryDimension.filterAll();
    statusDimension.filterAll();
    // regionDimension.filterAll();
    dateDimension.filterAll();
    // stateDimension.filterAll();
};

resetBody = function() {
    document.body.innerHTML = '';
};