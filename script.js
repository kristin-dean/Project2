

//******************************read data file*****************************//
var gradesP = d3.json("classData.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  console.log("Working");
  drawChart(d);
},
function(err)
{
  console.log(err);
});

var drawChart = function(d)
  {
    d[0].quizes.forEach(function(d) {d.type="quiz"});
    d[0].final.forEach(function(d) {d.type="final"});
    d[0].test.forEach(function(d) {d.type="test"});
    d[0].homework.forEach(function(d) {d.type="homework"});
    var finalG = d[0].final;
    list2 = finalG.concat(d[0].homework);
    list3 = list2.concat(d[0].quizes);
    allGrades = list3.concat(d[0].test);
    allGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});
    console.log(allGrades);

     var screen =
      {
        width:850,
        height:500
      };
      var svg = d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height);

      var margins =
      {
        top:10,
        bottom:40,
        left:45,
        right:75
      };

      var width = screen.width - margins.left - margins.right;
      var height = screen.height - margins.top - margins.bottom;
      var xScale = d3.scaleLinear()
        .domain([0,40])
        .range([0,width]);
      var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([height,0]);
      var plotLand = svg.append("g")
          .classed("plot",true)
          .attr("transform","translate("+margins.left+","+margins.top+")");
     var colors = d3.scaleOrdinal(d3.schemeAccent);
      var students = plotLand.selectAll("g")
          .data(allGrades)
          .enter()
          .append("g")
      students.selectAll("circle")
          .data(allGrades)
          .enter()
          .append("circle")
          .attr("cx",function(d,i)
          {
            return xScale(d.day);
          })
          .attr("cy",function(d){return yScale(d.percent);})
          .attr("r", function(d) {
            if (d.type == "quiz") {
              return 6;}
            else if (d.type == "homework") {
              return 6;}
            else if (d.type == "test") {
              return 12;}
            else if (d.type == "final") {
              return 15;}})
          .attr("fill", function(d) {
            if (d.type == "quiz") {
              return "blue";}
            else if (d.type == "homework") {
              return "green";}
            else if (d.type == "test") {
              return "purple";}
            else if (d.type == "final") {
              return "red";}
            });

          var xAxis  = d3.axisBottom(xScale);

        svg.append("g")
          .classed(xAxis,true)
          .call(xAxis)
          .attr("transform","translate("+margins.left+","
          +(margins.top+ height + 15)+")"
        );
        /*
      var legend = svg.append("g")
        .classed("legend",true)
        .attr("transform","translate("+
        (width + margins.left) + "," + margins.top+")");
        var legendLines = legend.selectAll("g")
            .data(allGrades)
            .enter()
            .append("g")
            .classed("legendLines",true)
            .attr("transform",function(d,i)
            {
              return "translate(0," + (i*20 +5) +")";}
          )
        legendLines.append("rect")
                .attr("x", 0)
                .attr("y", function(d,i){return i*20;})
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill",function(d) {return colors(d.name);})
        legendLines.append("text")
              .attr("x",20)
              .attr("y",function(d,i){return i*20+10;})
              .text(function(d){return d.name;});*/
      var yAxis  = d3.axisLeft(yScale);
        svg.append("g")
          .classed(yAxis,true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left-20)+","
          + 5 +")");
      }
