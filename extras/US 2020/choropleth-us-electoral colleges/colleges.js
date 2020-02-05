import * as d3 from 'd3';
import * as gChartcolour from 'g-chartcolour';
import topojson from 'topojson-client';

export function drawColleges() {
    // let interpolation =d3.curveLinear
    let colourScale = d3.scaleThreshold();
    let rem = 16;
    let circleSize = 5;

    function chart(parent) {

        parent.selectAll('circle')
        .data(d => d.votes)
        .enter()
        .call(sim)
        .append('circle')
        .attr('id', d => d.id + d.name)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', circleSize)
        .attr('fill', d => colourScale(d.party))

        parent.append('g')
            .attr('class', 'annotations-holder')
            .append('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .text((d) => {
                return d.postal
            })
            .attr('text-anchor', 'middle')

        function sim(dots) {
            const data = dots.data()
            const simulation = d3.forceSimulation(data)
                .force("x", d3.forceX(function (d) {
                    let state = parent.select('#states')
                    //console.log(state)
                    return d.x
                }))
                .force("y", d3.forceY(function (d) { return d.y }))
                .force("collide", d3.forceCollide(d => (circleSize * 1.3)))
                .force("charge", d3.forceManyBody().strength(.1))
            for (var i = 0; i < 300; ++i) simulation.tick()
        }

        function checkBoundary(state) {
            //d3.polygonContains(polygon, point)

        }

    } // eslint-disable-line


    chart.rem = (d) => {
        if (!d) return rem;
        rem = d;
        return chart;
    };

    chart.circleSize = (d) => {
        if (!d) return circleSize;
        circleSize = d;
        return chart;
    };

    chart.colourPalette = (d) => {
        if (!d) return colourScale;
        if (d === 'social' || d === 'video') {
            colourScale.range(gChartcolour.lineSocial);
        } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
            colourScale.range(gChartcolour.categorical_bar);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.linePrint);
        } else if (d && d.name && d.name === 'scale') {
            colourScale = d;
        }
        return chart;
    };

    return chart;
}