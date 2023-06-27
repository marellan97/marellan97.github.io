function init() {
  // Get the reference to the dropdown menu
  let selector = d3.select("#selDataset");

  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {

  // Do this by pulling the array associated with `names` 
    let idNames = data.names;

    // Loop through the names and append to the dropdown menu
    for (let i = 0; i < idNames.length; i++){
      selector.append("option").text(idNames[i]).property("value", idNames[i]);
    };

    // Use the first sample from the list to build the initial plots
    let firstSample = idNames[0]
    
    buildBarChart(firstSample);
    buildBubbleChart(firstSample);
    buildMetadata(firstSample);
  });
}

function buildMetadata(sample) {
    // Access the website and use d3 to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

      //Use the list of sample names to populate the select options
      d3.json(url).then((data) => {

      // Filter the data for the object with the desired sample number (the id)
        let metadata = data.metadata;
        let filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = filteredArray[0]

      // Select the panel with id of `#sample-metadata`
        let panel = d3.select("#sample-metadata");
  
      // Clear existing metadata - use `.html("")`
        panel.html("");

      // Append new tags for each key-value in the metadata
        for (key in result){
          panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    });
  }
  
  function buildBarChart(sample) {
    // Access the website and use .then to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
      
    d3.json(url).then((data) => {
  
    // Filter the data for the object with the desired sample number (the id)
    // Pull the desired information (ids, labels, values) from your filtered data
    // Slice the data for your bar chart and order it (you can just use reverse)
    // Build a Horizontal Bar Chart
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == sample);
        let valueData = value[0];
    
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);
        
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
           
        let bar_chart = {
            y: yticks,
            x: xticks,
            text:labels,
            type:"bar",
            orientation:"h",
        };
        
        let layout = {
            title: "Top 10"
            
        };

        Plotly.newPlot("bar", [bar_chart], layout)
      });
  };
   
  function buildBubbleChart(sample) {
      // Access the website and use .then to operate on the data
      let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
        
      d3.json(url).then((data) => {
          
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == sample);
        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        let bubble_chart = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
          }
      };

        let layout = {
          title: "Bacteria Per Sample",
          xaxis: {title: "OTU ID"},
          
        };

        Plotly.newPlot("bubble", [bubble_chart], layout)
    });
   };

  function optionChanged(newSample) {
    // Change your data and update your plots/metadata when newSample is selected from the dropdown
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildMetadata(newSample);
  };
  
  // Initialize the dashboard
  init();