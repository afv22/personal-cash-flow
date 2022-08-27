import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

/**
 * Translate Nodes and Edges to a format readable by the Plotly diagram. Also sets the values
 */
const translate = (nodes, edges) => {
  var idToIndex = {};
  var labels = [];
  var sources = [];
  var targets = [];
  var values = [];
  nodes.map((element, index) => {
    labels.push(element.label);
    idToIndex[element.id] = index;
  });
  edges.map((element) => {
    sources.push(idToIndex[element.sourceId]);
    targets.push(idToIndex[element.targetId]);
    console.log(element.getValue());
    values.push(element.getValue());
  });
  return [labels, sources, targets, values];
};

export default (props) => {
  const [labels, setLabels] = useState([]);
  const [sources, setSources] = useState([]);
  const [targets, setTargets] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const [newLabels, newSources, newTargets, newValues] = translate(
      props.nodes,
      props.edges
    );
    setLabels(newLabels);
    setSources(newSources);
    setTargets(newTargets);
    setValues(newValues);
  }, [props.nodes, props.edges]);

  return (
    <Plot
      data={[
        {
          type: "sankey",
          orientation: "h",
          node: {
            pad: 15,
            thickness: 30,
            line: {
              color: "black",
              width: 0.5,
            },
            label: labels,
          },

          link: {
            source: sources,
            target: targets,
            value: values,
          },
        },
      ]}
      layout={{ width: 1200, height: 600, title: "Total Compensation" }}
    />
  );
};
