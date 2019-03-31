
//******************************read data file*****************************//
var gradesP = d3.json("data.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  drawInitial(d,37);
  updateChart(d,5);
},
function(err)
{
  console.log(err);
});
