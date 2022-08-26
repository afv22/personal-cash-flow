import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const translate = (
  nodes,
  edges,
  setLabels,
  setSources,
  setTargets,
  setValues
) => {
  var labels = [];
  var idToIndex = {};
  nodes.map((element, index) => {
    labels.push(element.label);
    idToIndex[element.id] = index;
  });
  setLabels(labels);

  var sources = [];
  var targets = [];
  var values = [];
  edges.map((element) => {
    sources.push(idToIndex[element.sourceId]);
    targets.push(idToIndex[element.targetId]);
    values.push(5);
  });
  setSources(sources);
  setTargets(targets);
  setValues(values);
};

export default (props) => {
  const [labels, setLabels] = useState([]);
  const [sources, setSources] = useState([]);
  const [targets, setTargets] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    translate(
      props.nodes,
      props.edges,
      setLabels,
      setSources,
      setTargets,
      setValues
    );
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
