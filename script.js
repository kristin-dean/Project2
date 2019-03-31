

//******************************read 
file*****************************//
var gradesP = d3.json("classData.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  console.log("Working");
  firstFunction(d);
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
    console.log(allGrades);
    
     var screen =
      {
        width:widths,
        height:heights
      };
      var svg = d3.select(tag)
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
        .domain([0,20])
        .range([0,width]);
      var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([height,0]);
      var plotLand = svg.append("g")
          .classed("plot",true)
          .attr("transform","translate("+margins.left+","+margins.top+")");
     var colors = d3.scaleOrdinal(d3.schemeAccent);
      var students = plotLand.selectAll("g")
          .data(d)
          .enter()
          .append("g")
          .attr("fill",function(d){return colors(d.name)})
      students.selectAll("circle")
          .data(function(d){return d.grades;})
          .enter()
          .append("circle")
          .attr("cx",function(d,i)
          {
            return xScale(i);
          })
          .attr("cy",function(d){return yScale(d);})
          .attr("r",10);
          var xAxis  = d3.axisBottom(xScale);
        svg.append("g")
          .classed(xAxis,true)
          .call(xAxis)
          .attr("transform","translate("+margins.left+","
          +(margins.top+ height + 15)+")"
        );5
      var legend = svg.append("g")
        .classed("legend",true)
        .attr("transform","translate("+
        (width + margins.left) + "," + margins.top+")");
        var legendLines = legend.selectAll("g")
            .data(d)
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
              .text(function(d){return d.name;});
      var yAxis  = d3.axisLeft(yScale);
        svg.append("g")
          .classed(yAxis,true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left-20)+","
          + 5 +")");
      } 
  
}

