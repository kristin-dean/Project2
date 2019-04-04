

//******************************read data file*****************************//
var gradesP = d3.json("classData.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  drawLines(d,0)
  //drawChart(d,0);
  //console.log("Initialization working.");
//updateChart(d,5);
//console.log("Update working.");
},
function(err)
{
  console.log(err);
});

var drawLines = function(data,penguin)
{
  /*
  data[penguin].quizes.forEach(function(d) {d.type="Quiz"});
  data[penguin].final.forEach(function(d) {d.type="Final"});
  data[penguin].test.forEach(function(d) {d.type="Test"});
  data[penguin].homework.forEach(function(d) {d.type="Homework"});
  var finalG = data[penguin].final;
  list2 = finalG.concat(data[penguin].homework);
  list3 = list2.concat(data[penguin].quizes);
  allGrades = list3.concat(data[penguin].test);
  */
var dayHeader = d3.select("h3");
dayHeader.text("Hover or Select Penguins to See Individual Data");
  
  var dayHeader = d3.select("h1");
  dayHeader.text("Class Grades");
  
  buttons = d3.selectAll("button")
  buttons.remove()

  var screen =
   {
     width:1200,
     height:600
   };
   var svg = d3.select("svg")
     .attr("width",screen.width)
     .attr("height",screen.height);

   var margins =
   {
     top:10,
     bottom:40,
     left:45,
     right:20
   };


       var circles = d3.selectAll("circle")
       circles.remove()


   var width = screen.width - margins.left - margins.right;
   var height = screen.height - margins.top - margins.bottom;

    var xScale = d3.scaleLinear()
                   .domain([0,41])
                   .range([0,width]);

    var yScale = d3.scaleLinear()
                   .domain([0,100])
                   .range([height,0]);


                   var xAxis = d3.axisBottom(xScale);
                         svg.append("g")
                           .classed(xAxis,true)
                           .call(xAxis)
                           .attr("transform","translate("+margins.left+","
                           +(margins.top+ height + 15)+")"
                         );
                   var yAxis = d3.axisLeft(yScale);
                        svg.append("g")
                           .classed(yAxis,true)
                           .call(yAxis)
                           .attr("transform","translate("+(margins.left-20)+","
                           + 7 +")");



      var svg = d3.select("svg")

      var line = d3.line()
        .curve(d3.curveCatmullRom)
        .x(function(d,i)
        {
          return xScale(d.day)+20
        }
      )
        .y(function(d)
        {
          return yScale(d.percent)+12
        }
      )

      var findingGrades = function(student,index,data) {
        var quizzes = data[index].quizes;
        var finals = data[index].final;
        var theseGrades = quizzes.concat(finals);
        theseGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});
        return theseGrades;}

      data.forEach(function(d,i)
      {
        svg.append("g")
          .attr("classed","line")
          .append("path")
          .datum(findingGrades(d,i,data))
          .attr("d",line)
          .attr("stroke","grey")
          .attr("class","lines")


          .attr("fill","none")
          .attr("id","line"+i)
          .on("click",function(d)
          {
            d3.select(this).classed("hidden","true")
          })
      })

      var line = d3.select("#line0")
            .attr("stroke","red")
            .attr("stroke-width","5")

      var penguinPictures = d3.selectAll("img");
      penguinPictures.remove();

            var pengPics = d3.range(data.length)
                             .map(function(d) {return data[d].picture;});

            var penguinIsland = d3.select("#buttons");

            //******************** create the buttons **********************************//
            penguinIsland.selectAll("img")
                         .data(pengPics)
                         .enter()
                         .append("img")
                         .attr("src", function(d,i) {
                              return d})
                         .attr("alt", function(d,i) {
                             return "Penguin " + i;})
                        .attr("id", function(d,i) {
                             return "button"+i;})

                        .attr("height", 65)
                        .attr("width", 65)
                        .on("mouseover",function(d,i){
                        line = d3.select("#line"+i)
                        line.attr("stroke","red")
                        line.attr("stroke-width","5")
                        if(i != 0)
                        {
                          line0 = d3.select("#line0")
                          line0.attr("stroke","grey")
                          line0.attr("stroke-width","1")
                        }


                        })
                        .on("mouseout",function(d,i)
                        {
                          var line = d3.select("#line"+i)
                          line.attr("stroke","grey")
                          line.attr("stroke-width","1")
                          var starter = d3.select("#button0")
                              .attr("border-width","0px")
                        })
                        .on("click",function(d,i)
                        {
                            drawChart(data,i)
                        }





                      )

                      var button = d3.select("#button0")
                          .style("stroke","green")







/*
        svg.append("g")
          .attr("classed","line")
          .append("path")
          .datum(data[5].quizes)
          .attr("d",line)
          .attr("stroke","grey")
          .attr("fill","none")
          .on("click",function(d)
          {
            d3.select(this).classed("hidden","true")
          }



        )
*/
}









var drawChart = function(data,penguin)
  {
    var prevButtons = d3.selectAll("button");
    prevButtons.remove();
         var body = d3.select("body")
         body.append("button")
         .text("Return to Line Chart")
         .on("click",function(d){drawLines(data,0)})


    var lines = d3.selectAll(".lines")
    lines.remove()

    data[penguin].quizes.forEach(function(d) {d.type="Quiz"});
    data[penguin].final.forEach(function(d) {d.type="Final"});
    data[penguin].test.forEach(function(d) {d.type="Test"});
    data[penguin].homework.forEach(function(d) {d.type="Homework"});
    var finalG = data[penguin].final;
    list2 = finalG.concat(data[penguin].homework);
    list3 = list2.concat(data[penguin].quizes);
    allGrades = list3.concat(data[penguin].test);
    allGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});


    var pengPics = d3.range(data.length)
                     .map(function(d) {return data[d].picture;});

    var penguinIsland = d3.select("body");

    //******************** create the buttons **********************************//

    penguinIsland.selectAll("img")
                 .data(pengPics)
                 .enter()
                 .append("img")
                 .attr("src", function(d,i) {
                      return d})
                 .attr("alt", function(d,i) {
                     return "Penguin " + i;})
                .attr("id", function(d,i) {
                     return i;})
                .attr("height", 65)
                .attr("width", 65)
                .on("click", function(d,i){
                     var order = i;
                     updateChart(data,order, plotLand, students);});


