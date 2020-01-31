// @TODO: YOUR CODE HERE!
function displayMetadata(resultSampleID) {
  console.log("displayMetaData =", resultSampleID);

  d3.json("samples.json").then((retrieveData) => {
    var data1 = retrieveData.metadata;
    console.log(data1);
    var resultArray = data1.filter(sampleObj => sampleObj.id == resultSampleID);
    var result = resultArray[0];
    console.log(result);

    var PANEL = d3.select("#sample-metadata");
  
    Object.entries(result).forEach(([key, value]) => {
    var showText = `${key.toUpperCase()}: ${value}`;
    PANEL.append("h6").text(showText);
  });
});
}


function bubbleCharts(resultSampleID) {

  d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == resultSampleID);
    var result = resultArray[0];

    var otu_ids1 = result.otu_ids;
    var otu_labels1 = result.otu_labels;
    var sample_values1 = result.sample_values;

    var bubbleData = [
      {
        x: otu_ids1,
        y: sample_values1,
        text: otu_labels1,
        mode: "markers",
        marker:{
          size: sample_values1,
          color: otu_ids1,
          colorscale: "Earth",
      }
    }
    ];

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: {t : 0},
      hovermode: "closest",
      xaxis: { title: "OTU ID"},
      margin: {t : 30}
    };
  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  })
};
  
   

function DrawbarGraph(desiredSampleID) {

  console.log("DrawBarGraph: sample =", desiredSampleID);

  d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var resultArray =samples.filter(sampleObj => sampleObj.id == desiredSampleID);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    var barData = [
        {
          x: sample_values.slice(0, 10).reverse(),
          y: yticks,
          type: "bar",
          text: otu_labels.slice(0, 10).reverse(),
          orientation: "h"
        }
      ];

    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, l: 150}
      };

    Plotly.newPlot("bar", barData, barLayout);
    });
}

function init() {

  var selection = d3.select("#selDataset");
  d3.json("samples.json").then((sampleName) => {
    var sampleNames = sampleName.names;
    sampleNames.forEach((Sample) => {
      selection
        .append("option")
        .text(Sample)
        .property("value", Sample);
    });
  });
}

function optionChanged(Sample) {
  
  displayMetadata(Sample);
  DrawbarGraph(Sample);
  bubbleCharts(Sample);

};

init();