json = JSON.parse("[" +
    "{\"value\":\"44\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"T\",\"id\":1,\"region\":\"South\",\"date\":\"2012-05-25T16:10:09Z\"}, " +
    "{\"value\":\"22\",\"nvalue\":\"-2\",\"countrycode\":\"US\",\"state\":\"Colorado\",\"status\":\"F\",\"id\":2,\"region\":\"West\",\"date\":\"2012-06-10T16:10:19Z\"}, " +
    "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Delaware\",\"status\":\"T\",\"id\":3,\"region\":\"West\",\"date\":\"2012-08-10T16:20:29Z\"}, " +
    "{\"value\":\"44\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":4,\"region\":\"South\",\"date\":\"2012-07-01T16:10:39Z\"}, " +
    "{\"value\":\"55\",\"nvalue\":\"-5\",\"countrycode\":\"CA\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":5,\"region\":\"Central\",\"date\":\"2012-06-10T16:10:49Z\"}, " +
    "{\"value\":\"66\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":6,\"region\":\"West\",\"date\":\"2012-06-08T16:10:59Z\"}, " +
    "{\"value\":\"22\",\"nvalue\":\"10\",\"countrycode\":\"CA\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":7,\"region\":\"East\",\"date\":\"2012-07-10T16:10:09Z\"}, " +
    "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"F\",\"id\":8,\"region\":\"Central\",\"date\":\"2012-07-10T16:10:19Z\"}, " +
    "{\"value\":\"44\",\"nvalue\":\"2\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"T\",\"id\":9,\"region\":\"Central\",\"date\":\"2012-08-10T16:30:29Z\"}, " +
    "{\"value\":\"55\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"Oklahoma\",\"status\":\"F\",\"id\":10,\"region\":\"\",\"date\":\"2012-06-10T16:10:39Z\"}" +
    "]");


var dataCleaner = function(e) {
    e.dd = d3.time.format.iso.parse(e.date);
};
            var dateFormat = d3.time.format("%Y");
            var parseDate = d3.time.format("%d-%m-%Y %H:%M:%S").parse;
            var numberFormat = d3.format(",f");

// load data from a csv file

/*
d3.csv("data/2015-all.csv", function (d) {
  return {
    datetime: new Date(+d.year, +d.month, +d.day, +d.hour), 
    year: +d.year,
    service: d.service,
    operation: d.operation,
    status: d.status,
    sum: +d.sum,
    amount: +d.amount,
    min: +d.min,
    max: +d.max,
    sumsqr: +d.sumsqr
  };
}, function(error, rows) {
  console.log(rows);
});

data = rows;
var ndx = crossfilter(data);

var all = ndx.groupAll();
//d3.json("data/201507.json", function (json2) {}

*/

json.forEach(dataCleaner);


data = crossfilter(json);

groupAll = data.groupAll();


dateFormat = d3.time.format("%Y-%m-%d");

valueDimension = data.dimension(function(d) {
    return d.value;
});
valueGroup = valueDimension.group();


countryDimension = data.dimension(function(d) {
    return d.countrycode;
});
countryGroup = countryDimension.group();

statusDimension = data.dimension(function(d) {
    return d.status;
});
statusGroup = statusDimension.group();
statusMultiGroup = statusGroup.reduce(
    //add
    function(p, v) {
        ++p.count;
        p.value += +v.value;
        return p;
    },
    //remove
    function(p, v) {
        --p.count;
        p.value -= +v.value;
        return p;
    },
    //init
    function() {
        return {count:0, value:0};
    }
);



dateDimension = data.dimension(function(d) {
    return d3.time.day(d.dd);
});

dateGroup = dateDimension.group();

/*failureGroup = dateGroup.group().reduceSum(function(d) {if (d.status === 'failure') {return d.amount;}else{return 0;}});
successGroup = dateGroup.group().reduceSum(function(d) {if (d.status === 'success') {return d.amount;}else{return 0;}});*/

dateValueSumGroup = dateDimension.group().reduceSum(function(d){return d.value;});
dateIdSumGroup = dateDimension.group().reduceSum(function(d){return d.id;});
dateFixedSumGroup = dateDimension.group().reduceSum(function(d){return 5;});
dateNegativeValueSumGroup = dateDimension.group().reduceSum(function(d){return d.nvalue;});



resetAllFilters = function() {
    valueDimension.filterAll();
    countryDimension.filterAll();
    statusDimension.filterAll();
    // regionDimension.filterAll();
    dateDimension.filterAll();
    // stateDimension.filterAll();
};

resetBody = function(){
    document.body.innerHTML = '';
};