var dayHeader = d3.select("h3");
dayHeader.text("Hover over grade points to see percent scores.");
    
  var dayHeader = d3.select("h1");
  dayHeader.text("Semester Grades for Penguin " + penguin);

     var screen =
      {
        width:1200,
        height:600
      };
      var svg = d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height);

      var margins =
      {
        top:10,
        bottom:40,
        left:45,
        right:20
      };

      var width = screen.width - margins.left - margins.right;
      var height = screen.height - margins.top - margins.bottom;
      var colors = d3.scaleOrdinal(d3.schemeSet1);
      var xScale = d3.scaleLinear()
        .domain([0,41])
        .range([0,width]);
      var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([height,0]);
      var plotLand = svg.append("g")
          .attr("id","plotLand")
          .classed("plot",true)
          .attr("transform","translate("+margins.left+","+margins.top+")");
      var students = plotLand.selectAll("g")
          .attr("id", "students")
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
            if (d.type == "Quiz") {
              return 6;}
            else if (d.type == "Homework") {
              return 6;}
            else if (d.type == "Test") {
              return 12;}
            else if (d.type == "Final") {
              return 15;}})
          .attr("fill", function(d) {
            return colors(d.type);})
        .append("title")
        .text(function(d)
          {return "This "+d.type+" grade is a " + d.percent;});
/*
          var xAxis  = d3.axisBottom(xScale);

        svg.append("g")
          .classed(xAxis,true)
          .call(xAxis)
          .attr("transform","translate("+margins.left+","
          +(margins.top+ height + 15)+")"
        );

*/
/**************************** LEGEND *************************************/
var gradeTypes = ['Quiz', 'Homework', 'Test', 'Final'];

      var legend = svg.append("g")
        .classed("legend",true)
        .attr("transform","translate("+
        (width + margins.left) + "," + margins.top+")");
        var legendLines = legend.selectAll("g")
            .data(gradeTypes)
            .enter()
            .append("g")
            .classed("legendLines",true)
            .attr("transform",function(d,i)
            {
              return "translate(" + 50 + "," + (i*20 +5) +")";}
          )
        legendLines.append("rect")
                .attr("x", 0)
                .attr("y", function(d,i){return i*20;})
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", function(d) {
                  return colors(d);});

        legendLines.append("text")
              .attr("x",20)
              .attr("y",function(d,i){return i*20+14;})
              .text(function(d){return d;});

//************************* Y AXIS ******************************************//
/*
      var yAxis  = d3.axisLeft(yScale);
        svg.append("g")
          .classed(yAxis,true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left-20)+","

          + 7 +")");
*/
      var penguins = d3.selectAll("img")
      .on("click",function(d,i)
      {
        updateChart(data,i,plotLand,students)
      })



  }


//**************************** UPDATE CHART ********************************//
var updateChart = function(d,penguin, plotLand, students)
  {

      d[penguin].quizes.forEach(function(d) {d.type="Quiz"});
      d[penguin].final.forEach(function(d) {d.type="Final"});
      d[penguin].test.forEach(function(d) {d.type="Test"});
      d[penguin].homework.forEach(function(d) {d.type="Homework"});
      var finalG = d[penguin].final;
      list2 = finalG.concat(d[penguin].homework);
      list3 = list2.concat(d[penguin].quizes);
      allGrades = list3.concat(d[penguin].test);
      allGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});

      var dayHeader = d3.select("h1");
      dayHeader.text("Semester Grades for Penguin " + penguin);

       var screen =
        {
          width:1200,
          height:600
        };
        var svg = d3.select("svg")
          .attr("width",screen.width)
          .attr("height",screen.height);

        var margins =
        {
          top:10,
          bottom:40,
          left:45,
          right:20
        };

        var width = screen.width - margins.left - margins.right;
        var height = screen.height - margins.top - margins.bottom;
        var colors = d3.scaleOrdinal(d3.schemeSet1);
        var xScale = d3.scaleLinear()
          .domain([0,41])
          .range([0,width]);
        var yScale = d3.scaleLinear()
          .domain([0,100])
          .range([height,0]);
        var plotLand = svg.selectAll("#plotLand")
            .classed("plot",true)
            .attr("transform","translate("+margins.left+","+margins.top+")");

        students.selectAll("circle")
            .data(allGrades)
            .transition()
            .duration(700)
            .attr("cx",function(d,i)
            {
              return xScale(d.day);
            })
            .attr("cy",function(d){return yScale(d.percent);})
            .attr("r", function(d) {
              if (d.type == "Quiz") {
                return 6;}
              else if (d.type == "Homework") {
                return 6;}
              else if (d.type == "Test") {
                return 12;}
              else if (d.type == "Final") {
                return 15;}})
            .attr("fill", function(d) {
              return colors(d.type);})


              var title = d3.selectAll("title");
              title.remove()
              svg.selectAll("circle")
              .append("title")
              .text(function(d)
                {return "This "+d.type+" grade is a " + d.percent;});

          //  var xAxis  = d3.axisBottom(xScale);







}
