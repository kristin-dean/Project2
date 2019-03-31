

//******************************read data file*****************************//
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

var firstFunction = function(d) {
  d[0].quizes.forEach(function(d) {d.type="quiz"});
  d[0].final.forEach(function(d) {d.type="final"});
  d[0].test.forEach(function(d) {d.type="test"});
  d[0].homework.forEach(function(d) {d.type="homework"});
  var finalG = d[0].final;
  list2 = finalG.concat(d[0].homework);
  list3 = list2.concat(d[0].quizes);
  allGrades = list3.concat(d[0].test);
  console.log(allGrades);
}
